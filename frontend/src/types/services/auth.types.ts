import { Table } from "..";
import { UserInfo } from "./users.types";

export interface LoginRes {
  user: UserInfo;
  token: string;
}

export interface ChangePassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
export interface InitiateResetPassword {
  email: string;
}
export interface ResetPassword {
  activationCode: string;
  email: string;
  password: string;
}

export interface IResetPasswordRes extends Table {
  code: number;
  userId: string;
  email: string;
  status: string;
  expiresOn: Date;
}
