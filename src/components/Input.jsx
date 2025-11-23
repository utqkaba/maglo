export default function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
  className = "",
}) {
  return (
    <div className={className}>
      <label className="text-sm font-medium">{label}</label>
      <input
        type={type}
        className={`w-full mt-1 p-3 rounded-xl border focus:outline-none ${
          error ? "border-red-500" : "border-gray-200"
        }`}
        disabled={disabled}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
