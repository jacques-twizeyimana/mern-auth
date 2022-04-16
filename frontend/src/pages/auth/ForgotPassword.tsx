import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Input from "../../components/atoms/Input";
import { authService } from "../../services/auth.service";
import { ValueType } from "../../types";

export default function ForgotPassword() {
  const [isLoading, setisLoading] = useState(false);
  const [values, setvalues] = useState({
    email: "",
  });

  const navigate = useNavigate();

  function handleChange(e: ValueType) {
    setvalues((val) => ({ ...val, [e.name]: e.value }));
  }

  const handleForgot = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setisLoading(true);
    authService
      .forgotPassword({ email: values.email })
      .then((resp) => {
        if (resp.data.success) {
          toast.success("We have sent reset code to yur email");
          navigate("/auth/reset");
          localStorage.setItem("reset_email", values.email);
        } else toast.error(resp.data.message);
      })
      .catch((err) => {
        toast.error(err.message || "Error occurred");
      })
      .finally(() => setisLoading(false));
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
            {isLoading ? (
              <img src="/gif/rolling.gif" className="h-8 mx-auto" />
            ) : (
              "Send code"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
