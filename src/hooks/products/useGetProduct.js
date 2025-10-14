import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../../services/apiProduct";

export function useProduct(cookies, code) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["product", code],
    queryFn: () => getProduct(cookies, code),
  });
  return {
    isLoading,
    product: data,
    error,
  };
}
