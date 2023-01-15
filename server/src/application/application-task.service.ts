import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { Application, ApplicationPhase } from '@prisma/client'
import { isConditionTrue } from '../utils/getter'
import { GatewayCoreService } from '../core/gateway.cr.service'
import { PrismaService } from '../prisma.service'
import * as assert from 'node:assert'
import { ApplicationCoreService } from '../core/application.cr.service'
import { StorageService } from 'src/storage/storage.service'
import { DatabaseService } from 'src/database/database.service'

@Injectable()
export class ApplicationTaskService {
  private readonly logger = new Logger(ApplicationTaskService.name)

  constructor(
    private readonly appCore: ApplicationCoreService,
    private readonly gatewayCore: GatewayCoreService,
    private readonly storageService: StorageService,
    private readonly databaseService: DatabaseService,
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Process application in `Creating` phase
   */
  @Cron(CronExpression.EVERY_SECOND)
  async handleCreatingPhase() {
    const apps = await this.prisma.application.findMany({
      where: {
        phase: ApplicationPhase.Creating,
      },
      take: 20,
    })

    for (const app of apps) {
      this.reconcileCreatingPhase(app).catch((error) => {
        this.logger.error(error)
      })
    }
  }

  /**
   * Process application in `Deleting` phase
   */
  @Cron(CronExpression.EVERY_5_SECONDS)
  async handleDeletingPhase() {
    const apps = await this.prisma.application.findMany({
      where: {
        phase: ApplicationPhase.Deleting,
      },
      take: 2,
    })

    for (const app of apps) {
      this.reconcileDeletingPhase(app).catch((error) => {
        this.logger.error(error)
      })
    }
  }

  /**
   * Reconcile phase of application from `Creating` to `Created`
   * @param app
   * @returns
   */
  private async reconcileCreatingPhase(app: Application) {
    const appid = app.appid
    // get app bundle
    const bundle = await this.prisma.bundle.findUnique({
      where: {
        regionName_name: {
          regionName: app.regionName,
          name: app.bundleName,
        },
      },
    })
    assert(bundle, `Bundle ${app.bundleName} not found`)

    const namespace = await this.appCore.getAppNamespace(appid)
    if (!namespace) {
      this.logger.debug(`Creating namespace for application ${appid}`)
      await this.appCore.createAppNamespace(appid, app.createdBy)
      return
    }

    // reconcile storage
    let storage = await this.storageService.findOne(appid)
    if (!storage) {
      this.logger.debug(`Creating storage for application ${appid}`)
      const res = await this.storageService.create(app.appid)
      if (res) {
        storage = res
      }
    }

    // reconcile database
    let database = await this.databaseService.findOne(appid)
    if (!database) {
      this.logger.debug(`Creating database for application ${appid}`)
      database = await this.databaseService.create(app.appid)
    }

    // reconcile gateway
    let gateway = await this.gatewayCore.findOne(appid)
    if (!gateway) {
      this.logger.debug(`Creating gateway for application ${appid}`)
      gateway = await this.gatewayCore.create(app.appid)
    }

    if (!isConditionTrue('Ready', gateway?.status?.conditions)) return
    if (!storage) return
    if (!database) return

    // update phase
    await this.prisma.application.updateMany({
      where: {
        appid: app.appid,
        phase: ApplicationPhase.Creating,
      },
      data: {
        phase: ApplicationPhase.Created,
      },
    })
    this.logger.log(`Application ${app.appid} updated to phase created`)
  }

  /**
   * Reconcile phase of application from `Deleting` to `Deleted`
   * @param app
   * @returns
   */
  private async reconcileDeletingPhase(app: Application) {
    const appid = app.appid

    // delete namespace
    const namespace = await this.appCore.getAppNamespace(appid)
    if (namespace) {
      await this.appCore.removeAppNamespace(appid)
      return
    }

    // delete storage
    const storage = await this.storageService.findOne(appid)
    if (storage) {
      await this.storageService.delete(appid)
      return
    }

    // delete database
    const database = await this.databaseService.findOne(appid)
    if (database) {
      await this.databaseService.delete(database)
      return
    }

    // update phase
    await this.prisma.application.updateMany({
      where: {
        appid,
        phase: ApplicationPhase.Deleting,
      },
      data: {
        phase: ApplicationPhase.Deleted,
      },
    })
    this.logger.log(`Application ${app.appid} updated to phase deleted`)
  }
}
