import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBranch as updateBranchApi } from "../../services/apiBranch";

export function useUpdateBranch(func) {
  const queryClint = useQueryClient();

  const handleSuccess = function () {
    queryClint.invalidateQueries({ queryKey: ["branchs"] });
    toast.success("Branch updated successfly");
    func(null);
  };

  const { mutate: updateBranchFunc, isPending: isLoading } = useMutation({
    mutationFn: ({ cookies, branchId, bodyObj }) =>
      updateBranchApi({ cookies, branchId, bodyObj }),

    onSuccess: handleSuccess,

    onError: (err) => {
      console.log("Error", err);
      toast.error(err.message);
    },
  });

  return { updateBranchFunc, isLoading };
}
