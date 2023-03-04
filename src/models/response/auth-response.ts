import { IUser } from "../IUser";

export interface IBaseResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}

export interface IUserResponse extends IBaseResponse {
  user: IUser;
}

export interface IProfileResponse {
  user: IUser;
  success: boolean;
}

export interface ILogoutResponse {
  success: boolean;
  message: string;
}