import { useQuery } from "@tanstack/react-query";
import { transferService } from "../services/transferService";

export const useScheduledTransfers = () => {
  return useQuery({
    queryKey: ["scheduled-transfers"],
    queryFn: transferService.getScheduled,
    staleTime: 5 * 60 * 1000,
  });
};
