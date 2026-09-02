import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="container-app py-12">
      <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
      <p className="text-slate-600 mt-2">Placeholder — future: trips overview, AI recommendations, budget.</p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <h3 className="font-semibold">Your Trips</h3>
          <p className="text-sm text-slate-600 mt-1">No trips yet. Create your first itinerary.</p>
          <Link to="/trips/create" className="inline-block mt-3 text-sm text-sky-600 hover:underline">Create Trip →</Link>
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

      <p className="text-xs text-slate-500 mt-6">Route: <code>/dashboard</code> ✓</p>
    </div>
  );
}
