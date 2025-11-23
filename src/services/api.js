const BASE_URL = "https://case.nodelabs.dev/api";

export const apiClient = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;

  // Token'ı store'dan al
  const { useAuthStore } = await import("../store/authStore");
  const token = useAuthStore.getState().token;

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }), // Token varsa ekle
      ...options.headers,
    },
    credentials: "include",
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    // 401 Unauthorized
    if (response.status === 401) {
      // Token expire olmuş, logout
      useAuthStore.getState().logout();
      window.location.href = "/signin";
      throw new Error(data.message || "Unauthorized");
    }

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (error) {
    throw error;
  }
};
