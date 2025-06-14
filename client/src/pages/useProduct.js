import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProduct } from "../services/apiProducts";

export function useProduct() {
  const { slug } = useParams();

  const {
    isLoading: isLoadingProduct,
    data: product = {},
    error,
  } = useQuery({
    queryKey: ["products", slug],
    queryFn: () => getProduct(slug),
  });
  return { isLoadingProduct, product, error };
}
