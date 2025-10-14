import { useQuery } from "@tanstack/react-query";

import { getAllInvoices } from "../../services/apiInvoice";

export function useAllInvoices({
  cookies,
  branchId,
  startDate,
  endDate,
  emailOrPhone,
}) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["invoices", branchId, emailOrPhone, startDate, endDate],
    queryFn: () =>
      getAllInvoices({ cookies, branchId, startDate, endDate, emailOrPhone }),
  });
  return {
    isLoading,
    invoices: data,
    error,
  };
}
