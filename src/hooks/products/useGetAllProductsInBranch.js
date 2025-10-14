import { useQuery } from "@tanstack/react-query";
import { allProductInBranch } from "../../services/apiProduct";

export function useAllProductsInBranch(cookies, branchId, userLogin) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["products", branchId],
    queryFn: () => allProductInBranch(cookies, branchId, userLogin),
  });
  return {
    isLoading,
    products: data,
    error,
  };
}
