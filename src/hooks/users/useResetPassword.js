import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updatePasswordForUser as updatePasswordForUserApi } from "../../services/apiUser";

export function useUpdatePasswordForUser(func) {
  const handleSuccess = function () {
    func();
    toast.success("User password updated successfly");
  };

  const { mutate: updatePasswordForUserFunc, isPending: isLoading } =
    useMutation({
      mutationFn: ({ cookies, userLogin, bodyObj }) =>
        updatePasswordForUserApi({ cookies, userLogin, bodyObj }),

      onSuccess: handleSuccess,

      onError: (err) => {
        console.log("Error", err);
        toast.error(err.message);
      },
    });

  return { updatePasswordForUserFunc, isLoading };
}
