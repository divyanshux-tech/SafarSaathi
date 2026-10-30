export const formatCurrency = (amount) => {
  if (amount == null) return "-";
  return `₹${Number(amount).toLocaleString("en-IN")}`;
};

export const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
};

export const formatDateRange = (start, end) => {
  if (!start || !end) return "-";
  return `${formatDate(start)} — ${formatDate(end)}`;
};

export const tripDuration = (start, end) => {
  if (!start || !end) return "";
  const s = new Date(start);
  const e = new Date(end);
  const diff = Math.ceil((e - s) / (1000 * 60 * 60 * 24)) + 1;
  if (diff <= 0) return "";
  return diff === 1 ? "1 day" : `${diff} days`;
};

export const statusColor = (status) => {
  switch (status) {
    case "Planning":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "Confirmed":
      return "bg-sky-50 text-sky-700 border-sky-200";
    case "Completed":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "Cancelled":
      return "bg-red-50 text-red-700 border-red-200";
    default:
      return "bg-slate-50 text-slate-700 border-slate-200";
  }
};

// Extract friendly error message from axios error
export const getApiError = (err, fallback = "Something went wrong") => {
  const detail = err?.response?.data?.detail;
  if (!detail) return err?.message || fallback;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) {
    return detail.map((d) => d.msg || JSON.stringify(d)).join(", ");
  }
  if (typeof detail === "object" && detail.msg) return detail.msg;
  return fallback;
};
