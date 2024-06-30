import React, { useEffect, useState } from "react";
import authService from "../firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, logout } from "../store/authSlice";

const AuthLayout = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  // const initializeLogout = async () => {
  //   if (!authStatus) {
  //     const flag = await authService.logout();
  //     if (flag) {
  //       dispatch(logout());
  //       navigate("/login");
  //     }
  //   }
  //   setLoader(false);
  // };

  useEffect(() => {
    if (!authStatus) {
      dispatch(logout());
      navigate("/login");
    }
    setLoader(false);
    // if (authentication && authStatus !== authentication) {
    //   dispatchEvent
    //   navigate("/login");
    // } else if (!authentication && authStatus !== authentication) {
    //   navigate("/home");
    // }
  }, [navigate]);

  return loader ? (
    <h1 className="text-white text-2xl text-center">Loading...</h1>
  ) : (
    <>{children}</>
  );
};

export default AuthLayout;
