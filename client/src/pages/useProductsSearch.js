import { useQuery } from "@tanstack/react-query";
import { fetchProductsBySearch } from "../services/apiProducts";

export function useProductsSearch(search) {
  const { data: productsSearch, isLoading } = useQuery({
    queryKey: ["products", search],
    queryFn: () => fetchProductsBySearch(search),
    keepPreviousData: true,
    enabled: search.length >= 2,
    staleTime: 1000 * 60,
  });

  return { productsSearch, isLoading };
}
