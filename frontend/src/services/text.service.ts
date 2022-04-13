import { AxiosResponse } from "axios";
import { Response } from "../types";
import { ITextInfo } from "../types/services/text.types";
import { customAxios } from "./axios";

class TextService {
  public async getText(): Promise<AxiosResponse<Response<ITextInfo>>> {
    return await customAxios.get("/text");
  }

  public async updateText(
    data: any
  ): Promise<AxiosResponse<Response<ITextInfo>>> {
    return await customAxios.put("/text", data);
  }
}

export const textService = new TextService();
