import { Table } from "..";
import { UserInfo } from "./users.types";

export interface IChatMessages extends Table {
  sender: UserInfo;
  receiver: UserInfo;
  message: string;
  status: string;
}

export interface ICreateMessage {
  message: string;
  receiverId: string;
}
