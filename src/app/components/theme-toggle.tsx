import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="w-9 h-9 rounded-2xl border border-border-subtle hover:border-border transition-all duration-200"
    >
      {theme === "light" ? (
        <Moon className="h-4 w-4 transition-all" />
      ) : (
        <Sun className="h-4 w-4 transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}