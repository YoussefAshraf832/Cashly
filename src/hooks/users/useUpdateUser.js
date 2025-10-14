import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUser as updateUserApi } from "../../services/apiUser";

export function useUpdateUser(func) {
  const queryClint = useQueryClient();

  const handleSuccess = function (data) {
    queryClint.invalidateQueries({ queryKey: ["users"] });
    func(data.data.data);
    toast.success("User updated successfly");
  };

  const { mutate: updateUserFunc, isPending: isLoading } = useMutation({
    mutationFn: ({ cookies, userLogin, bodyObj }) =>
      updateUserApi({ cookies, userLogin, bodyObj }),

    onSuccess: handleSuccess,

    onError: (err) => {
      console.log("Error", err);
      toast.error(err.message);
    },
  });

  return { updateUserFunc, isLoading };
}
