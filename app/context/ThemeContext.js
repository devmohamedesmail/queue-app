import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';

// Create the context
const ThemeContext = createContext();

// Define the ThemeProvider
export const ThemeProvider = ({ children }) => {
  const systemTheme = useColorScheme(); // Detect system theme (light/dark)
  const [theme, setTheme] = useState(systemTheme || 'light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    // When system theme changes, update the theme
    setTheme(systemTheme);
  }, [systemTheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);
