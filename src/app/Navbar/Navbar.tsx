"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  return (
    <div
      className="mx-auto p-4 border border-gray-700 
      flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4
      rounded-2xl shadow-lg 
      bg-gradient-to-r from-[#141E30] via-[#1A1A1A] to-[#243B55] 
      mt-4 lg:mx-20 relative backdrop-blur-md z-50"
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
            All
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
                  <Link href={`/category/movies`}>
                    <span className="block px-4 py-2 hover:bg-[#333] cursor-pointer transition rounded-md">
                      Movies
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href={`/category/tv`}>
                    <span className="block px-4 py-2 hover:bg-[#333] cursor-pointer transition rounded-md">
                      TV Shows
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
  );
}
