import { IForgotPasswordRequest, ILoginRequest, IRegisterRequest, IResetPasswordRequest } from "../../models/request/auth-request"
import { IBaseResponse } from "../../models/response/auth-response";
import { AUTH } from "../consts";
import $api from "../http";

export default class Auth {
  static async login(payload: ILoginRequest) {
    const response = await $api.post(AUTH.LOGIN, { ...payload });
    if (response.data.success) {
      this.setTokensCredentials(response.data);
    }
    return response.data;
  };

  static async register(payload: IRegisterRequest) {
    const response = await $api.post(AUTH.REGISTER, { ...payload });
    if (response.data.success) {
      this.setTokensCredentials(response.data);
    }
    return response.data;
  }

  static async logout(token: string) {
    const response = await $api.post(AUTH.LOGOUT, { token })
    if (response.data.success) {
      this.clearCredentials();
    }
    return response.data;
  }

  static async forgotPassword(payload: IForgotPasswordRequest) {
    return $api.post(AUTH.FORGOT_PASSWORD, { ...payload });
  }

  static async resetPassword(payload: IResetPasswordRequest) {
    return $api.post(AUTH.RESET_PASSWORD, { ...payload });
  }

  static setTokensCredentials(data: IBaseResponse) {    
    const { accessToken, refreshToken } = data;
    const authToken = accessToken.split('Bearer ')[1];

    localStorage.setItem('accessToken', authToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  static clearCredentials() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}