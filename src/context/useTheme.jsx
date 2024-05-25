import { createContext, useEffect, useState } from "react";

const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    // Accessing the body directly from the document
    const body = document.body;
    const html = document.documentElement;

    if (theme === "light") {
      html.classList.remove("dark");
      body.classList.remove("dark-body");
      html.classList.add("light");
    } else {
      html.classList.remove("light");
      html.classList.add("dark");
      body.classList.add("dark-body");
    }
  }, [theme]);

  const value = {
    theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export { ThemeContextProvider, ThemeContext };
