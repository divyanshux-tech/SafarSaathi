import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTrips, deleteTrip } from "../services/trips";
import TripCard from "../components/trips/TripCard";
import LoadingState from "../components/common/LoadingState";
import EmptyState from "../components/common/EmptyState";
import ErrorMessage from "../components/common/ErrorMessage";
import ConfirmDialog from "../components/common/ConfirmDialog";
import { getApiError } from "../utils/helpers";

export default function Trips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const fetchTrips = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getTrips();
      setTrips(data);
    } catch (err) {
      setError(getApiError(err, "Failed to load trips"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteTrip(deleteTarget.id);
      setTrips((prev) => prev.filter((t) => t.id !== deleteTarget.id));
      setSuccessMsg(`Trip to ${deleteTarget.destination} deleted successfully`);
      setTimeout(() => setSuccessMsg(""), 3000);
      setDeleteTarget(null);
    } catch (err) {
      setError(getApiError(err, "Failed to delete trip"));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="container-app py-8 sm:py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">My Trips</h1>
          <p className="text-sm text-slate-600 mt-1">
            Manage your travel plans — created via <code className="bg-slate-100 px-1 py-0.5 rounded text-xs">GET /api/trips</code>
          </p>
        </div>
        <Link to="/trips/create" className="btn-primary text-sm px-6 py-2.5 text-center">
          + Create New Trip
        </Link>
      </div>

      {successMsg && (
        <div className="mt-6 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl text-sm">
          ✓ {successMsg}
        </div>
      )}

      <div className="mt-6">
        {error && <ErrorMessage message={error} onRetry={fetchTrips} />}
      </div>

      <div className="mt-6">
        {loading ? (
          <LoadingState message="Loading your trips..." />
        ) : trips.length === 0 && !error ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {trips.map((trip) => (
              <TripCard key={trip.id} trip={trip} onDelete={setDeleteTarget} />
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete trip?"
        message={`Are you sure you want to delete trip to ${deleteTarget?.destination}? This action cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => !deleting && setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  );
}
