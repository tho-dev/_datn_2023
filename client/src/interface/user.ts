export interface IUser {
  username: string;
  password: string;
  userId: string;
}
export interface IEmail {
  email: string;
}
export interface IResetPassword {
  email: string;
  new_password: string;
  otp_cote: number;
}
