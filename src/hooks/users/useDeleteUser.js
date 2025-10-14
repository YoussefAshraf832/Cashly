import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteUser as deleteUserApi } from "../../services/apiUser";

export function useDeleteUser(func) {
  const queryClint = useQueryClient();

  const handleSuccess = function () {
    queryClint.invalidateQueries({ queryKey: ["users"] });
    toast.success("User deleted successfly");
    func();
  };

  const { mutate: deleteUserFunc, isPending: isLoading } = useMutation({
    mutationFn: ({ cookies, userLogin, userId }) =>
      deleteUserApi({ cookies, userLogin, userId }),

    onSuccess: handleSuccess,

    onError: (err) => {
      console.log("Error", err);
      toast.error(err.message);
    },
  });

  return { deleteUserFunc, isLoading };
}
