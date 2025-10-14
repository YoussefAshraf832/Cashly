import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createOwner as createOwnerApi } from "../services/apiAuth";
import { useLoginContext } from "../context/LoginContext";

export function useCreateOwner() {
  const navigate = useNavigate();
  const { setCookie, setUserLogin } = useLoginContext();

  const { mutate: createOwnerFunc, isPending: isLoading } = useMutation({
    mutationFn: ({ name, phoneNumber, email, password, passwordConfirm }) =>
      createOwnerApi({
        name,
        phoneNumber,
        email,
        password,
        passwordConfirm,
      }),

    onSuccess: (data) => {
      setCookie("jwt", data.token, {
        path: "/",
        secure: true,
        sameSite: "None",
      });
      setUserLogin(data.data.user);
      toast.success(`You are login. Welcome`);

      navigate("/home", { replace: true });
    },

    onError: (err) => {
      console.log("Error", err);
      toast.error(err.message);
    },
  });

  return { createOwnerFunc, isLoading };
}
