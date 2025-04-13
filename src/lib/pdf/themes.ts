
import { ThemeOption } from "@/lib/api/types";

// Define the available themes
export const themes: ThemeOption[] = [
  {
    id: "classic",
    name: "Classic",
    colors: {
      primary: "#000000",
      background: "#ffffff",
      accent: "#666666"
    }
  },
  {
    id: "modern",
    name: "Modern",
    colors: {
      primary: "#333333",
      background: "#f5f5f5",
      accent: "#0066cc"
    }
  },
  {
    id: "elegant",
    name: "Elegant",
    colors: {
      primary: "#2c3e50",
      background: "#ecf0f1",
      accent: "#e74c3c"
    }
  },
  {
    id: "minimal",
    name: "Minimal",
    colors: {
      primary: "#444444",
      background: "#ffffff",
      accent: "#dddddd"
    }
  },
  {
    id: "dark",
    name: "Dark Mode",
    colors: {
      primary: "#ffffff",
      background: "#121212",
      accent: "#bb86fc"
    }
  }
];

// Export the themes for use in other components
export default themes;

// Export function to get all theme options
export const getAllThemeOptions = (): ThemeOption[] => {
  return themes;
};
