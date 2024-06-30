import React from "react";
import authService from "../../firebase/auth";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { clearPosts } from "../../store/postSlice";
import { useNavigate } from "react-router-dom";

const LogoutButton = ({
  type = "button",
  bgColor = "bg-red-600",
  textColor = "text-white",
  onHover = "hover:bg-red-800",
  duration = "duration-200",
  clasName = "",
  ...props
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logOutHandler = async () => {
    await authService.logout();
    dispatch(logout());
    dispatch(clearPosts());
    navigate("/login");
  };

  return (
    <button
      onClick={logOutHandler}
      className={`inline-block px-6 py-2 ${bgColor} ${textColor} ${onHover} ${duration} ${clasName}`}
      type={type}
      {...props}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
