import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/atoms/Input";
import { authService } from "../../services/auth.service";
import { ResetPasswordDto, ValueType } from "../../types";

export default function ResetPassword() {
  const reset_email = localStorage.getItem("reset_email");

  const [values, setvalues] = useState<ResetPasswordDto>({
    password: "",
    confirmPassword: "",
    code: "",
    email: reset_email || "",
  });

  const [step, setstep] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();

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

  const handleClick = () => {
    if (step === 0) setstep(1);
    else handleReset();
  };

  const handleReset = async () => {
    setisLoading(true);
    try {
      const resp = await authService.passwordReset(values);
      if (resp.data.success) {
        toast.success(
          "Successfully reset password.<br/> Please login with new password"
        );
        navigate("/auth/login");
      } else toast.error(resp.data.message);
    } catch (error) {
      // @ts-ignore
      toast.error(error.response.data.message || "Failed to reset password");
    } finally {
      setisLoading(false);
    }
  };

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
      <form onSubmit={(e) => e.preventDefault()} className="py-4">
        <Input
          handleChange={handleChange}
          name="code"
          type="number"
          label="Enter code sent"
        />
        {step === 1 && (
          <div>
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
        )}
        <div className="py-4">
          <button
            onClick={handleClick}
            className="block w-full py-3 text-base rounded text-center px-4 bg-gray-800 text-white"
          >
            {isLoading ? (
              <img src="/gif/rolling.gif" className="h-8 mx-auto" />
            ) : (
              "Next"
            )}
          </button>
        </div>
      </form>
      <Link to={"/auth/login"} className="text-base text-gray-800">
        Login instead
      </Link>
    </div>
  );
}
