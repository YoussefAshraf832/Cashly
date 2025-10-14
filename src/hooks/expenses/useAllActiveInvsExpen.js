import { useQuery } from "@tanstack/react-query";

import { getAllExpensesInvoiceActive } from "../../services/apiExpenses";

export function useAllExpensesInvoicesActive(cookies, emailOrPhone, searching) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["expensesInvoicesActive", emailOrPhone],
    queryFn: () =>
      getAllExpensesInvoiceActive(cookies, emailOrPhone, searching),
  });
  return {
    isLoading,
    expensesInvoicesActive: data,
    error,
  };
}
