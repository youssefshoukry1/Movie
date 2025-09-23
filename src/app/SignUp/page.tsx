"use client";

import axios from "axios";
import React from "react";
import { environment } from "../enivronment";

export default function SignUp() {
  function getRecuestToken() {
    axios
      .get(
        `${environment.apiBaseUrl}/authentication/token/new?api_key=${environment.api_Key}`
      )
      .then((res) => {
        console.log("success", res.data);
        const requestToken = res.data.request_token;
        window.location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://localhost:3000/CallBack`;
      })
      .catch((err) => {
        console.log("err", err);
      });
  }
  return (
    <div className="  p-4 flex justify-center items-center ">
      <button
        onClick={getRecuestToken}
        type="button"
        className="text-white cursor-pointer bg-amber-400 hover:bg-amber-500 focus:ring-4 focus:outline-none focus:bg-amber-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2"
      >
              Sign in with TMDB
      </button>
    </div>
  );
}
