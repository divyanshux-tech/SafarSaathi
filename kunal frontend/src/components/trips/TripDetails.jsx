import { formatCurrency, formatDateRange, tripDuration, statusColor } from "../../utils/helpers";

function DetailRow({ label, value, icon }) {
  return (
    <div className="flex gap-3 py-3 border-b border-slate-100 last:border-0">
      <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-sm shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</p>
        <p className="text-sm font-medium text-slate-900 mt-0.5 break-words">{value || "-"}</p>
      </div>
    </div>
  );
}

export default function TripDetailsView({ trip }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="h-2 bg-gradient-to-r from-sky-500 via-indigo-500 to-sky-500" />
      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 flex items-center gap-2">
              📍 {trip.destination}
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              From <span className="font-medium text-slate-900">{trip.start_place}</span> → <span className="font-medium text-slate-900">{trip.destination}</span>
            </p>
          </div>
          <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${statusColor(trip.status)}`}>
            {trip.status}
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-8">
          <DetailRow icon="📅" label="Travel Dates" value={`${formatDateRange(trip.start_date, trip.end_date)} • ${tripDuration(trip.start_date, trip.end_date)}`} />
          <DetailRow icon="👥" label="Travellers" value={`${trip.number_of_people} ${trip.number_of_people === 1 ? "person" : "people"} • ${trip.travel_type}`} />
          <DetailRow icon="₹" label="Budget" value={formatCurrency(trip.budget)} />
          <DetailRow icon="🚆" label="Preferred Transport" value={trip.preferred_transport} />
          <DetailRow icon="🏨" label="Hotel Type" value={trip.hotel_type} />
          <DetailRow icon="🍽" label="Food Preference" value={trip.food_preference} />
          <DetailRow icon="✈" label="Travel Type" value={trip.travel_type} />
          <DetailRow icon="💡" label="Interests" value={trip.interests || "No interests added"} />
        </div>

        <div className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap gap-2 text-xs text-slate-500">
          <span>Trip #{trip.id}</span>
          <span>•</span>
          <span>Created {trip.created_at ? new Date(trip.created_at).toLocaleString() : "-"}</span>
        </div>
      </div>
    </div>
  );
}
