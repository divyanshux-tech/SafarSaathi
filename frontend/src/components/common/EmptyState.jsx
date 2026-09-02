import { Link } from "react-router-dom";

export default function EmptyState({
  title = "No trips found",
  description = "Start your journey by creating your first trip.",
  actionLabel = "Create New Trip",
  actionTo = "/trips/create",
}) {
  return (
    <div className="text-center py-16 px-6 bg-white rounded-xl border border-dashed border-slate-300">
      <div className="w-14 h-14 mx-auto bg-sky-50 border border-sky-100 rounded-full flex items-center justify-center text-sky-600 text-xl">
        ✈
      </div>
      <h3 className="mt-4 text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-1 text-sm text-slate-500 max-w-md mx-auto">{description}</p>
      {actionLabel && actionTo && (
        <Link to={actionTo} className="inline-block mt-6 btn-primary text-sm px-6 py-2.5">
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
