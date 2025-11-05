import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import DefaultLayout from "./components/layouts/DefaultLayout";
import Signup from "./pages/Signup";
import { Route, Routes } from "react-router";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Transaction from "./pages/Transaction";
import AuthComponent from "./auth/AuthComponent";
import { useAuth } from "./context/AuthContext";
import axios from "axios";
import AddTransaction from "./pages/AddTransaction";

function App() {
  const { user, setUser } = useAuth();
  const [count, setCount] = useState(0);
  let color = "white";

  const autoLogin = async () => {
    if (!user?._id) {
      // check for token
      let token = localStorage.getItem("accessJWT");

      if (token && token != "") {
        // call the api
        let response = await axios({
          method: "Get",
          url: "http://localhost:3000/api/v1/users",
          //url: "https://financeapp-1-1myj.onrender.com/api/v1/users",
          headers: {
            Authorization: token,
          },
        });

        console.log(response);

        if (response.data.status == "success") {
          // update the auth context user
          setUser(response.data.user);
        }
      }
    }
  };

  // auto login process
  useEffect(() => {
    // auto login function
    autoLogin();
  }, []);

  return (
    <>
      <Routes>
        {/* signup */}
        <Route path="/" element={<DefaultLayout />}>
          {/* public */}
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login color={color} />} />

          {/* private */}
          <Route
            path="dashboard"
            element={
              <AuthComponent>
                <Dashboard />
              </AuthComponent>
            }
          />
          <Route
            path="transaction"
            element={
              <AuthComponent>
                <Transaction />
              </AuthComponent>
            }
          />

          <Route
            path="add-transaction"
            element={
              <AuthComponent>
                <AddTransaction />
              </AuthComponent>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
