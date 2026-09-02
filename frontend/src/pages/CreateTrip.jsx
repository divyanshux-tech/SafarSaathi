export default function CreateTrip() {
  return (
    <div className="container-app py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900">Create Trip</h1>
        <p className="text-slate-600 mt-2">Placeholder — form will POST to FastAPI Trip Service.</p>

        <div className="mt-8 card space-y-4 opacity-60">
          <div>
            <label className="text-sm font-medium">Destination</label>
            <input disabled placeholder="e.g., Manali, Goa, Jaipur" className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 bg-slate-50" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Start Date</label>
              <input disabled type="date" className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 bg-slate-50" />
            </div>
            <div>
              <label className="text-sm font-medium">End Date</label>
              <input disabled type="date" className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 bg-slate-50" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Budget</label>
            <input disabled placeholder="₹ 25,000" className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 bg-slate-50" />
          </div>
          <button disabled className="w-full btn-primary opacity-50 cursor-not-allowed">Create (wired in next phase)</button>
        </div>

        <p className="text-xs text-slate-500 mt-6 text-center">Route: <code>/trips/create</code> ✓</p>
      </div>
    </div>
  );
}
