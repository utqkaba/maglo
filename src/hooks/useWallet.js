import { useQuery } from "@tanstack/react-query";
import { walletService } from "../services/walletService";

export const useWallet = () => {
  return useQuery({
    queryKey: ["wallet"],
    queryFn: walletService.getWallet,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
};
