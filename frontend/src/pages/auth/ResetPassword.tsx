import { useState } from "react";
import Input from "../../components/atoms/Input";
import { ResetDto, ValueType } from "../../types";

export default function ResetPassword() {
  const [values, setvalues] = useState<ResetDto>({
    password: "",
    confirmPassword: "",
    code: "",
  });

  const reset_email = localStorage.getItem("reset_email");
  const emailsParts = {
    first6: reset_email?.substring(0, 6),
    last4: reset_email?.substring(reset_email?.length - 4),
    domain: reset_email?.substring(reset_email?.indexOf("@") + 1),
    remaining_email:
      reset_email?.substring(6, reset_email?.length - 4).length || 2,
  };

  function handleChange(e: ValueType) {
    setvalues((val) => ({ ...val, [e.name]: e.value }));
  }

  return (
    <div className="max-w-lg border-2 shadow-md rounded-lg mx-auto my-20 py-8 px-10">
      <h2 className="py-4 px-1 text-3xl text-gray-800 font-bold">
        Reset password
      </h2>
      <p className="pb-4 text-base text-gray-400">
        {`We have sent an email containing a reset code to your email address
        ${emailsParts.first6}${"*".repeat(emailsParts.remaining_email)}${
          emailsParts.last4
        }. Please copy and paste it below.`}
      </p>
      <form action="" className="py-4">
        <Input
          handleChange={handleChange}
          name="code"
          type="number"
          label="Enter code sent"
        />
        <div className="hidden">
          <Input
            handleChange={handleChange}
            name="password"
            type="password"
            label="New password"
          />
          <Input
            handleChange={handleChange}
            name="confirmPassword"
            type="password"
            label="Confirm password"
          />
        </div>
        <div className="py-4">
          <button className="block w-full py-3 text-base rounded text-center px-4 bg-gray-800 text-white">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
