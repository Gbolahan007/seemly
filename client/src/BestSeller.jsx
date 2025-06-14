import BestSellerItem from "./BestSellerItem";

import Loader from "./Loader";
import { useProductCategory } from "./pages/useProductCategory";

function BestSeller() {
  const { productsCategory, isLoadingProductsCategory } = useProductCategory();

  if (isLoadingProductsCategory) return <Loader />;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      {/* Section Heading */}
      <h2 className="relative mx-auto mb-12 text-center text-3xl font-bold tracking-tight text-gray-900 after:absolute after:-bottom-4 after:left-1/2 after:h-1 after:w-24 after:-translate-x-1/2 after:rounded-full after:bg-blue-600 md:text-4xl">
        Best Sellers
      </h2>

      {/* Products Grid */}
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {productsCategory.map((item) => (
          <BestSellerItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default BestSeller;
