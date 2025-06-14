import ProductsSubcategoryNavigation from "../ProductsSubcategoryNavigation";
import ProductsCategoryNavigation from "../ProductsCategoryNavigation";
import ProductList from "../ProductList";

function Products() {
  return (
    <div className="container mx-auto overflow-x-hidden p-6 font-tektur">
      <ProductsCategoryNavigation />
      <ProductsSubcategoryNavigation />
      <ProductList />
    </div>
  );
}

export default Products;
