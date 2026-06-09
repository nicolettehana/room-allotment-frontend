import { useAuthContext } from "./authContext";

export const useAuth = () => {
  const ctx = useAuthContext();

  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return ctx;
};
