// Placeholder hook - will manage auth state in later phase
export default function useAuth() {
  return {
    user: null,
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
  };
}
