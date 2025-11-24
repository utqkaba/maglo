import { apiClient } from "./api";

export const workingCapitalService = {
  getWorkingCapital: async () => {
    return await apiClient("/financial/working-capital", {
      method: "GET",
    });
  },
};
