import { Link } from "react-router-dom";

export default function Trips() {
  return (
    <div className="container-app py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Trips</h1>
        <Link to="/trips/create" className="btn-primary text-sm">+ New Trip</Link>
      </div>
      <p className="text-slate-600 mt-2">Placeholder — will list trips from <code>GET /trips</code> in next phase.</p>

      <div className="mt-8 card border-dashed text-center py-12">
        <p className="text-slate-500">No trips found (mock).</p>
        <p className="text-xs text-slate-400 mt-1">Backend: <code>{import.meta.env.VITE_API_BASE_URL}/trips</code></p>
      </div>

      <p className="text-xs text-slate-500 mt-6">Route: <code>/trips</code> ✓</p>
    </div>
  );
}
