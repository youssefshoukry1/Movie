"use client";

import { createContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [ Signup, setSignup] = useState(null);

  const [ account, setAccount ] = useState(null);

  useEffect(()=>{
    const account_id_variable = localStorage.getItem("account_id")
    if(account_id_variable){
      setAccount(account_id_variable)
    }
  })

  useEffect(() => {
    const session_Id = localStorage.getItem("session_id");
    if (session_Id) {
      setSignup(session_Id)
    };
  }, []);

  return (
    <UserContext.Provider value={{ Signup, setSignup, account, setAccount }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;