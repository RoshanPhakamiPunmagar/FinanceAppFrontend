import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";
import { useTheme } from "../../context/ThemeContext";

const DefaultLayout = () => {
  const { color } = useTheme();
  return (
    <div className="wrapper">
      {/* nav bar */}
      <Header />
      {/* content */}
      <main className={color}>
        <Outlet />
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DefaultLayout;
