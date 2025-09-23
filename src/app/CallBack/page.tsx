"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { environment } from "../enivronment";

export default function CallBack() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // هات التوكن من ال URL
    const urlParams = new URLSearchParams(window.location.search);
    const requestToken = urlParams.get("request_token");
    setToken(requestToken);
  }, []);

  function createSession() {
    if (!token) {
      console.log("No token found");
      return;
    }

    axios
      .post(
        `${environment.apiBaseUrl}/authentication/session/new?api_key=${environment.api_Key}`,
        { request_token: token }
      )
      .then((res) => {
        console.log("session_id:", res.data.session_id);
        localStorage.setItem("session_id", res.data.session_id);
         window.location.href = `/`
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  return (
    <div className="p-4 flex justify-center items-center">
      <button
        onClick={createSession}
        type="button"
        className="text-white cursor-pointer bg-amber-400 hover:bg-amber-500 focus:ring-4 focus:outline-none focus:bg-amber-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2"
      >
      
        Go To Home Page
      </button>
    </div>
  );
}
