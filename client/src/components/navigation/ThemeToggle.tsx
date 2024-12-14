"use client";
import { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";

import classes from "./ThemeToggle.module.css";

function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button className={classes["theme-toggle__btn"]} onClick={toggleTheme}>
      {theme === "dark" ? (
        <div className={classes["theme-toggle__icon"]}>
          <IoSunny />
        </div>
      ) : (
        <div className={classes["theme-toggle__icon"]}>
          <FaMoon />
        </div>
      )}
    </button>
  );
}

export default ThemeToggle;
