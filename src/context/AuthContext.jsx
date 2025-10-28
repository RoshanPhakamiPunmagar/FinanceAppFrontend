import { createContext, useContext, useState } from "react";

// create context
const AuthContext = createContext();

// create provider
export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const logOut = () => {
    setUser(null);
    localStorage.removeItem("accessJWT");
  };

  const providedData = {
    user,
    setUser,
    logOut,
  };

  return (
    <AuthContext.Provider value={providedData}>
      {props.children}
    </AuthContext.Provider>
  );
};

// consume the provider
export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
