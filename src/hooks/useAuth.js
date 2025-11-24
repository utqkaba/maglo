import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authService } from "../services/authService";
import { useAuthStore } from "../store/authStore";

export const useRegister = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: authService.register,
    onSuccess: (response) => {
      setUser(response.data);
      toast.success(response.message || "Account created successfully!");
      navigate("/signin");
    },
    onError: (error) => {
      toast.error(error.message || "Registration failed!");
    },
  });
};

export const useLogin = () => {
  const navigate = useNavigate();
  const { setToken, setUser } = useAuthStore();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (response) => {
      setToken(response.data.accessToken);
      setUser(response.data.user);
      toast.success(response.message || "Login successful!");
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error(error.message || "Login failed!");
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      logout();
      toast.success("Logged out successfully!");
      navigate("/signin");
    },
    onError: (error) => {
      logout();
      navigate("/signin");
      toast.error(error.message || "Logout failed!");
    },
  });
};

export const useRefreshToken = () => {
  const { setToken } = useAuthStore();

  return useMutation({
    mutationFn: authService.refreshToken,
    onSuccess: (response) => {
      setToken(response.accessToken);
    },
    onError: (error) => {
      console.error("Token refresh failed:", error);
      useAuthStore.getState().logout();
      window.location.href = "/signin";
    },
  });
};

// Profile Hook - Yeni!
export const useProfile = () => {
  const { token, setUser } = useAuthStore();

  return useQuery({
    queryKey: ["user-profile"],
    queryFn: authService.getProfile,
    enabled: !!token, // Token varsa çalış
    staleTime: 5 * 60 * 1000, // 5 dakika fresh
    onSuccess: (response) => {
      // Profile bilgisini store'a kaydet
      setUser(response);
    },
    onError: (error) => {
      console.error("Profile fetch failed:", error);
      // 401 durumunda logout (api.js'de zaten handle ediliyor)
    },
  });
};
