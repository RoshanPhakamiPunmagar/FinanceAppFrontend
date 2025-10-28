import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router";

const AuthComponent = ({ children }) => {
  const { user } = useAuth();

  //   useLocation
  const location = useLocation();
  console.log(1111, location);

  return (
    <>
      {user?._id ? (
        children
      ) : (
        <Navigate
          to="/login"
          state={{
            from: { location },
          }}
        />
      )}
    </>
  );
};

export default AuthComponent;
