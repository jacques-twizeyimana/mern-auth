import { useState } from "react";
import { LoginDto, ValueType } from "../../types";
import Input from "../../components/atoms/Input";
import { Link } from "react-router-dom";

export default function Login() {
  const [values, setvalues] = useState<LoginDto>({
    email: "",
    password: "",
  });

  function handleChange(e: ValueType) {
    setvalues((val) => ({ ...val, [e.name]: e.value }));
  }

  return (
    <div className="max-w-lg border-2 shadow-md rounded-lg mx-auto my-20 py-8 px-10">
      <h2 className="py-4 px-1 text-3xl text-gray-800 font-bold">
        Login to continue
      </h2>
      <form action="" className="py-4">
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
        <p className="text-right pb-4">
          <Link to="/auth/forgot-password" className="text-blue-500">
            Forgot password?
          </Link>
        </p>
        <div className="py-4">
          <button className="block w-full py-3 text-base rounded text-center px-4 bg-gray-800 text-white">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
