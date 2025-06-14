import { NavLink } from "react-router-dom";
function HeaderNav() {
  return (
    <nav className="rounded-lg bg-gray-100 p-4 font-semibold shadow-md">
      <ul className="flex items-center gap-6">
        <li>
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive
                ? "rounded-md border-b-2 border-green-500 bg-green-500 px-4 py-2 text-white"
                : "px-4 py-2 text-green-500 transition duration-300 ease-in-out hover:text-green-700"
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive
                ? "rounded-md border-b-2 border-green-500 bg-green-500 px-4 py-2 text-white"
                : "px-4 py-2 text-green-500 transition duration-300 ease-in-out hover:text-green-700"
            }
          >
            Products
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "rounded-md border-b-2 border-green-500 bg-green-500 px-4 py-2 text-white"
                : "px-4 py-2 text-green-500 transition duration-300 ease-in-out hover:text-green-700"
            }
          >
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
export default HeaderNav;
