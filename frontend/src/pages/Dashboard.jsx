import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="container-app py-12">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome, {user?.name || "Traveler"} 👋
          </h1>
          <p className="text-slate-600 mt-1">
            {user?.email} • Authenticated via JWT <code className="bg-slate-100 px-1 rounded">/api/auth/me</code>
          </p>
        </div>
        <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full">
          ● Authenticated
        </span>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <h3 className="font-semibold">Your Trips</h3>
          <p className="text-sm text-slate-600 mt-1">No trips yet. Create your first itinerary.</p>
          <Link to="/trips/create" className="inline-block mt-3 text-sm text-sky-600 hover:underline">
            Create Trip →
          </Link>
        </div>
        <div className="card opacity-60">
          <h3 className="font-semibold">AI Planner (soon)</h3>
          <p className="text-sm text-slate-600 mt-1">Personalized itinerary generation.</p>
        </div>
        <div className="card opacity-60">
          <h3 className="font-semibold">Budget (soon)</h3>
          <p className="text-sm text-slate-600 mt-1">Cost estimation & optimization.</p>
        </div>
      </div>

      <div className="mt-6 card bg-slate-900 text-slate-100">
        <h4 className="font-semibold text-white">User Debug</h4>
        <pre className="text-xs mt-2 overflow-auto bg-slate-800 p-3 rounded-lg">
{JSON.stringify(user, null, 2)}
        </pre>
      </div>
    </div>
  );
}
