import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const adminlocaltoken = localStorage.getItem("token");
  const WEBSITE = localStorage.getItem("WEBSITE");

  
  
  // if(WEBSITE === 'KHULASAFIRST' && adminlocaltoken)
  // {
  //   let auth = adminlocaltoken ? { token: true } : { token: false };
  //  return auth.token ? <Outlet /> : <Navigate to="/login" />;
  // }else{
  //   <Navigate to="/login" />;
  // }

  // if (!adminlocaltoken) {
  //   navigate("/login");
  //   toast.info("Acess Denied...");
  // }

  let auth = adminlocaltoken && WEBSITE === 'KHULASAFIRST' ? { token: true } : { token: false };
  return auth.token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
