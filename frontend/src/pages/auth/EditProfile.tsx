import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ImageUploader from "../../components/atoms/ImageUploader";
import Input from "../../components/atoms/Input";
import { BASE_URL } from "../../services/axios";
import { userService } from "../../services/user.service";
import UserContext from "../../store/usercontext";
import { EditProfileDto, ValueType } from "../../types";

export default function EditProfile() {
  const [isSaving, setisSaving] = useState(false);

  const { user, updateUser } = useContext(UserContext);

  const [values, setvalues] = useState<EditProfileDto>({
    email: user?.email,
    firstName: user?.firstName,
    lastName: user?.lastName,
  });

  const [profileImage, setprofileImage] = useState<File | null>(null);

  const navigate = useNavigate();

  function handleChange(e: ValueType) {
    setvalues((val) => ({ ...val, [e.name]: e.value }));
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setisSaving(true);
    try {
      const resp = await userService.editProfile(values);
      if (resp.data.success) {
        toast.success("Successfully updated data");
        navigate("/auth/profile");
        updateUser(resp.data.data);
      } else toast.error(resp.data.message);
    } catch (err) {
      // @ts-ignore
      toast.error(err.message || "Failed to updated profile.");
    } finally {
      setisSaving(false);
    }
  };

  return (
    <div className="max-w-lg border-2 shadow-md rounded-lg mx-auto my-12 py-8 px-10">
      <h2 className="py-4 px-1 text-3xl text-gray-800 font-bold">
        Edit profile
      </h2>
      <form onSubmit={handleSubmit} className="py-4">
        <ImageUploader
          placeholder={BASE_URL + user?.profileImage}
          handleUpload={(file) => setprofileImage(file)}
        />
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
