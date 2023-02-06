import { USER } from "../consts";
import $api from "../http";

export default class Profile {
  static async fetchProfile(payload) {
    return $api.get(USER.PROFILE, { ...payload });
  };

  static async updateProfile(payload) {
    return $api.patch(USER.PROFILE, { ...payload });
  };
}