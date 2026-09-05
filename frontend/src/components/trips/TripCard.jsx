import { Link } from "react-router-dom";
import { formatCurrency, formatDateRange, tripDuration, statusColor } from "../../utils/helpers";

export default function TripCard({ trip, onDelete }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
      {/* Header accent */}
      <div className="h-1.5 bg-gradient-to-r from-sky-500 to-indigo-500" />
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-slate-900 truncate">
              {trip.destination}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1 truncate">
              <span>📍</span> {trip.start_place} → {trip.destination}
            </p>
          </div>
          <span className={`shrink-0 text-[11px] font-semibold px-2.5 py-1 rounded-full border ${statusColor(trip.status)}`}>
            {trip.status}
          </span>
        </div>

        <div className="mt-4 space-y-2 text-sm">
          <div className="flex items-center gap-2 text-slate-600">
            <span className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-xs">📅</span>
            <span className="truncate">
              {formatDateRange(trip.start_date, trip.end_date)}
              <span className="text-slate-400 ml-1.5">• {tripDuration(trip.start_date, trip.end_date)}</span>
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <span className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-xs">👥</span>
            <span>{trip.number_of_people} {trip.number_of_people === 1 ? "person" : "people"} • {trip.travel_type}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <span className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-xs">₹</span>
            <span className="font-medium text-slate-900">{formatCurrency(trip.budget)}</span>
          </div>
          {trip.interests && (
            <div className="flex flex-wrap gap-1.5 pt-2">
              {trip.interests.split(",").map((s) => s.trim()).filter(Boolean).slice(0, 4).map((tag) => (
                <span key={tag} className="text-[11px] bg-slate-100 text-slate-600 px-2 py-1 rounded-full border border-slate-200">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="mt-5 flex gap-2">
          <Link
            to={`/trips/${trip.id}`}
            className="flex-1 text-center text-sm font-medium bg-sky-600 text-white px-3 py-2 rounded-lg hover:bg-sky-700 transition-colors"
          >
            View
          </Link>
          <Link
            to={`/trips/${trip.id}/edit`}
            className="flex-1 text-center text-sm font-medium border border-slate-300 bg-white text-slate-700 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Edit
          </Link>
          <button
            onClick={() => onDelete?.(trip)}
            className="px-3 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-sm font-medium transition-colors"
            aria-label={`Delete trip to ${trip.destination}`}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
