import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createExpense } from "../../services/apiExpenses";

export function useCreateExpense(funcReset) {
  const queryClint = useQueryClient();
  const handleSuccess = function () {
    queryClint.invalidateQueries({ queryKey: ["expenses"] });
    queryClint.invalidateQueries({ queryKey: ["expensesInvoicesActive"] });
    toast.success("Expense created successfly");
    funcReset({
      amount: "",
      type: "",
      date: new Date().toISOString().split("T")[0],
      description: "",
    });
  };

  const { mutate: createExpenseFunc, isPending: isLoading } = useMutation({
    mutationFn: ({ cookies, bodyObj }) =>
      createExpense({
        cookies,
        bodyObj,
      }),
    onSuccess: handleSuccess,
    onError: (err) => {
      console.log("Error", err);
      toast.error(err.message);
    },
  });

  return { createExpenseFunc, isLoading };
}
