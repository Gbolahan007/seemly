import { useQuery } from "@tanstack/react-query";
import { getRelatedProducts } from "../services/apiProducts";

export function useRelatedProducts(category, excludeId) {
  const {
    isLoadingRelatedProduct,
    data: relatedProducts = [],
    error,
  } = useQuery({
    queryKey: ["relatedProducts", category, excludeId],
    queryFn: () => getRelatedProducts(category, excludeId),
  });

  return { isLoadingRelatedProduct, relatedProducts, error };
}
