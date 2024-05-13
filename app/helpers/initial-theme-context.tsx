import { createContext, useContext } from "react";
import { Theme } from "~/helpers/types";

export const InitialThemeContext = createContext<Theme>("light");

export function useInitialTheme() {
  const context = useContext(InitialThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
