import { useContext, useState } from "react";
import { LoginDto, ValueType } from "../../types";
import Input from "../../components/atoms/Input";
import { Link } from "react-router-dom";
import { authenticatorService } from "../../services/auth.service";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import UserContext from "../../store/usercontext";

export default function Login() {
  const [isLoading, setisLoading] = useState(false);
  const [values, setvalues] = useState<LoginDto>({
    email: "",
    password: "",
  });

  const { login } = useContext(UserContext);

  function handleChange(e: ValueType) {
    setvalues((val) => ({ ...val, [e.name]: e.value }));
  }

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setisLoading(true);
    try {
      const resp = await authenticatorService.login(values);
      if (resp.data.success) {
        // update user in store
        login(resp.data.data);
        toast.success("Successfully logged in");
        navigate("/auth/profile");
        localStorage.setItem("auth_token", JSON.stringify(resp.data.data));
      } else toast.error(resp.data.message);
    } catch (error) {
      toast.error("Failed to login");
      console.error(error);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className="max-w-lg border-2 shadow-md rounded-lg mx-auto my-20 py-8 px-10">
      <h2 className="py-4 px-1 text-3xl text-gray-800 font-bold">
        Login to continue
      </h2>
      <form onSubmit={handleSubmit} className="py-4">
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
            {isLoading ? (
              <img src="/gif/rolling.gif" className="h-8 mx-auto" />
            ) : (
              "Login"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
