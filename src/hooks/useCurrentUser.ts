import { useAPIQuery } from "@/hooks";

const useCurrentUser = () => {
  const userQuery = useAPIQuery({ url: "/users/me" });

  return {
    isLoading: userQuery.isLoading,
    data: userQuery.data,
    error: userQuery.error,
  };
};

export default useCurrentUser;
