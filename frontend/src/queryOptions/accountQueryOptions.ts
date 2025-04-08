import { Api } from "@/api";
import { LOCAL_STORAGE_TOKEN_KEY } from "@/lib/constants";
import { queryOptions } from "@tanstack/react-query";

export const accountQueryOptionsKey = "account";

export function accountQueryOptions() {
  return queryOptions({
    queryKey: [accountQueryOptionsKey],
    queryFn: () => Api.User.account(),
    enabled: !!localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY),
  });
}
