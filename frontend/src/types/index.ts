import { FormEvent } from "react";

export interface ValueType<T = Event> {
  name: string;
  value: string | number | boolean | string[];
  label?: string;
  event?: FormEvent<T>;
}
