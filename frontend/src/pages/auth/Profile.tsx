import { useContext } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../services/axios";
import UserContext from "../../store/usercontext";

export default function Profile() {
  const { user, logout } = useContext(UserContext);

  return (
    <div className="shadow-md w-10/12 md:w-2/3 lg:w-1/2  rounded-lg my-10 mx-auto">
      <div className="bg-gray-900 rounded-t-lg py-2 relative">
        <img
          src={BASE_URL + user?.profileImage}
          alt="Profile picture"
          className="w-20 h-20 rounded-full block mx-auto object-cover"
        />
        <Link
          className="px-4 py-4 absolute top-2 right-2"
          to={"/auth/profile/edit"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="32"
            height="32"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M12.9 6.858l4.242 4.243L7.242 21H3v-4.243l9.9-9.9zm1.414-1.414l2.121-2.122a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414l-2.122 2.121-4.242-4.242z"
              fill="#FFF"
            />
          </svg>
        </Link>
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
          <span className="font-bold">User type: </span>
          {user?.role}
        </p>
        <p className="text-sm font-normal py-3 text-gray-600">
          {`Joined on ${new Date(
            user?.createdAt || new Date().toLocaleDateString()
          ).toDateString()}`}
        </p>
        <div className="py-6">
          <button
            onClick={logout}
            className="border border-gray-800 rounded py-3 px-8 text-base"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
