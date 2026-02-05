type BadgeProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
};

export const Badge = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
}: BadgeProps) => {
  const variantClasses = {
    primary: "bg-forest text-white",
    secondary: "bg-forest/10 text-forest",
    outline: "border border-forest text-forest bg-transparent",
  };

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-xs",
    lg: "px-4 py-1.5 text-sm",
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </span>
  );
};
