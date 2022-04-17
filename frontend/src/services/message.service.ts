import { AxiosResponse } from "axios";
import { customAxios } from "./axios";
import { Response } from "../types";
import { IChatMessages, ICreateMessage } from "../types/services/message.types";

class MessageService {
  public async sendMessage(
    data: ICreateMessage
  ): Promise<AxiosResponse<Response<IChatMessages>>> {
    return await customAxios.post("/messages", data);
  }

  public async getChatMessages(
    receiverId: string
  ): Promise<AxiosResponse<Response<IChatMessages[]>>> {
    return await customAxios.get(`/messages/${receiverId}`);
  }
}

export const chatService = new MessageService();
