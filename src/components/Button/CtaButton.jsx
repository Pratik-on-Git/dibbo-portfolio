import { Link } from "react-router";

const VARIANT_CLASS_MAP = {
  accent: "",
  dark: "bp-btn-dark",
};

const CtaButton = ({
  to,
  children,
  variant = "accent",
  fullWidth = false,
  className = "",
}) => {
  const variantClass = VARIANT_CLASS_MAP[variant] ?? VARIANT_CLASS_MAP.accent;
  const widthClass = fullWidth ? "bp-btn-full" : "";
  const classes = ["bp-btn", variantClass, widthClass, className]
    .filter(Boolean)
    .join(" ");

  return (
    <Link to={to} className={classes}>
      <span className="bp-btn-label">{children}</span>
    </Link>
  );
};

export default CtaButton;
