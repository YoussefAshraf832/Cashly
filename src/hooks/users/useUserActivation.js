import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUserActive as updateUserActiveApi } from "../../services/apiUser";

export function useUpdateActiveUser(func) {
  const queryClint = useQueryClient();

  const handleSuccess = function () {
    queryClint.invalidateQueries({ queryKey: ["users"] });
    toast.success("User updated successfly");
    func();
  };

  const { mutate: updateUserActiveFunc, isPending: isLoading } = useMutation({
    mutationFn: ({ cookies, userLogin, bodyObj }) =>
      updateUserActiveApi({ cookies, userLogin, bodyObj }),

    onSuccess: handleSuccess,

    onError: (err) => {
      console.log("Error", err);
      toast.error(err.message);
    },
  });

  return { updateUserActiveFunc, isLoading };
}
