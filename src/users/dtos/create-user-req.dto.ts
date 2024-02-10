export interface CreateUserReqDTO {
  name: string;
  email: string;
  picture?: string;
  password?: string;
  passwordConfirm: string;
}
