import { apiClient } from "./api";

export const financialService = {
  getSummary: async () => {
    return await apiClient("/financial/summary", {
      method: "GET",
    });
  },
};
