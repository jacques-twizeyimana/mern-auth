import { AxiosResponse } from "axios";
import { LoginDto, Response } from "../types";
import {
  ChangePassword,
  InitiateResetPassword,
  LoginRes,
  ResetPassword,
} from "../types/services/auth.types";
import { UserInfo } from "../types/services/users.types";
import { customAxios } from "./axios";

class AuthenticatorService {
  public async login(
    loginInfo: LoginDto
  ): Promise<AxiosResponse<Response<LoginRes>>> {
    return await customAxios.post("/auth/login", loginInfo);
  }

  public async authUser(): Promise<AxiosResponse<Response<UserInfo>>> {
    return await customAxios.get("/auth/current");
  }
  public async logout() {
    return await customAxios.get("/auth/logout");
  }

  public async passwordChange(changePassword: ChangePassword) {
    return await customAxios.post("/auth/changePassword", changePassword);
  }

  public async forgotPassword(
    initiateResetPassword: InitiateResetPassword
  ): Promise<AxiosResponse<Response<UserInfo>>> {
    return await customAxios.post(
      "/auth/initiate-reset",
      initiateResetPassword
    );
  }
  public async passwordReset(resetPassword: ResetPassword) {
    return await customAxios.post("/auth/reset-password", resetPassword);
  }
}

export const authenticatorService = new AuthenticatorService();
