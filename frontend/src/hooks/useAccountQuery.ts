import { accountQueryOptions } from "@/queryOptions/accountQueryOptions";
import { useQuery } from "@tanstack/react-query";

export function useAccountQuery() {
  const query = useQuery(accountQueryOptions());

  return query;
}
