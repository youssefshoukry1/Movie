"use client";

import { createContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [ Signup, setSignup] = useState(null);

  useEffect(() => {
    const session_Id = localStorage.getItem("session_id");
    if (session_Id) {
      setSignup(session_Id)
    };
  }, []);

  return (
    <UserContext.Provider value={{ Signup, setSignup, }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;