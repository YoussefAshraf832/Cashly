import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateMyPassword as updateMyPasswordApi } from "../services/apiAuth";
import { useLoginContext } from "../context/LoginContext";

export function useUpdateMyPassword(func) {
  const { setCookie, setUserLogin } = useLoginContext();

  const handleSuccess = function (data) {
    setCookie("jwt", data.token, {
      path: "/",
      secure: true,
      sameSite: "None",
    });
    setUserLogin(data.data.user);

    toast.success("Password updated successfly");
    func();
  };

  const { mutate: updateMyPasswordFunc, isPending: isLoading } = useMutation({
    mutationFn: ({ obj, cookies }) =>
      updateMyPasswordApi({
        obj,
        cookies,
      }),

    onSuccess: handleSuccess,

    onError: (err) => {
      console.log("Error", err);
      toast.error(err.message);
    },
  });

  return { updateMyPasswordFunc, isLoading };
}
