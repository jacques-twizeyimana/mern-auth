import { AxiosResponse } from "axios";
import { UserInfo } from "../types/services/users.types";
import { customAxios } from "./axios";
import { Response, SignupDto } from "../types";

class UsersService {
  public async register(
    data: SignupDto
  ): Promise<AxiosResponse<Response<UserInfo>>> {
    return await customAxios.post("/users", data);
  }
}

export const usersService = new UsersService();
