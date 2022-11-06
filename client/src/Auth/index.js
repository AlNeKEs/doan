import React from "react";
import { Navigate } from "react-router-dom";
import Login from "../Pages/Login";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import {Spin} from "antd";

const Auth = () => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);
  if (authLoading) {
    return (
      <Spin />
    );
  }
  return <>{isAuthenticated ? <Navigate to="/dashboard" /> : <Login/>}</>;
};

export default Auth;
