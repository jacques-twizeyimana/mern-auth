import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { userService } from "../services/user.service";
import { UserInfo } from "../types/services/users.types";

const roles = ["ADMIN", "MODERATOR", "USER"];
const roleClassNames: { [index: string]: string } = {
  ADMIN: "border-gray-800 bg-gray-800 text-white",
  USER: "",
  MODERATOR: "border-gray-800",
};

export default function Dashboard() {
  const [isLoading, setisLoading] = useState(true);
  const [users, setusers] = useState<UserInfo[]>([]);

  useEffect(() => {
    userService
      .getAllUsers()
      .then((resp) => setusers(resp.data.data))
      .catch((err) => console.error(err))
      .finally(() => setisLoading(false));
  }, []);

  const handleClick = async (userId: string, role: string) => {
    const toastId = toast.loading("Chaning user role ....");
    try {
      const resp = await userService.changeUserRole({
        userId,
        role,
      });

      if (resp.data.success)
        toast.success(`Successfuly changed user role to "${role}"`, {
          id: toastId,
        });
      else toast.error(resp.data.message, { id: toastId });
    } catch (error) {
      // @ts-ignore
      toast.error(error.message || "Failed to change usertype", {
        id: toastId,
      });
    }
  };

  return (
    <div className="px-10 py-6">
      <h2 className="text-3xl font-bold tex-gray-800 py-10">Manage users</h2>
      <table className="table w-full text-base border-2 text-gray-700">
        <thead>
          <tr className="table-row border-b-2">
            <th className="text-left py-2 px-4">No.</th>
            <th className="text-left py-2 px-4">First name</th>
            <th className="text-left py-2 px-4">Last name</th>
            <th className="text-left py-2 px-4">Email address</th>
            <th className="text-left py-2 px-4">Current role</th>
            <th className="text-left py-2 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr className="table-row text-left border-b">
              <td className="text-left py-2 px-4">{index + 1}</td>
              <td className="text-left py-2 px-4">{user.firstName}</td>
              <td className="text-left py-2 px-4">{user.lastName}</td>
              <td className="text-left py-2 px-4">{user.email}</td>
              <td className="lowercase text-left py-2 px-4">{user.role}</td>
              <td className="text-left py-2 px-4 flex gap-4">
                {roles
                  .filter((r) => r !== user.role)
                  .map((role) => (
                    <button
                      onClick={(e) => handleClick(user._id, role)}
                      className={`border rounded py-2 px-3 text-sm capitalize ${roleClassNames[role]}`}
                    >
                      make {role.toLocaleLowerCase()}
                    </button>
                  ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
