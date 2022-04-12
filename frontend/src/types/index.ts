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
