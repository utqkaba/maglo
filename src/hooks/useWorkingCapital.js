import { useQuery } from "@tanstack/react-query";
import { workingCapitalService } from "../services/workingCapitalService";

export const useWorkingCapital = () => {
  return useQuery({
    queryKey: ["working-capital"],
    queryFn: workingCapitalService.getWorkingCapital,
    staleTime: 5 * 60 * 1000,
  });
};
