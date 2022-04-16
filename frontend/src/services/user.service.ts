import { AxiosResponse } from "axios";
import { UserInfo } from "../types/services/users.types";
import { customAxios } from "./axios";
import { EditProfileDto, Response, SignupDto } from "../types";

class UsersService {
  public async register(
    data: SignupDto
  ): Promise<AxiosResponse<Response<UserInfo>>> {
    return await customAxios.post("/users", data);
  }

  public async editProfile(
    data: EditProfileDto
  ): Promise<AxiosResponse<Response<UserInfo>>> {
    return await customAxios.put("/users", data);
  }
}

export const userService = new UsersService();
