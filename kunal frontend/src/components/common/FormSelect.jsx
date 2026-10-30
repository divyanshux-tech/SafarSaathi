export default function FormSelect({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = "Select",
  error,
  required = false,
  disabled = false,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-slate-700 mb-1"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white transition-colors
          ${error ? "border-red-300 bg-red-50/30" : "border-slate-300"}
          ${disabled ? "bg-slate-50" : ""}`}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => {
          const val = typeof opt === "string" ? opt : opt.value;
          const lbl = typeof opt === "string" ? opt : opt.label;
          return (
            <option key={val} value={val}>
              {lbl}
            </option>
          );
        })}
      </select>
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}
