import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Register() {
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    // already logged in, optional redirect could be handled, but allow staying
  }

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "Min 6 characters";
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
      await register(form);
      navigate("/dashboard");
    } catch (err) {
      const detail = err.response?.data?.detail;
      if (Array.isArray(detail)) {
        // Pydantic validation array
        setApiError(detail.map(d => d.msg).join(", "));
      } else if (typeof detail === "string") {
        setApiError(detail);
      } else {
        setApiError(err.response?.data?.msg || err.message || "Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-app py-12">
      <div className="max-w-md mx-auto card">
        <h1 className="text-2xl font-bold text-slate-900">Create Account</h1>
        <p className="text-sm text-slate-600 mt-1">
          Join SafarSaathi — <span className="text-sky-600 font-medium">POST /api/auth/register</span>
        </p>

        {apiError && (
          <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
          <div>
            <label className="text-sm font-medium text-slate-700">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className={`mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 ${errors.name ? "border-red-400" : "border-slate-300"}`}
            />
            {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
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
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="text-sm text-slate-600 mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-sky-600 hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
