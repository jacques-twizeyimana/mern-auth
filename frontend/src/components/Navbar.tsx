import { Link, useLocation } from "react-router-dom";

const links = [
  { text: "Home", to: "/" },
  { text: "Login", to: "/auth/login" },
  { text: "Sign up", to: "/auth/register" },
];

export default function Navbar() {
  const location = useLocation();

  const activeClass = "text-white bg-gray-900";
  const inactiveClass = "text-gray-300 hover:text-white hover:bg-gray-700";

  return (
    <div className="bg-gray-800 text-white py-4 px-6 md:px-14 xl:px-20 flex justify-between">
      <Link to={"/"}>
        <h2 className="font-black text-2xl lg:text-4xl">Mern auth</h2>
      </Link>
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
  );
}
