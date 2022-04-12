import { FormEvent } from "react";

export interface ValueType<T = Event> {
  name: string;
  value: string | number | boolean | string[];
  label?: string;
  event?: FormEvent<T>;
}


export interface LoginDto {
  email: string;
  password: string;
}

export interface SignupDto extends LoginDto {
  firstName: string;
  lastName: string;
}

export interface ResetDto {
  code: string;
  password: string;
  confirmPassword: string;
}

export interface Response<T> {
  success: boolean;
  message: string;
  code?: number;
  data: T;
}

export interface Table {
  _id: string;
  createdAt: string;
}