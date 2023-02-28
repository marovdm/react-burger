export interface ILoginRequest {
  email: string,
  password: string
};

export interface IRegisterRequest extends ILoginRequest {
  name: string;
};

export interface IForgotPasswordRequest {
  email: string
};

export interface IResetPasswordRequest {
  password: string;
  token: string;
}