import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { login as loginApi } from "../services/apiAuth";
import { useLoginContext } from "../context/LoginContext";

export function useLogin() {
  const navigate = useNavigate();
  const { setCookie, setUserLogin } = useLoginContext();

  const handleSuccess = function (data) {
    if (data.data.user?.active === false) {
      navigate("/owner-signup", { replace: true });
      toast.success("You are login.");
      return;
    } else if (data.data.user?.active !== false) {
      setCookie("jwt", data.token, {
        path: "/",
        secure: true,
        sameSite: "None",
      });
      setUserLogin(data.data.user);
      toast.success("You are login.");

      navigate("/home", { replace: true });
    }
  };

  const { mutate: loginFunc, isPending: isLoading } = useMutation({
    mutationFn: ({ emailOrPhone, password }) =>
      loginApi({ emailOrPhone, password }),

    onSuccess: handleSuccess,

    onError: (err) => {
      console.log("Error", err);
      toast.error(err.message);
    },
  });

  return { loginFunc, isLoading };
}
