import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getTripById, updateTrip } from "../services/trips";
import TripForm from "../components/trips/TripForm";
import LoadingState from "../components/common/LoadingState";
import ErrorMessage from "../components/common/ErrorMessage";
import { getApiError } from "../utils/helpers";

export default function EditTrip() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [fetchError, setFetchError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setFetchError("");
      try {
        const data = await getTripById(id);
        setTrip(data);
      } catch (err) {
        setFetchError(getApiError(err, "Failed to load trip"));
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const handleSubmit = async (payload) => {
    setError("");
    setSuccess("");
    setSaving(true);
    try {
      await updateTrip(id, payload);
      setSuccess("Trip updated successfully! Redirecting...");
      setTimeout(() => navigate(`/trips/${id}`), 800);
    } catch (err) {
      setError(getApiError(err, "Failed to update trip"));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container-app py-10">
        <LoadingState message="Loading trip..." />
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="container-app py-10 max-w-3xl mx-auto">
        <ErrorMessage message={fetchError} onRetry={() => window.location.reload()} />
        <Link to="/trips" className="inline-block mt-6 btn-primary text-sm">
          Back to My Trips
        </Link>
      </div>
    );
  }

  return (
    <div className="container-app py-8 sm:py-10">
      <div className="max-w-3xl mx-auto">
        <Link to={`/trips/${id}`} className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900">
          ← Back to Trip Details
        </Link>
        <div className="mt-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Edit Trip</h1>
          <p className="text-sm text-slate-600 mt-1">
            Update your travel details — will be sent via <code className="bg-slate-100 px-1 py-0.5 rounded text-xs">PUT /api/trips/{id}</code>
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
          <TripForm initialData={trip} onSubmit={handleSubmit} loading={saving} submitLabel="Update Trip" />
        </div>
      </div>
    </div>
  );
}
