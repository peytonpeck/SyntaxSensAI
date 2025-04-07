import { LOCAL_STORAGE_TOKEN_KEY } from "@/lib/constants";
import { accountQueryOptions } from "@/queryOptions/accountQueryOptions";
import { useQuery } from "@tanstack/react-query";

export function useAccountQuery() {
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);

  const query = useQuery(accountQueryOptions(token));

  return query;
}
