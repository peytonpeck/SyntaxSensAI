import { Api } from "@/api";
import { queryOptions } from "@tanstack/react-query";

export const accountQueryOptionsKey = "account";

export function accountQueryOptions(token: string) {
  return queryOptions({
    queryKey: [accountQueryOptionsKey, token],
    queryFn: ({ queryKey }) => Api.User.account(queryKey[1]),
  });
}
