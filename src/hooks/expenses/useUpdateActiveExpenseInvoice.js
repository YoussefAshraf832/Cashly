import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { patchAllExpensesInvoiceActive } from "../../services/apiExpenses";

export function useUpdateActiveExpenseInvoice(funcReset) {
  const queryClint = useQueryClient();
  const handleSuccess = function () {
    queryClint.invalidateQueries({ queryKey: ["expenses"] });
    queryClint.invalidateQueries({ queryKey: ["invoices"] });
    queryClint.invalidateQueries({ queryKey: ["expensesInvoicesActive"] });
    toast.success("Saved successfully");
    funcReset(false);
  };

  const { mutate: updateActiveExpenseInvoiceFunc, isPending: isLoading } =
    useMutation({
      mutationFn: ({ cookies, emailOrPhone, bodyObj }) =>
        patchAllExpensesInvoiceActive({
          cookies,
          emailOrPhone,
          bodyObj,
        }),
      onSuccess: handleSuccess,
      onError: (err) => {
        console.log("Error", err);
        toast.error(err.message);
      },
    });

  return { updateActiveExpenseInvoiceFunc, isLoading };
}
