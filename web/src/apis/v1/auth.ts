// @ts-ignore
/* eslint-disable */
///////////////////////////////////////////////////////////////////////
//                                                                   //
// this file is autogenerated by service-generate                    //
// do not edit this file manually                                    //
//                                                                   //
///////////////////////////////////////////////////////////////////////
/// <reference path = "api-auto.d.ts" />
import request from "@/utils/request";
import useGlobalStore from "@/pages/globalStore";

/**
 * Signup by user-password
 */
export async function UserPasswordControllerSignup(
  params: Definitions.PasswdSignupDto | any,
): Promise<Paths.UserPasswordControllerSignup.Responses> {
  // /v1/auth/passwd/signup
  let _params: { [key: string]: any } = {
    appid: useGlobalStore.getState().currentApp?.appid || "",
    ...params,
  };
  return request(`/v1/auth/passwd/signup`, {
    method: "POST",
    data: params,
  });
}

/**
 * Signin by user-password
 */
export async function UserPasswordControllerSignin(
  params: Definitions.PasswdSigninDto | any,
): Promise<Paths.UserPasswordControllerSignin.Responses> {
  // /v1/auth/passwd/signin
  let _params: { [key: string]: any } = {
    appid: useGlobalStore.getState().currentApp?.appid || "",
    ...params,
  };
  return request(`/v1/auth/passwd/signin`, {
    method: "POST",
    data: params,
  });
}

/**
 * Reset password
 */
export async function UserPasswordControllerReset(
  params: Definitions.PasswdResetDto | any,
): Promise<Paths.UserPasswordControllerReset.Responses> {
  // /v1/auth/passwd/reset
  let _params: { [key: string]: any } = {
    appid: useGlobalStore.getState().currentApp?.appid || "",
    ...params,
  };
  return request(`/v1/auth/passwd/reset`, {
    method: "POST",
    data: params,
  });
}

/**
 * Check if user-password is set
 */
export async function UserPasswordControllerCheck(
  params: Definitions.PasswdCheckDto | any,
): Promise<Paths.UserPasswordControllerCheck.Responses> {
  // /v1/auth/passwd/check
  let _params: { [key: string]: any } = {
    appid: useGlobalStore.getState().currentApp?.appid || "",
    ...params,
  };
  return request(`/v1/auth/passwd/check`, {
    method: "POST",
    data: params,
  });
}

/**
 * Send phone verify code
 */
export async function PhoneControllerSendCode(
  params: Definitions.SendPhoneCodeDto | any,
): Promise<Paths.PhoneControllerSendCode.Responses> {
  // /v1/auth/phone/sms/code
  let _params: { [key: string]: any } = {
    appid: useGlobalStore.getState().currentApp?.appid || "",
    ...params,
  };
  return request(`/v1/auth/phone/sms/code`, {
    method: "POST",
    data: params,
  });
}

/**
 * Signin by phone and verify code
 */
export async function PhoneControllerSignin(
  params: Definitions.PhoneSigninDto | any,
): Promise<Paths.PhoneControllerSignin.Responses> {
  // /v1/auth/phone/signin
  let _params: { [key: string]: any } = {
    appid: useGlobalStore.getState().currentApp?.appid || "",
    ...params,
  };
  return request(`/v1/auth/phone/signin`, {
    method: "POST",
    data: params,
  });
}

/**
 * Auth providers
 */
export async function AuthenticationControllerGetProviders(
  params: Paths.AuthenticationControllerGetProviders.BodyParameters | any,
): Promise<Paths.AuthenticationControllerGetProviders.Responses> {
  // /v1/auth/providers
  let _params: { [key: string]: any } = {
    appid: useGlobalStore.getState().currentApp?.appid || "",
    ...params,
  };
  return request(`/v1/auth/providers`, {
    method: "GET",
    params: params,
  });
}

/**
 * Bind username
 */
export async function AuthenticationControllerBindPhone(
  params: Definitions.BindPhoneDto | any,
): Promise<Paths.AuthenticationControllerBindPhone.Responses> {
  // /v1/auth/bind/phone
  let _params: { [key: string]: any } = {
    appid: useGlobalStore.getState().currentApp?.appid || "",
    ...params,
  };
  return request(`/v1/auth/bind/phone`, {
    method: "POST",
    data: params,
  });
}

/**
 * Bind username
 */
export async function AuthenticationControllerBindUsername(
  params: Definitions.BindUsernameDto | any,
): Promise<Paths.AuthenticationControllerBindUsername.Responses> {
  // /v1/auth/bind/username
  let _params: { [key: string]: any } = {
    appid: useGlobalStore.getState().currentApp?.appid || "",
    ...params,
  };
  return request(`/v1/auth/bind/username`, {
    method: "POST",
    data: params,
  });
}