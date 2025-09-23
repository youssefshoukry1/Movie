"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { environment } from "../enivronment";
import "keen-slider/keen-slider.min.css";
import Link from "next/link";
import HomeLoading from "../loading";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function MoviesPage() {
  const searchParams = useSearchParams();
  const [showDropdown, setShowDropdown] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const currentPage = Number(searchParams.get("page")) || 1;
  const [page, setPage] = useState(currentPage);
  const [totalPages, setTotalPages] = useState(1);

  const { data: moviesData, isLoading } = useQuery({
    queryKey: ["getMovies", page],
    queryFn: async () => {
      const { data } = await axios.get(
        `${environment.apiBaseUrl}/trending/movie/day?api_key=${environment.api_Key}&page=${page}`
      );
      setTotalPages(data.total_pages);
      return data.results ?? [];
    },
    staleTime: 4000,
  });

  if (isLoading) {
    return <HomeLoading />;
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-[#222831] to-[#111] text-white relative px-4 lg:px-8 pt-5 overflow-x-hidden">
      {/* Header */}
      <div
        className="mx-auto p-4 border border-gray-700 
        flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4
        rounded-2xl shadow-2xl 
        bg-black/30 backdrop-blur-md 
        mt-4 lg:mx-20 sticky top-4 z-50 animate-fadeIn my-10"
      >
        {/* Logo */}
        <h1 className="text-lg sm:text-2xl font-extrabold text-yellow-400 tracking-wide">
          🎬 Cima Quilty - Movies
        </h1>

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
              className="flex items-center gap-1 px-3 py-2 
              text-xs sm:text-sm font-medium text-white bg-black/40 
              border border-gray-600 rounded-lg shadow-lg
              hover:bg-yellow-500 hover:text-black transition-all"
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              Movies
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
                className="absolute top-full mt-2 left-0 w-40 bg-black/80 text-white 
                rounded-lg shadow-xl border border-gray-700 z-50 animate-fadeIn"
              >
                <ul className="py-2 text-sm">
                  <li>
                    <Link href="/" onClick={() => setShowDropdown(false)}>
                      <span className="block px-4 py-2 hover:bg-yellow-500 hover:text-black rounded-md transition">
                        All
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link href={`/Tv`} onClick={() => setShowDropdown(false)}>
                      <span className="block px-4 py-2 hover:bg-yellow-500 hover:text-black rounded-md transition">
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
            className="px-3 py-2 w-full text-sm text-white 
            bg-black/40 border border-gray-600 rounded-lg 
            focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 
            transition-all placeholder-gray-400"
            placeholder="Search movies, tv shows..."
            required
          />
        </form>
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 lg:gap-6 gap-5 mb-12">
        {moviesData?.map((movie2: any, index: number) => (
          <Link href={`MoviesDetails/${movie2.id}`} key={index}>
            <div className="relative group shadow-lg rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-500">
              <Image
                className="w-full h-full object-cover rounded-xl"
                src={`${environment.baseImgUrl}${movie2.poster_path}`}
                alt={movie2?.title || "Movie Poster"}
                width={240}
                height={360}
              />

              {/* Rating Badge */}
              <div className="absolute top-2 left-2 rounded-md bg-amber-400/90 px-2 py-1 shadow-xl text-xs sm:text-sm">
                {movie2.vote_average.toFixed(1)}
              </div>

              {/* Overlay Info */}
              <div className="absolute inset-x-0 bottom-0 z-10 bg-black/50 backdrop-blur-[2px] p-3 sm:p-4 flex flex-col items-center text-center gap-1.5 lg:opacity-0 lg:scale-95 lg:group-hover:opacity-100 lg:group-hover:scale-100 transition-all duration-500 ease-out rounded-b-xl">
                <p className="text-xs sm:text-sm md:text-base font-medium text-amber-300 truncate max-w-[95%] tracking-wide">
                  {movie2.media_type}
                </p>
                <p className="text-sm sm:text-base md:text-lg font-bold text-white truncate max-w-[95%] leading-snug">
                  {movie2.title}
                </p>
                <p className="text-xs sm:text-sm md:text-base text-indigo-200 truncate max-w-[95%] tracking-wide">
                  {movie2.release_date}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mb-12">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          className="px-3 py-1 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .slice(Math.max(0, page - 2), Math.min(totalPages, page + 1))
          .map((num) => (
            <button
              key={num}
              onClick={() => setPage(num)}
              className={`px-3 py-1 rounded-lg transition-all ${
                page === num
                  ? "bg-yellow-500 text-black font-bold shadow-md"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {num}
            </button>
          ))}

        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
          className="px-3 py-1 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </section>
  );
}
