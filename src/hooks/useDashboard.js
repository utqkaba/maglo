import { useQuery } from "@tanstack/react-query";
import { financialService } from "../services/financialService";

export const useFinancialSummary = () => {
  return useQuery({
    queryKey: ["financial-summary"],
    queryFn: financialService.getSummary,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
};
