import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBranch as deleteBranchApi } from "../../services/apiBranch";

export function useDeleteBranch(func) {
  const queryClint = useQueryClient();

  const handleSuccess = function () {
    queryClint.invalidateQueries({ queryKey: ["branchs"] });
    toast.success("Branch deleted successfly");
    func(null);
  };

  const { mutate: deleteBranchFunc, isPending: isLoading } = useMutation({
    mutationFn: ({ cookies, branchId }) =>
      deleteBranchApi({ cookies, branchId }),

    onSuccess: handleSuccess,

    onError: (err) => {
      console.log("Error", err);
      toast.error(err.message);
    },
  });

  return { deleteBranchFunc, isLoading };
}
