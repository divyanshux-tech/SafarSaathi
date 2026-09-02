import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getTripById, deleteTrip } from "../services/trips";
import TripDetailsView from "../components/trips/TripDetails";
import LoadingState from "../components/common/LoadingState";
import ErrorMessage from "../components/common/ErrorMessage";
import ConfirmDialog from "../components/common/ConfirmDialog";
import { getApiError } from "../utils/helpers";

export default function TripDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fetchTrip = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getTripById(id);
      setTrip(data);
    } catch (err) {
      setError(getApiError(err, "Trip not found"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrip();
  }, [id]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteTrip(id);
      navigate("/trips", { state: { msg: "Trip deleted successfully" } });
    } catch (err) {
      setError(getApiError(err, "Failed to delete trip"));
    } finally {
      setDeleting(false);
      setShowDelete(false);
    }
  };

  if (loading) {
    return (
      <div className="container-app py-10">
        <LoadingState message="Loading trip details..." />
      </div>
    );
  }

  if (error && !trip) {
    return (
      <div className="container-app py-10 max-w-3xl mx-auto">
        <ErrorMessage message={error} onRetry={fetchTrip} />
        <Link to="/trips" className="inline-block mt-6 btn-primary text-sm">
          Back to My Trips
        </Link>
      </div>
    );
  }

  return (
    <div className="container-app py-8 sm:py-10">
      <div className="max-w-3xl mx-auto">
        <Link to="/trips" className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900">
          ← Back to My Trips
        </Link>

        {error && (
          <div className="mt-4">
            <ErrorMessage message={error} />
          </div>
        )}

        <div className="mt-6">
          <TripDetailsView trip={trip} />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to={`/trips/${trip.id}/edit`}
            className="flex-1 sm:flex-none btn-primary text-sm px-6 py-2.5 text-center"
          >
            Edit Trip
          </Link>
          <button
            onClick={() => setShowDelete(true)}
            className="flex-1 sm:flex-none px-6 py-2.5 rounded-lg border border-red-200 bg-white text-red-600 hover:bg-red-50 text-sm font-medium transition-colors"
          >
            Delete Trip
          </button>
          <Link
            to="/trips"
            className="flex-1 sm:flex-none px-6 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 text-sm font-medium text-center transition-colors"
          >
            Back to My Trips
          </Link>
        </div>
      </div>

      <ConfirmDialog
        open={showDelete}
        title="Delete this trip?"
        message={`Are you sure you want to delete trip to ${trip?.destination}? This action cannot be undone.`}
        confirmLabel="Delete Trip"
        onConfirm={handleDelete}
        onCancel={() => !deleting && setShowDelete(false)}
        loading={deleting}
      />
    </div>
  );
}
