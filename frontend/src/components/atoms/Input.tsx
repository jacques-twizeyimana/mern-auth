import { ChangeEvent, useState } from "react";
import { InputProps } from "../../types/input";

export default function Input<T>({ type, label, handleChange, name, ...attr }: InputProps<T>) {
  const [_value, setValue] = useState<string>("");

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
    handleChange({ name, value: e.target.value });
  }

  return (
    <div className="py-2">
      <label htmlFor="" className="block text-base pb-1">
        {label}
      </label>
      <input
          value={_value}
        onChange={handleOnChange}
        required
        type={type || "text"}
        className="border border-gray-600 rounded text-base h-12 block w-full focus:outline-none px-3"
        {...attr}
      />
    </div>
  );
}
