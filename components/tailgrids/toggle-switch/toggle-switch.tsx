"use client";
import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ToggleSwitch = () => {
  const { theme, setTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setTheme(newTheme);
    setIsDark(!isDark);
  };

  return (
    <div className="m-2">
      <button
        onClick={toggleTheme}
        aria-label="Toggle Dark Mode"
        className="relative flex h-8 w-16 items-center rounded-full mr-4 bg-gray-500 dark:bg-gray-600 transition-colors"
      >
        <span
          className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-yellow-500 shadow transition-all duration-300 ease-in-out
            ${isDark ? "translate-x-8 bg-black" : ""}`}
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </span>
      </button>
    </div>
  );
};

export default ToggleSwitch;
