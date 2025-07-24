import { useState, useRef } from "react";
import { IoMdSearch } from "react-icons/io";
import { useProductsSearch } from "./pages/useProductsSearch";
import { useDebounce } from "./hooks/useDebounce";
import { useClickOutside } from "./hooks/useClickOutside";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function HeaderSearch() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(500, search);
  const { productsSearch, isLoading } = useProductsSearch(debouncedSearch);
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  useClickOutside(wrapperRef, () => setIsDropdownOpen(false));

  const handleResultClick = (category, slug) => {
    navigate(`/products/${category}/${slug}`);
    setIsDropdownOpen(false);
    setSearch("");
  };

  return (
    <div ref={wrapperRef} className="relative mx-auto w-full max-w-md">
      <form
        className="relative flex items-center"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          placeholder="Search item"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setIsDropdownOpen(true);
          }}
          className="xs:w-32 xs:focus:w-40 w-full rounded-lg bg-white px-4 py-2 text-sm text-green-600 transition-all duration-300 placeholder:text-green-400 focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50"
        />
        <div className="absolute right-3">
          <IoMdSearch color="green" size={20} />
        </div>
      </form>

      {/* Animate dropdown */}
      <AnimatePresence>
        {search.trim() && isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-full z-50 mt-2 max-h-60 overflow-y-auto rounded-lg border border-green-200 bg-white shadow-md"
          >
            {/* 🔄 Loading spinner */}
            {isLoading && (
              <div className="flex items-center justify-center py-3">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-green-500 border-t-transparent"></div>
              </div>
            )}

            {/* ✅ Search results */}
            {!isLoading &&
              productsSearch?.length > 0 &&
              productsSearch.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleResultClick(item.category, item.slug)}
                  className="cursor-pointer px-4 py-2 text-sm hover:bg-green-50"
                >
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.country}</p>
                </div>
              ))}

            {!isLoading && productsSearch?.length === 0 && (
              <div className="px-4 py-3 text-sm text-gray-500">
                No matching products found.
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default HeaderSearch;
