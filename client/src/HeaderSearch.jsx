import { IoMdSearch } from "react-icons/io";

function HeaderSearch() {
  return (
    <form className="relative flex items-center">
      <input
        placeholder="Search item"
        className="xs:w-32 xs:focus:w-40 w-24 rounded-lg bg-white px-4 py-2 text-sm text-green-600 transition-all duration-300 placeholder:text-green-400 focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50 sm:w-32 sm:focus:w-36 md:w-40 md:focus:w-44 lg:w-40 lg:focus:w-44 xl:w-52 xl:focus:w-56"
      />
      <div className="absolute right-3">
        <IoMdSearch color="green" size={20} />
      </div>
    </form>
  );
}

export default HeaderSearch;
