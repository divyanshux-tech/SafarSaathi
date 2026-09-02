export default function LoadingState({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-slate-500">
      <div className="w-8 h-8 border-2 border-slate-300 border-t-sky-600 rounded-full animate-spin" />
      <p className="mt-3 text-sm font-medium">{message}</p>
    </div>
  );
}
