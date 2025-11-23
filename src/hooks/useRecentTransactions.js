import { useQuery } from "@tanstack/react-query";
import { transactionService } from "../services/transactionService";

export const useRecentTransactions = () => {
  return useQuery({
    queryKey: ["recent-transactions"],
    queryFn: transactionService.getRecent,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
};
