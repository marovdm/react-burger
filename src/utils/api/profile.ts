import { USER } from "../consts";
import $api from "../http";

type UserUpdatePayload = {
  email: string;
  name: string;
  password: string;
}

export default class Profile {
  static async fetchProfile() {
    return $api.get(USER.PROFILE);
  };

  static async updateProfile(payload: UserUpdatePayload) {
    return $api.patch(USER.PROFILE, { ...payload });
  };
}