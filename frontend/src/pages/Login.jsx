export default function Login() {
  return (
    <div className="container-app py-12">
      <div className="max-w-md mx-auto card">
        <h1 className="text-2xl font-bold text-slate-900">Login</h1>
        <p className="text-sm text-slate-600 mt-1">Placeholder — auth wiring in next phase.</p>
        <div className="mt-6 space-y-4 opacity-60">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input disabled placeholder="you@example.com" className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 bg-slate-50" />
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <input disabled type="password" placeholder="••••••••" className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 bg-slate-50" />
          </div>
          <button disabled className="w-full btn-primary opacity-50 cursor-not-allowed">Login</button>
        </div>
        <p className="text-xs text-slate-500 mt-4 text-center">Route: <code>/login</code> ✓</p>
      </div>
    </div>
  );
}
