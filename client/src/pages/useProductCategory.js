import { useQuery } from "@tanstack/react-query";
import { getProductsCategory } from "../services/apiProducts";

export function useProductCategory() {
  const { data: productsCategory, isLoading: isLoadingProductsCategory } =
    useQuery({
      queryKey: ["products"],
      queryFn: getProductsCategory,
    });

  return { productsCategory, isLoadingProductsCategory };
}
