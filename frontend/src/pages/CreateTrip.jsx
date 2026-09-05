import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import TripForm from "../components/trips/TripForm";
import ErrorMessage from "../components/common/ErrorMessage";
import { createTrip } from "../services/trips";
import { getApiError } from "../utils/helpers";

export default function CreateTrip() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (payload) => {
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await createTrip(payload);
      setSuccess("Trip created successfully! Redirecting...");
      setTimeout(() => navigate("/trips"), 800);
    } catch (err) {
      setError(getApiError(err, "Failed to create trip"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-app py-8 sm:py-10">
      <div className="max-w-3xl mx-auto">
        <Link to="/trips" className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900">
          ← Back to My Trips
        </Link>
        <div className="mt-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Create New Trip</h1>
          <p className="text-sm text-slate-600 mt-1">
            Fill your travel details — will be sent via <code className="bg-slate-100 px-1 py-0.5 rounded text-xs">POST /api/trips</code>
          </p>
        </div>

        {success && (
          <div className="mt-6 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl text-sm">
            ✓ {success}
          </div>
        )}
        {error && (
          <div className="mt-6">
            <ErrorMessage message={error} />
          </div>
        )}

        <div className="mt-6 bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <TripForm onSubmit={handleSubmit} loading={loading} submitLabel="Create Trip" />
        </div>
      </div>
    </div>
  );
}
