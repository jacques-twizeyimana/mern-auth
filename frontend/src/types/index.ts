import { AllHTMLAttributes, DOMAttributes, FormEvent } from "react";

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

export type EditProfileDto = Partial<SignupDto>;
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
  createdAt: string | Date;
  updatedAt: string | Date;
  __v: number;
}

export interface HtmlDOMProps<T> extends AllHTMLAttributes<DOMAttributes<T>> {}
