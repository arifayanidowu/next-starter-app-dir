"use client";
import { useCallback, useEffect, useState } from "react";

const useDark = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (
      localStorage.dark === "true" ||
      !("dark" in localStorage) ||
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setIsDark(true);
      localStorage.setItem("dark", "true");
      document.cookie = "dark=true";
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      localStorage.setItem("dark", "false");
      document.cookie = "dark=false";
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDark = useCallback(() => {
    if (isDark) {
      setIsDark(false);
      localStorage.setItem("dark", "false");
      document.cookie = "dark=false";
      document.documentElement.classList.remove("dark");
    } else {
      setIsDark(true);
      localStorage.setItem("dark", "true");
      document.cookie = "dark=true";
      document.documentElement.classList.add("dark");
    }
  }, [isDark]);

  return {
    isDark,
    toggleDark,
  };
};

export default useDark;
