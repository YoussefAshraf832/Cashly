import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createUpdateProductsInfo } from "../../services/apiProduct";

export function useCreateUpdateInfoProducts(func) {
  const queryClint = useQueryClient();
  const handleSuccess = function () {
    queryClint.invalidateQueries({ queryKey: ["products"] });
    toast.success("Products saving successfly");
    func([
      {
        id: Date.now(),
        code: "",
        name: "",
        category: "",
        subCategory: "",
        price: "",
      },
    ]);
  };

  const { mutate: useCreateUpdateProducts, isPending: isLoading } = useMutation(
    {
      mutationFn: ({ products, cookies }) =>
        createUpdateProductsInfo({
          products,
          cookies,
        }),
      onSuccess: handleSuccess,
      onError: (err) => {
        console.log("Error", err);
        toast.error(err.message);
      },
    }
  );

  return { useCreateUpdateProducts, isLoading };
}
