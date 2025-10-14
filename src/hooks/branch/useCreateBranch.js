import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createNewBranch as createNewBranchApi } from "../../services/apiBranch";

export function useCreateBranch(func) {
  const queryClint = useQueryClient();
  const handleSuccess = function () {
    queryClint.invalidateQueries({ queryKey: ["branchs"] });
    toast.success("Branch created successfly");
    func();
  };

  const { mutate: createNewBranchFunc, isPending: isLoading } = useMutation({
    mutationFn: ({ name, address, code, phoneNumber, cookies }) =>
      createNewBranchApi({
        name,
        address,
        code,
        phoneNumber,
        cookies,
      }),
    onSuccess: handleSuccess,
    onError: (err) => {
      console.log("Error", err);
      toast.error(err.message);
    },
  });

  return { createNewBranchFunc, isLoading };
}
