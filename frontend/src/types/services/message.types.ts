import { Table } from "..";
import { UserInfo } from "./users.types";

export interface IChatMessages extends Table {
  senderId: UserInfo;
  receiverId: UserInfo;
  message: string;
  status: string;
}

export interface ICreateMessage {
  message: string;
  receiverId: string;
}
