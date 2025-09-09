"use client";

import { createContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [isLogin, setLogin] = useState(null);
  const [mood, setMood] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedMood = localStorage.getItem("mood");

      if (storedMood) {
        // ✅ لو فيه mood مخزن → نمشي بيه
        setMood(storedMood);
      } else {
        // ❌ مفيش → نشوف الجهاز أول مرة بس
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const defaultMood = prefersDark ? "dark" : "light";
        setMood(defaultMood);
        localStorage.setItem("mood", defaultMood); // نخزنها أول مرة
      }

      const token = localStorage.getItem("userToken");
      if (token) setLogin(token);
    }
  }, []);

  const handleMood = () => {
    setMood((prevMood) => {
      const newMood = prevMood === "dark" ? "light" : "dark";
      if (typeof window !== "undefined") {
        localStorage.setItem("mood", newMood); // ✅ نخزن الجديد بس (من غير removeItem)
      }
      return newMood;
    });
  };

  if (mood === null) return null;

  return (
    <UserContext.Provider value={{ isLogin, setLogin, mood, setMood, handleMood }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;