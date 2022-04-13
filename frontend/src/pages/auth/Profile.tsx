import { LoginRes } from "../../types/services/auth.types";

export default function Profile() {
  let jwt: LoginRes | null = JSON.parse(
    localStorage.getItem("auth_token") || "{}"
  );
  let user = jwt?.user;

  return (
    <div className="shadow-md w-10/12 md:w-2/3 lg:w-1/2  rounded-lg my-10 mx-auto">
      <div className="bg-gray-900 rounded-t-lg py-2">
        <img
          src="https://i.pravatar.cc/300"
          alt="Profile picture"
          className="w-20 h-20 rounded-full block mx-auto object-cover"
        />
      </div>
      <div className="py-6 px-8">
        <p className="text-base font-normal py-1">
          <span className="font-bold">First name:</span> {user?.firstName}
        </p>
        <p className="text-base font-normal py-1">
          <span className="font-bold">Last name:</span> {user?.lastName}
        </p>
        <p className="text-base font-normal py-1">
          <span className="font-bold">Email address: </span>
          {user?.email}
        </p>
        <p className="text-base font-normal py-1">
          {`Joined on ${new Date(
            user?.createdAt || new Date().toLocaleDateString()
          ).toDateString()}`}
        </p>
        <div className="py-6">
          <button className="border border-gray-800 rounded py-3 px-8 text-base">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
