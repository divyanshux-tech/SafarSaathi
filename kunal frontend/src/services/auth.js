import api from "./api";

/**
 * Auth service - wraps backend /api/auth endpoints
 * Backend uses OAuth2PasswordRequestForm for login (form-encoded)
 */

export async function register({ name, email, password }) {
  const res = await api.post("/api/auth/register", { name, email, password });
  return res.data; // UserResponse
}

export async function login({ email, password }) {
  // OAuth2 spec expects `username` field for email
  const params = new URLSearchParams();
  params.append("username", email);
  params.append("password", password);
  // grant_type optional but some clients send it

  const res = await api.post("/api/auth/login", params, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  return res.data; // { access_token, token_type }
}

export async function fetchMe() {
  const res = await api.get("/api/auth/me");
  return res.data; // UserResponse
}
