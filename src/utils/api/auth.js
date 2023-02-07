import { AUTH } from "../consts";
import $api from "../http";

export default class Auth {
  static async login(payload) {
    const response = await $api.post(AUTH.LOGIN, { ...payload });
    if (response.data.success) {
      this.setUserCredentials(response.data);
    }
    return response.data;
  };

  static async register(payload) {
    const response = await $api.post(AUTH.REGISTER, { ...payload });
    if (response.data.success) {
      this.setUserCredentials(response.data);
    }
    return response.data;
  }

  static async forgotPassword(payload) {
    return $api.post(AUTH.FORGOT_PASSWORD, { ...payload });
  }

  static async resetPassword(payload) {
    return $api.post(AUTH.RESET_PASSWORD, { ...payload });
  }

  static setUserCredentials(data) {
    const { accessToken, refreshToken } = data;
    const authToken = accessToken.split('Bearer ')[1];

    localStorage.setItem('accessToken', authToken);
    localStorage.setItem('refreshToken', refreshToken);
  }
}