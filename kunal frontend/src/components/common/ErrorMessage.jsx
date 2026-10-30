export default function ErrorMessage({ message, onRetry }) {
  if (!message) return null;
  return (
    <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 flex items-start justify-between gap-4">
      <div className="flex gap-2">
        <span className="text-red-500 mt-0.5">⚠</span>
        <p className="text-sm leading-5">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="shrink-0 text-xs font-semibold bg-white border border-red-200 text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
        >
          Retry
        </button>
      )}
    </div>
  );
}
