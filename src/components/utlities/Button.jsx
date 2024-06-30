import React from "react";

const Button = ({
  children,
  type = "button",
  bgColor = "bg-orange-600",
  textColor = "text-white",
  onHover = "hover:bg-orange-800",
  duration = "duration-200",
  clasName = "",
  ...props
}) => {
  return (
    <button
      className={`inline-block px-6 py-2 ${bgColor} ${textColor} ${onHover} ${duration} ${clasName}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
