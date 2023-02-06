import { AUTH } from "../consts";
import $api from "../http";

export default class Auth {
  static async login(payload) {
    return $api.post(AUTH.LOGIN, { ...payload });
  };

  static async register(payload) {
    return $api.post(AUTH.REGISTER, { ...payload });
  }

  static async forgotPassword(payload) {
    return $api.post(AUTH.FORGOT_PASSWORD, { ...payload });
  }

  static async resetPassword(payload) {
    return $api.post(AUTH.RESET_PASSWORD, { ...payload });
  }
}