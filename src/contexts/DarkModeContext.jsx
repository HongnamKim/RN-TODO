import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";

const DarkModeContext = createContext();

export const useDarkModeContext = () => useContext(DarkModeContext);

export default function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const darkColors = {
    BLACK: "#000000",
    WHITE: "#ffffff",

    mainBg: "#09090b",
    subBg: "#27272a",
    mainText: "#ffffff",
    subText: "#9ca3af",
    PRIMARY: {
      LIGHT: "#93c5fd",
      DEFAULT: "#2563eb",
      DARK: "#1e3a8a",
    },
    GRAY: {
      LIGHT: "#e5e5e5",
      DEFAULT: "#a3a3a3",
      DARK: "#515151",
    },
    DANGER: {
      LIGHT: "#fca5a5",
      DEFAULT: "#dc2626",
      DARK: "#7f1d1d",
    },
  };

  const lightColors = {
    BLACK: "#000000",
    WHITE: "#ffffff",

    mainBg: "#f2f2f7",
    subBg: "#ffffff",
    mainText: "#000000",
    subText: "#262626",
    PRIMARY: {
      LIGHT: "#93c5fd",
      DEFAULT: "#2563eb",
      DARK: "#1e3a8a",
    },
    GRAY: {
      LIGHT: "#e5e5e5",
      DEFAULT: "#a3a3a3",
      DARK: "#515151",
    },
    DANGER: {
      LIGHT: "#fca5a5",
      DEFAULT: "#dc2626",
      DARK: "#7f1d1d",
    },
  };

  return (
    <ThemeProvider
      theme={isDarkMode ? { COLORS: darkColors } : { COLORS: lightColors }}
    >
      <DarkModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
        {children}
      </DarkModeContext.Provider>
    </ThemeProvider>
  );
}

DarkModeProvider.propTypes = {
  children: PropTypes.node,
};
