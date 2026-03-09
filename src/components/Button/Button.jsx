import { Link } from "react-router";
import "./Button.css";

const Button = ({ to, children, className = "" }) => {
  const classes = ["site-btn", className].filter(Boolean).join(" ");

  return (
    <button className={classes}>
      <Link to={to}>{children}</Link>
    </button>
  );
};

export default Button;
