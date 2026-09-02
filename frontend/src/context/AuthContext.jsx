import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import * as authService from "../services/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(true); // initial auth check
  const [error, setError] = useState(null);

  const isAuthenticated = !!token && !!user;

  const clearAuth = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  }, []);

  const fetchMe = useCallback(async () => {
    try {
      const me = await authService.fetchMe();
      setUser(me);
      localStorage.setItem("user", JSON.stringify(me));
      return me;
    } catch (err) {
      clearAuth();
      throw err;
    }
  }, [clearAuth]);

  // Initial hydration: if token exists, validate via /me
  useEffect(() => {
    const init = async () => {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");
      if (storedToken) {
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch {
            // ignore
          }
        }
        try {
          await fetchMe();
        } catch {
          // token invalid -> cleared inside fetchMe
        }
      }
      setLoading(false);
    };
    init();
  }, [fetchMe]);

  const login = useCallback(async ({ email, password }) => {
    setError(null);
    const data = await authService.login({ email, password });
    localStorage.setItem("token", data.access_token);
    setToken(data.access_token);
    const me = await fetchMe();
    return me;
  }, [fetchMe]);

  const register = useCallback(async ({ name, email, password }) => {
    setError(null);
    const userRes = await authService.register({ name, email, password });
    // Auto-login after register for better UX
    try {
      await login({ email, password });
    } catch {
      // if auto-login fails, still return userRes
    }
    return userRes;
  }, [login]);

  const logout = useCallback(() => {
    clearAuth();
  }, [clearAuth]);

  const value = useMemo(() => ({
    user,
    token,
    loading,
    isAuthenticated,
    error,
    setError,
    login,
    register,
    logout,
    fetchMe,
  }), [user, token, loading, isAuthenticated, error, login, register, logout, fetchMe]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
