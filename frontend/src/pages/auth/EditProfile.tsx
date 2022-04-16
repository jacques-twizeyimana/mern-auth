import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Input from "../../components/atoms/Input";
import { userService } from "../../services/user.service";
import UserContext from "../../store/usercontext";
import { EditProfileDto, SignupDto, ValueType } from "../../types";

export default function EditProfile() {
  const [isSaving, setisSaving] = useState(false);

  const { user } = useContext(UserContext);

  const [values, setvalues] = useState<EditProfileDto>({
    email: user?.email,
    firstName: user?.firstName,
    lastName: user?.lastName,
  });

  const navigate = useNavigate();

  function handleChange(e: ValueType) {
    setvalues((val) => ({ ...val, [e.name]: e.value }));
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setisSaving(true);
    try {
      const resp = await userService.register(values);
      if (resp.data.success) {
        toast.success("Successfully registered");
        navigate("/auth/login");
      } else toast.error(resp.data.message);
    } catch (error) {
      toast.error("Failed to register");
      console.error(error);
    } finally {
      setisSaving(false);
    }
  };

  return (
    <div className="max-w-lg border-2 shadow-md rounded-lg mx-auto my-12 py-8 px-10">
      <form onSubmit={handleSubmit} className="py-4">
        <Input
          handleChange={handleChange}
          name="firstName"
          label="First name"
          value={values.firstName}
        />
        <Input
          handleChange={handleChange}
          name="lastName"
          value={values.lastName}
          label="Last name"
        />
        <Input
          handleChange={handleChange}
          name="email"
          type="email"
          label="Email address"
          value={values.email}
        />
        <Input
          handleChange={handleChange}
          name="role"
          type="text"
          label="User type"
          value={user?.role}
          disabled
          readOnly
        />
        <div className="py-4">
          <button
            disabled={isSaving}
            className="block w-full py-3 text-base rounded text-center px-4 bg-gray-800 text-white"
          >
            {isSaving ? (
              <img src="/gif/rolling.gif" className="h-8 mx-auto" />
            ) : (
              "Save"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
