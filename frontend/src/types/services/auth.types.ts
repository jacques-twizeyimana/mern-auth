export interface LoginRes {
  username: string;
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
