import { apiClient } from "./api";

export const transactionService = {
  getRecent: async () => {
    return await apiClient("/financial/transactions/recent", {
      method: "GET",
    });
  },
};
