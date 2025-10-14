import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateProductInBranch } from "../../services/apiProduct";

export function useUpdateProductBranch(func) {
  const queryClint = useQueryClient();
  const handleSuccess = function () {
    queryClint.invalidateQueries({ queryKey: ["products"] });
    toast.success("Products updated successfly");
    func([{ id: Date.now(), code: "", name: "", quantity: "" }]);
  };

  const { mutate: updateProductInBranches, isPending: isLoading } = useMutation(
    {
      mutationFn: ({ products, cookies, userLogin }) =>
        updateProductInBranch({
          products,
          cookies,
          userLogin,
        }),
      onSuccess: handleSuccess,
      onError: (err) => {
        console.log("Error", err);
        toast.error(err.message);
      },
    }
  );

  return { updateProductInBranches, isLoading };
}
