import { apiClient } from "./api";

export const authService = {
  // Register
  register: async (userData) => {
    return await apiClient("/users/register", {
      method: "POST",
      body: JSON.stringify({
        fullName: userData.fullName,
        email: userData.email,
        password: userData.password,
      }),
    });
  },

  // Login
  login: async (credentials) => {
    return await apiClient("/users/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },

  // Logout
  logout: async () => {
    return await apiClient("/users/logout", {
      method: "POST",
    });
  },

  // Refresh Token
  refreshToken: async () => {
    return await apiClient("/users/refresh-token", {
      method: "POST",
    });
  },

  // Get Profile
  getProfile: async () => {
    return await apiClient("/users/profile", {
      method: "GET",
    });
  },
};
