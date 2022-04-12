import { useState } from "react";
import { SignupDto, ValueType } from "../../types";
import Input from "../atoms/Input";

export default function Register() {
  const [values, setvalues] = useState<SignupDto>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  function handleChange(e: ValueType) {
    setvalues((val) => ({ ...val, [e.name]: e.value }));
  }

  return (
    <div className="max-w-lg border-2 shadow-md rounded-lg mx-auto my-12 py-8 px-10">
      <h2 className="py-4 px-1 text-3xl text-gray-800 font-bold">
        Create account
      </h2>
      <form action="" className="py-4">
        <Input
          handleChange={handleChange}
          name="firstName"
          label="First name"
        />
        <Input handleChange={handleChange} name="lastName" label="Last name" />
        <Input
          handleChange={handleChange}
          name="email"
          type="email"
          label="Email address"
        />
        <Input
          handleChange={handleChange}
          name="password"
          type="password"
          label="Password"
        />
        <div className="py-4">
          <button className="block w-full py-3 text-base rounded text-center px-4 bg-gray-800 text-white">
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}
