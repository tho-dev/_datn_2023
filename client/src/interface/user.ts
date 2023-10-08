export interface IUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
  phone: number;
  location: string;
  avatar: string;
}
export interface IEmail {
  email: string;
}
export interface IResetPassword {
  email: string;
  password: string;
  otp_cote: number;
}
export interface IReset {
  token: string;
  email: string;
  password: string;
  confirmPassword: string;
}
