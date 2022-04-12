import { ValueType } from ".";

export interface InputProps<T> {
  handleChange: (_e: ValueType) => void;
  name: string;
  value?: string | number;
  label?: string;
  type?: string;
  full?: boolean;
}
