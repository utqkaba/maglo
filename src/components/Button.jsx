export default function Button({
  type = "button",
  variant = "primary",
  disabled = false,
  loading = false,
  onClick,
  children,
  icon,
  className = "",
}) {
  const baseStyles =
    "w-full font-medium p-3 rounded-xl transition cursor-pointer flex items-center justify-center gap-3";

  const variantStyles = {
    primary: `bg-(--color-maglo) text-black ${
      disabled || loading
        ? "opacity-70 cursor-not-allowed"
        : "hover:bg-(--color-maglo)/90"
    }`,
    secondary: `bg-white border border-gray-200 text-gray-700 ${
      disabled ? "opacity-70 cursor-not-allowed" : "hover:bg-gray-50"
    }`,
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {icon && <img src={icon} alt="" className="w-5 h-5" />}
      {children}
    </button>
  );
}
