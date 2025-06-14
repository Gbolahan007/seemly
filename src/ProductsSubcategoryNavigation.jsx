import { Link, useSearchParams } from "react-router-dom";

const subcategories = [
  "all",
  "nigeria",
  "haiti",
  "jamaica",
  "india",
  "philippines",
  "ghana",
  "cameroun",
];

function ProductsSubcategoryNavigation() {
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "all";
  const selectedCountry = searchParams.get("country") || "all";

  if (selectedCategory !== "badges") return null; // Only show for badges

  return (
    <div className="mb-6 overflow-x-auto whitespace-nowrap">
      <div className="flex w-max gap-4">
        {subcategories.map((sub) => (
          <Link
            key={sub}
            to={`?category=badges&country=${sub}`}
            className={`rounded-md px-4 py-2 transition ${
              selectedCountry === sub
                ? "bg-blue-600 font-bold text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {sub.toUpperCase()}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductsSubcategoryNavigation;
