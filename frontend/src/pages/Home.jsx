import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import useAuth from "../hooks/useAuth";

export default function Home() {
  const [apiStatus, setApiStatus] = useState("checking");
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const base = import.meta.env.VITE_API_BASE_URL;
    // Lightweight health check - backend may expose /health or /docs
    // We try /health, fallback to base URL reachability
    api
      .get("/health")
      .then(() => setApiStatus("connected"))
      .catch(() => {
        // Try root if /health not available
        api
          .get("/")
          .then(() => setApiStatus("connected"))
          .catch(() => setApiStatus("unreachable"));
      });
  }, []);

  return (
    <div className="container-app py-12">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-3 py-1 text-xs text-slate-600 mb-6">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          Frontend Running • Vite + React + Tailwind
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
          Welcome to <span className="text-sky-600">SafarSaathi</span>
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          AI-Powered Autonomous Travel Assistant — Plan, personalize and
          experience smarter journeys.
        </p>

        {isAuthenticated && (
          <p className="mt-3 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 inline-block px-3 py-1 rounded-full">
            Logged in as {user?.name} ({user?.email})
          </p>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="btn-primary px-6 py-3">
                Go to Dashboard
              </Link>
              <Link
                to="/trips"
                className="px-6 py-3 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 font-medium transition-colors"
              >
                Explore Trips
              </Link>
            </>
          ) : (
            <>
              <Link to="/register" className="btn-primary px-6 py-3">
                Get Started
              </Link>
              <Link
                to="/login"
                className="px-6 py-3 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 font-medium transition-colors"
              >
                Login
              </Link>
            </>
          )}
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          <div className="card">
            <h3 className="font-semibold text-slate-900">Backend</h3>
            <p className="text-sm text-slate-600 mt-1 break-all">
              {import.meta.env.VITE_API_BASE_URL}
            </p>
            <p className="text-xs mt-2">
              Status:{" "}
              <span
                className={
                  apiStatus === "connected"
                    ? "text-emerald-600 font-medium"
                    : apiStatus === "checking"
                    ? "text-amber-600"
                    : "text-slate-500"
                }
              >
                {apiStatus}
              </span>
            </p>
          </div>
          <div className="card">
            <h3 className="font-semibold text-slate-900">Stack</h3>
            <p className="text-sm text-slate-600 mt-1">
              React + Vite • Tailwind • React Router • Axios
            </p>
          </div>
          <div className="card">
            <h3 className="font-semibold text-slate-900">Auth Status</h3>
            <p className="text-sm text-slate-600 mt-1">
              {isAuthenticated ? `Authenticated ✓ (${user?.email})` : "Not logged in — Login/Register ready"}
            </p>
          </div>
        </div>

        <p className="mt-8 text-xs text-slate-400">
          Foundation ready • Routes: /login, /register, /dashboard, /trips,
          /trips/create
        </p>
      </div>
    </div>
  );
}
