import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container-app py-20 text-center">
      <h1 className="text-4xl font-bold text-slate-900">404 — Not Found</h1>
      <p className="text-slate-600 mt-2">The page you’re looking for doesn’t exist.</p>
      <Link to="/" className="inline-block mt-6 btn-primary">Back to Home</Link>
    </div>
  );
}
