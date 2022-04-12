import { AxiosResponse } from "axios";
import { CreateUserInfo, UserInfo } from "../types/services/users.types";
import { customAxios } from "./axios";
import { Response } from "../types";

class UsersService {
  public async register(
    data: CreateUserInfo
  ): Promise<AxiosResponse<Response<UserInfo>>> {
    return await customAxios.post("/auth/login", data);
  }
}

export const usersService = new UsersService();
