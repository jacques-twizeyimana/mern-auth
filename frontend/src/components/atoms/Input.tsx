import { InputProps } from "../../types/input";

export default function Input<T>({
  type,
  label,
  handleChange,
  ...attr
}: InputProps<T>) {
  return (
    <div className="py-2">
      <label htmlFor="" className="block text-base pb-1">
        {label}
      </label>
      <input
        type={type || "text"}
        className="border border-gray-600 rounded text-base h-12 block w-full focus:outline-none px-3"
        {...attr}
      />
    </div>
  );
}
