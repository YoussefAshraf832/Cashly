import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createInvoice } from "../../services/apiInvoice";

export function useCreateInvoice(funcCloce, funcReset, func, message) {
  const queryClint = useQueryClient();
  const handleSuccess = function () {
    queryClint.invalidateQueries({ queryKey: ["invoices"] });
    queryClint.invalidateQueries({ queryKey: ["products"] });
    queryClint.invalidateQueries({ queryKey: ["expensesInvoicesActive"] });
    toast.success(message);
    funcCloce();
    funcReset();
    func("");
  };

  const { mutate: createInvoiceFunc, isPending: isLoading } = useMutation({
    mutationFn: ({ products, branchId, cookies, paymentMethod }) =>
      createInvoice({
        products,
        branchId,
        cookies,
        paymentMethod,
      }),
    onSuccess: handleSuccess,
    onError: (err) => {
      console.log("Error", err);
      toast.error(err.message);
    },
  });

  return { createInvoiceFunc, isLoading };
}
