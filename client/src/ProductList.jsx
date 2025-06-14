import { useSearchParams } from "react-router-dom";
import { useProducts } from "../src/pages/useProducts";
import Loader from "./Loader";
import ProductItem from "./ProductItem";
import { motion } from "framer-motion";

function ProductList() {
  const { products = [], isLoadingProducts, error } = useProducts();

  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "all";
  const selectedCountry = searchParams.get("country") || "all";

  // Handle loading state
  if (isLoadingProducts) return <Loader />;

  // Handle error state
  if (error)
    return (
      <div className="text-red-500">
        Error loading products: {error.message}
      </div>
    );

  let filteredProducts = products || [];

  // Filter by category
  if (selectedCategory !== "all") {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === selectedCategory,
    );
  }

  // Filter by country - only apply when category is badges
  if (selectedCountry !== "all" && selectedCategory === "badges") {
    filteredProducts = filteredProducts.filter(
      (product) => product.country.toLowerCase() === selectedCountry,
    );
  }

  return (
    <div className="container mx-auto">
      <motion.h1
        className="mb-6 text-3xl font-bold text-green-600"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Our Products
      </motion.h1>

      {/* Product List */}
      <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <ProductItem key={product.id} product={product} index={index} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}

export default ProductList;
