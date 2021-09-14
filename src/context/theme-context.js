import { useContext, createContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState(
    localStorage.getItem("jarvisLearnTheme") || "dark"
  );

  localStorage.setItem("jarvisLearnTheme", currentTheme);

  const changeTheme = (theme) => {
    setCurrentTheme(theme);
    localStorage.setItem("jarvisLearnTheme", theme);
  };

  useEffect(() => {
    document.body.className = currentTheme;
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
