import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import UserContext from "../store/usercontext";

let links = [];

export default function Navbar() {
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const location = useLocation();

  const { user } = useContext(UserContext);

  if (user) {
    links = [
      { text: "Home", to: "/" },
      { text: "Profile", to: "/auth/profile" },
      { text: "Logout", to: "/auth/logout" },
    ];
  } else {
    links = [
      { text: "Home", to: "/" },
      { text: "Login", to: "/auth/login" },
      { text: "Sign up", to: "/auth/register" },
    ];
  }

  const activeClass = "text-white bg-gray-900";
  const inactiveClass = "text-gray-300 hover:text-white hover:bg-gray-700";

  return (
    <div>
      <div className="bg-gray-800 text-white py-4 px-6 md:px-14 xl:px-20 flex justify-between">
        <Link to={"/"}>
          <h2 className="font-black text-3xl lg:text-4xl">Mern auth</h2>
        </Link>
        <div className="block md:hidden">
          <button
            className="outline-none focus:outline cursor-pointer"
            onClick={() => setisMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="32"
              height="32"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M3 4h18v2H3V4zm6 7h12v2H9v-2zm-6 7h18v2H3v-2z"
                fill="rgba(255,255,255,1)"
              />
            </svg>
          </button>
        </div>
        <div className="hidden md:block">
          <div className="ml-10 flex items-baseline space-x-4 gap-4">
            {links.map((link, i) => (
              <Link
                key={link.text}
                to={link.to}
                className={`px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === link.to ? activeClass : inactiveClass
                }`}
              >
                {link.text}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } md:hidden flex-col py-4 px-6 border-b bg-gray-800 text-white`}
      >
        {links.map((link, i) => (
          <Link
            key={link.text}
            to={link.to}
            className="text-base border-b py-4 px-2 border-gray-600"
          >
            {link.text}
          </Link>
        ))}
      </div>
    </div>
  );
}
