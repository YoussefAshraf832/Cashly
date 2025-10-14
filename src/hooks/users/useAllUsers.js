import { useQuery } from "@tanstack/react-query";
import { allUsers } from "../../services/apiUser";

export function useUsers(cookies, userLogin) {
  const {
    isLoading,
    data: users,
    error,
  } = useQuery({
    queryKey: ["users", userLogin.user._id],
    queryFn: () => allUsers(cookies, userLogin),
  });
  return {
    isLoading,
    users,
    error,
  };
}
