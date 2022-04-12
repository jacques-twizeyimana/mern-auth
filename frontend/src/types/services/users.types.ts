import { Table } from "..";

interface BasicUserInfo {
  firstName: string;
  lastName: string;
  email: string;
}

export interface CreateUserInfo extends BasicUserInfo {
  password: string;
}

export interface UserInfo extends Table, BasicUserInfo {
  isAdmin: boolean;
}
