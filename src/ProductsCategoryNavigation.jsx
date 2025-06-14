import { Link, useSearchParams } from "react-router-dom";

const categories = [
  { name: "all", label: "All Products" },
  { name: "nursing-scrub", label: "Nursing Scrub" },
  { name: "badges", label: "Badges" },
  { name: "caps", label: "Caps" },
  { name: "tees", label: "Tees" },
];

function ProductsCategoryNavigation() {
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "all";

  return (
    <div className="mb-6 overflow-x-auto whitespace-nowrap">
      <div className="flex w-max gap-4">
        {categories.map((category) => (
          <Link
            key={category.name}
            to={
              category.name === "badges"
                ? `?category=${category.name}&country=all`
                : `?category=${category.name}`
            }
            className={`rounded-md px-4 py-2 transition ${
              selectedCategory === category.name
                ? "bg-green-600 font-bold text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {category.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductsCategoryNavigation;
