"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { environment } from "../../enivronment";
import HomeLoading from "@/app/loading";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function SearchPage() {
  const { query } = useParams();
    const [showDropdown, setShowDropdown] = useState(false);
    const [search, setSearch] = useState("");
    const router = useRouter();
  const { isLoading, data } = useQuery({
    queryKey: ["searchResults", query],
    queryFn: async () => {
      const { data } = await axios.get(
        `${environment.apiBaseUrl}/search/multi?api_key=${environment.api_Key}&query=${query}&language=en-US`
      );
      return data.results ?? [];
    },
    enabled: !!query,
  });

  if (isLoading) return <HomeLoading/>

  return (
    <section className="bg-[#222831] min-h-screen text-white p-6">

               <div
      className="mx-auto p-4 border border-gray-700 
      flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4
      rounded-2xl shadow-lg 
      bg-transparent 
      mt-4 lg:mx-20 relative backdrop-blur-md z-50 my-9"
    >
      {/* Logo */}
      <div className="flex justify-center sm:justify-start">
        <h1 className="text-lg sm:text-2xl font-bold text-white tracking-wide">
          🎬 Cima Quilty
        </h1>
      </div>
      
      {/* Search Form */}
      <form
        className="relative flex items-center gap-2 w-full max-w-md mx-auto sm:mx-0"
        onSubmit={(e) => {
          e.preventDefault();
          if (search.trim()) {
            router.push(`/search/${search}`);
          }
        }}
      >
        {/* Dropdown */}
        <div className="relative">
          <button
            type="button"
            className="outline-none flex items-center gap-1 px-3 py-2 
            text-xs sm:text-sm font-medium text-white bg-[#2C2C2C] border border-gray-600 
            rounded-lg hover:bg-[#3d3d3d] transition-colors"
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            Select
            <svg
              className={`w-3 h-3 transition-transform ${
                showDropdown ? "rotate-180" : "rotate-0"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          {showDropdown && (
            <div
              className="absolute top-full mt-2 left-0 w-36 bg-[#1E1E1E] text-white 
              rounded-lg shadow-lg border border-gray-700 z-50 animate-fadeIn"
            >
              <ul className="py-2 text-sm flex flex-col">
                <li>
                  <Link href="/"  onClick={() => setShowDropdown(false)}>
                    <span className="block px-4 py-2 hover:bg-[#333] cursor-pointer transition rounded-md">
                      All
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href={`/Movies`}  onClick={() => setShowDropdown(false)}>
                    <span className="block px-4 py-2 hover:bg-[#333] cursor-pointer transition rounded-md">
                      Movies
                    </span>
                  </Link>
                </li>
                    <li>
                  <Link href={`/Tv`}  onClick={() => setShowDropdown(false)}>
                    <span className="block px-4 py-2 hover:bg-[#333] cursor-pointer transition rounded-md">
                      Tv
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Input */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          className="outline-none px-3 py-2 w-full text-sm text-white 
          bg-[#2C2C2C] border border-gray-600 rounded-lg 
          focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 
          transition-all placeholder-gray-400"
          placeholder="Search movies, tv shows..."
          required
        />
      </form>
    </div>

      <h1 className="text-2xl font-bold mb-6">Results for: {query}</h1>

      {data?.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {data.map((item: any) => (
            <Link key={item.id} href={`/MoviesDetails/${item.id}`}>
              <div className="relative group shadow-lg rounded-2xl overflow-hidden">
                <Image
                  src={
                    item.poster_path
                      ? `${environment.baseImgUrl}${item.poster_path}`
                      : "/no-image.jpg"
                  }
                  alt={item.title || item.name}
                  width={200}
                  height={300}
                  className="w-full h-auto object-cover rounded-xl"
                />
                <div className="absolute bottom-0 bg-black/60 w-full p-2 text-center">
                  <p className="text-white text-sm truncate">
                    {item.title || item.name}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
