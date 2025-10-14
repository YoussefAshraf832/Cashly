import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signup as signupApi } from "../services/apiAuth";

export function useSignup(func) {
  const queryClint = useQueryClient();
  const handleSuccess = function () {
    queryClint.invalidateQueries({ queryKey: ["users"] });
    toast.success("User created successfly");
    func();
  };

  const { mutate: signupFunc, isPending: isLoading } = useMutation({
    mutationFn: ({ obj, cookies }) => signupApi({ obj, cookies }),

    onSuccess: handleSuccess,

    onError: (err) => {
      console.log("Error", err);
      toast.error(err.message);
    },
  });

  return { signupFunc, isLoading };
}
