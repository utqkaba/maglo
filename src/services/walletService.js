import { apiClient } from "./api";

export const walletService = {
  getWallet: async () => {
    return await apiClient("/financial/wallet", {
      method: "GET",
    });
  },
};
