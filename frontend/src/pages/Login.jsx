import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (!form.password) e.password = "Password is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (apiError) setApiError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    if (!validate()) return;
    setLoading(true);
    try {
      await login(form);
      navigate("/dashboard");
    } catch (err) {
      const detail = err.response?.data?.detail;
      if (typeof detail === "string") setApiError(detail);
      else if (Array.isArray(detail)) setApiError(detail.map(d => d.msg).join(", "));
      else setApiError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-app py-12">
      <div className="max-w-md mx-auto card">
        <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
        <p className="text-sm text-slate-600 mt-1">
          Login via <span className="text-sky-600 font-medium">POST /api/auth/login</span> (form-encoded)
        </p>

        {apiError && (
          <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
          <div>
            <label className="text-sm font-medium text-slate-700">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
              className={`mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 ${errors.email ? "border-red-400" : "border-slate-300"}`}
            />
            {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              autoComplete="current-password"
              className={`mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 ${errors.password ? "border-red-400" : "border-slate-300"}`}
            />
            {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {loading && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-slate-600 mt-6 text-center">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-sky-600 hover:underline font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
