import { useQuery } from "@tanstack/react-query";
import { getAllBranch } from "../../services/apiBranch";

export function useBranchs(cookies, userLogin) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["branchs", userLogin?.user?._id],
    queryFn: () => getAllBranch(cookies, userLogin),
  });
  return {
    isLoading,
    branchs: data,
    error,
  };
}
