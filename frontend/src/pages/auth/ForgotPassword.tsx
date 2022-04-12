import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/atoms/Input";
import { ValueType } from "../../types";

export default function ForgotPassword() {
  const [values, setvalues] = useState({
    email: "",
  });

  function handleChange(e: ValueType) {
    setvalues((val) => ({ ...val, [e.name]: e.value }));
  }

  const handleForgot = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("reset_email", values.email);
  };

  return (
    <div className="max-w-lg border-2 shadow-md rounded-lg mx-auto my-20 py-8 px-10">
      <h2 className="py-4 px-1 text-3xl text-gray-800 font-bold">
        Forgot password
      </h2>
      <form onSubmit={handleForgot} className="py-4">
        <Input
          handleChange={handleChange}
          name="email"
          type="email"
          label="Email address"
        />
        <div className="py-4">
          <button className="block w-full py-3 text-base rounded text-center px-4 bg-gray-800 text-white">
            Send code
          </button>
        </div>
      </form>
    </div>
  );
}
