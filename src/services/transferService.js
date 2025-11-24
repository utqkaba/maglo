import { apiClient } from "./api";

export const transferService = {
  getScheduled: async () => {
    return await apiClient("/financial/transfers/scheduled", {
      method: "GET",
    });
  },
};
