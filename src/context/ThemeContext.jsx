import { createContext, useContext, useState } from "react";

// create context
const ThemeContext = createContext();

// create provider
export const ThemeProvider = (props) => {
  const [color, setColor] = useState("bg-primary");

  let color1 = "red";
  let color2 = "blue";
  let color3 = "black";

  const currentColor = () => {
    return "Current color is " + color;
  };

  const toggleColor = () => {
    setColor((prev) => (prev === "bg-primary" ? "bg-success" : "bg-primary"));
  };

  const providedData = {
    color,
    currentColor,
    color3,
    toggleColor,
  };

  return (
    <ThemeContext.Provider value={providedData}>
      {props.children}
    </ThemeContext.Provider>
  );
};

// consume the provider
export const useTheme = () => {
  const context = useContext(ThemeContext);
  return context;
};
