import React from "react";

const Button = ({
  text,
  onClick,
  classes,
  type = "button",
  icon,
  isLoading,
}) => {
  return (
    <button type={type} className={classes} onClick={onClick}>
      {isLoading ? "Loading..." : text}
      {icon && <i className={icon}></i>}
    </button>
  );
};

export default Button;
