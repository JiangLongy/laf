import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsString } from 'class-validator'

export class DeleteRecycleBinItemsDto {
  @ApiProperty({
    description: 'The list of item ids',
    type: [String],
  })
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  ids: string[]
}
