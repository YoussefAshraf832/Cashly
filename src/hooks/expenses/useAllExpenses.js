import { useQuery } from "@tanstack/react-query";
import { getAllExpenses } from "../../services/apiExpenses";

export function useAllExpenses(cookies) {
  const {
    isLoading,
    data: expenses,
    error,
  } = useQuery({
    queryKey: ["expenses"],
    queryFn: () => getAllExpenses(cookies),
  });
  return {
    isLoading,
    expenses,
    error,
  };
}
