"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import { environment } from "../../enivronment";
import Image from "next/image";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import MovieDetailsLoading from "@/app/loadding";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function MovieDetails() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const { id } = useParams();


    const { isLoading, data: movieDetails } = useQuery({
    queryKey: ["getDetails", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `${environment.apiBaseUrl}/movie/${id}?api_key=${environment.api_Key}`
      );
      return data;
    },
    staleTime: 4000,
  });

  if (isLoading) return <MovieDetailsLoading />;

  return (
    <section className="relative min-h-screen text-white overflow-hidden ">
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
                    <Link href="/Movies" onClick={() => setShowDropdown(false)}>
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

      {/* Backdrop */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src={`${environment.baseImgUrl}${movieDetails?.backdrop_path}`}
          alt={movieDetails.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-[#1a1d24]" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 lg:px-12 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Poster */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative shadow-lg rounded-2xl overflow-hidden w-[200px] sm:w-[220px] lg:w-[270px] mx-auto"
        >
          <Image
            className="w-full h-full object-cover rounded-xl"
            src={`${environment.baseImgUrl}${movieDetails?.poster_path}`}
            alt={movieDetails?.title}
            width={270}
            height={400}
            sizes="(max-width: 640px) 200px, 
                    (max-width: 1024px) 220px, 
                    270px"
          />
          <div className="absolute top-2 left-2 rounded-md bg-amber-400/90 px-2 py-1 shadow-xl text-xs sm:text-sm font-bold text-black">
            {movieDetails?.vote_average?.toFixed(1)}
          </div>
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="lg:col-span-2 flex flex-col gap-6"
        >
          {/* Title + Tagline */}
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-amber-400 drop-shadow-lg">
              {movieDetails?.title}
            </h1>
            <p className="italic text-indigo-300 mt-2 text-lg">
              {movieDetails?.tagline}
            </p>
          </div>

          {/* Overview */}
          <div>
            <h2 className="text-xl font-semibold text-amber-300">Overview</h2>
            <p className="text-base text-gray-200 mt-2 leading-relaxed max-w-2xl">
              {movieDetails?.overview}
            </p>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm md:text-base">
            <div>
              <p className="font-semibold text-amber-300">Release Date</p>
              <p>{movieDetails?.release_date}</p>
            </div>
            <div>
              <p className="font-semibold text-amber-300">Runtime</p>
              <p>
                {Math.floor(movieDetails?.runtime / 60)}h{" "}
                {movieDetails?.runtime % 60}m
              </p>
            </div>
            <div>
              <p className="font-semibold text-amber-300">Genres</p>
              <p>{movieDetails?.genres.map((g: any) => g.name).join(", ")}</p>
            </div>
            <div>
              <p className="font-semibold text-amber-300">Budget</p>
              <p>${movieDetails?.budget.toLocaleString()}</p>
            </div>
            <div>
              <p className="font-semibold text-amber-300">Revenue</p>
              <p>${movieDetails?.revenue.toLocaleString()}</p>
            </div>
            <div>
              <p className="font-semibold text-amber-300">Status</p>
              <p>{movieDetails?.status}</p>
            </div>
          </div>

          {/* Companies */}
          <div>
            <h2 className="text-lg font-semibold text-amber-300 mb-2">
              Production
            </h2>
            <motion.div
              className="flex flex-wrap gap-4"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.2,
                  },
                },
              }}
            >
              {movieDetails.production_companies?.map((company: any) => (
                <motion.div
                  key={company.id}
                  className="flex items-center gap-2 bg-black/50 px-3 py-2 rounded-xl shadow-md backdrop-blur-sm"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 },
                  }}
                >
                  {company.logo_path && (
                    <Image
                      src={`${environment.baseImgUrl}${company?.logo_path}`}
                      alt={company.name}
                      width={40}
                      height={20}
                      className="object-contain max-h-6"
                    />
                  )}
                  <span className="text-sm">{company?.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Buttons */}
          <motion.div
            className="flex gap-4 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >

            {movieDetails.homepage && (
              <a
                href={movieDetails.homepage}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-amber-400 text-black font-semibold hover:bg-amber-500 transition"
              >
                Official Website
              </a>
            )}
            {movieDetails.imdb_id && (
              <a
                href={`https://www.imdb.com/title/${movieDetails.imdb_id}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-indigo-500 text-white font-semibold hover:bg-indigo-600 transition"
              >
                IMDb Page
              </a>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
