import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteExpense } from "../../services/apiExpenses";

export function useDeleteExpense() {
  const queryClint = useQueryClient();

  const handleSuccess = function () {
    queryClint.invalidateQueries({ queryKey: ["expenses"] });
    toast.success("Expense deleted successfly");
  };

  const { mutate: deleteExpenseFunc, isPending: isLoading } = useMutation({
    mutationFn: ({ cookies, id }) => deleteExpense({ cookies, id }),

    onSuccess: handleSuccess,

    onError: (err) => {
      console.log("Error", err);
      toast.error(err.message);
    },
  });

  return { deleteExpenseFunc, isLoading };
}
