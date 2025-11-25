// CartContext.tsx
"use client";

import UserContext from "../userContext/UserContextProvider";
import axios from "axios";
import { environment } from "../../enivronment";
import { useContext, createContext } from "react";

const FavoriteContext = createContext();

export function CartContextProvider({ children }) {
  const { Signup } = useContext(UserContext);
  const { account } = useContext(UserContext);

  function postFavourite(mediaId:any, type: "movie" | "tv") {
    axios
      .post(
        `https://api.themoviedb.org/3/account/${account}/favorite?api_key=${environment.api_Key}&session_id=${Signup}`,
        {
          media_type: type,
          media_id: mediaId,
          favorite: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        console.log("Added to favourite ✅", mediaId);
      })
      .catch((err) => {
        console.log("Error ❌", err);
      });
  }

  return (
    <FavoriteContext.Provider value={{ postFavourite }}>
      {children}
    </FavoriteContext.Provider>
  );
}


export default FavoriteContext;
