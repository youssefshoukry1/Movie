"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { environment } from "./enivronment";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { ChevronLeft, ChevronRight, ChevronDown, Heart } from "lucide-react";
import Link from "next/link";
import HomeLoading from "./loading";
import { useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import UserContext from "./context/userContext/UserContextProvider";
import SignUp from "./SignUp/page";
import FavoriteContext from "./context/FavoriteAdd/FavoriteContext";



export default function Home() {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const [page, setPage] = useState(currentPage);
  const [totalPages, setTotalPages] = useState(1);
  const [showDropdown, setShowDropdown] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const { Signup } = useContext(UserContext);
  const { postFavourite } = useContext(FavoriteContext);
  const [favMovies, setFavMovies] = useState<number[]>([]);
  

  useEffect(() => {
    const saved = localStorage.getItem("favMovies");
    if (saved) {
      setFavMovies(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favMovies", JSON.stringify(favMovies));
  }, [favMovies]);

  const handleClick = (id: number, type: string) => {
    postFavourite(id, type);
    // لو الفيلم موجود في الليستة، شيله. لو مش موجود ضيفه
    setFavMovies((prev) => {
      if (prev.includes(id)) {
        // لو موجود، شيله
        return prev.filter((movieId) => movieId !== id);
      } else {
        // لو مش موجود، ضيفه
        return [...prev, id];
      }
    });
  };

  const { isLoading: isLoadingAll, data: allData } = useQuery({
    queryKey: ["getAll"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${environment.apiBaseUrl}/trending/all/day?api_key=${environment.api_Key}`
      );
      return data.results ?? [];
    },
    staleTime: 4000,
  });

  const { data: moviesData } = useQuery({
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

  const { data: TvData } = useQuery({
    queryKey: ["getTv", page],
    queryFn: async () => {
      const { data } = await axios.get(
        `${environment.apiBaseUrl}/trending/tv/day?api_key=${environment.api_Key}&page=${page}`
      );
      setTotalPages(data.total_pages);
      return data.results ?? [];
    },
    staleTime: 4000,
  });

  useEffect(() => {
    router.push(`/?page=${page}`);
  }, [page, router]);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    renderMode: "performance",
    slides: { perView: 3, spacing: 10 },
    breakpoints: {
      "(min-width: 640px)": { slides: { perView: 3, spacing: 10 } },
      "(min-width: 1024px)": { slides: { perView: 4, spacing: 15 } },
      "(min-width: 1280px)": { slides: { perView: 5, spacing: 20 } },
    },
  });

  if (isLoadingAll) return <HomeLoading />;

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1b1b1b] to-[#000] text-white relative px-4 lg:px-8 pt-5 overflow-x-hidden">
      {/* Header */}
      <div
        className="mx-auto p-4 border border-gray-700 
        flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4
        rounded-2xl shadow-2xl 
        bg-black/40 backdrop-blur-md 
        mt-4 lg:mx-20 sticky top-4 z-50 animate-fadeIn"
      >
        <h1 className="text-lg sm:text-2xl font-extrabold text-yellow-400 tracking-wide drop-shadow-lg">
          🎬 Cima Quilty
        </h1>

        {/* Search */}
        <form
          className="relative flex items-center gap-2 w-full max-w-md mx-auto sm:mx-0"
          onSubmit={(e) => {
            e.preventDefault();
            if (search.trim()) router.push(`/search/${search}`);
          }}
        >
          {/* Dropdown */}
          <div className="relative">
            <button
              type="button"
              className="flex items-center gap-1 px-3 py-2 
              text-xs sm:text-sm font-medium text-white bg-black/50 
              border border-gray-600 rounded-lg shadow-lg
              hover:bg-yellow-400 hover:text-black transition-all"
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              All
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  showDropdown ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {showDropdown && (
              <div
                className="absolute top-full mt-2 left-0 w-40 bg-black/90 text-white 
                rounded-lg shadow-xl border border-gray-700 z-50 animate-fadeIn"
              >
                <ul className="py-2 text-sm">
                  <li>
                    <Link href="/Movies" onClick={() => setShowDropdown(false)}>
                      <span className="block px-4 py-2 hover:bg-yellow-400 hover:text-black rounded-md transition">
                        Movies
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/Tv" onClick={() => setShowDropdown(false)}>
                      <span className="block px-4 py-2 hover:bg-yellow-400 hover:text-black rounded-md transition">
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
            bg-black/50 border border-gray-600 rounded-lg 
            focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 
            transition-all placeholder-gray-400"
            placeholder="Search movies, tv shows..."
            required
          />
        </form>
      </div>

      {!Signup ? (
        <SignUp />
      ) : (
        <div className="  p-4 flex justify-center items-center ">
          <button
            onClick={() => {
              localStorage.removeItem("session_id");
              window.location.reload();
            }}
            type="button"
            className="text-white cursor-pointer bg-red-400 hover:bg-red-500 focus:ring-4 focus:outline-none focus:bg-red-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2"
          >
            Log out
          </button>
        </div>
      )}

      {/* Recently Added */}
      <div className="text-center my-10">
        <h1 className="inline-block border-2 border-yellow-400 rounded-2xl bg-black/40 px-6 py-2 text-2xl font-bold shadow-lg">
          ⭐ Recently Added
        </h1>
      </div>

      {/* Slider */}
      <div className="relative mb-16">
        <div ref={sliderRef} className="keen-slider overflow-hidden">
          {allData?.map((movie: any, index: number) => (
            <Link href={`/MoviesDetails/${movie.id}`} key={index}>
              <div className="keen-slider__slide flex-shrink-0 group relative rounded-2xl shadow-xl overflow-hidden hover:scale-105 transition-all duration-500">
                <Image
                  className="w-full h-auto object-cover rounded-xl"
                  src={`${environment.baseImgUrl}${movie.poster_path}`}
                  alt={movie.title || "Movie Poster"}
                  width={220}
                  height={330}
                  priority={index < 4}
                />
                <div className="absolute top-2 left-2 rounded-md bg-yellow-400/90 px-2 py-1 shadow-xl text-xs sm:text-sm font-bold text-black">
                  {movie.vote_average?.toFixed(1)}
                </div>
                <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex flex-col items-center text-center gap-1.5 lg:opacity-0 lg:translate-y-4 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-500 rounded-b-xl">
                  <p className="text-xs sm:text-sm md:text-base font-medium text-yellow-300">
                    {movie.media_type}
                  </p>
                  <p className="text-sm sm:text-base md:text-lg font-bold text-white truncate">
                    {movie.title}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-300">
                    {movie.release_date}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Controls */}
        <button
          onClick={() => instanceRef.current?.prev()}
          className="absolute top-1/2 lg:left-0 -left-4 -translate-y-1/2 bg-black/60 hover:bg-yellow-400 hover:text-black text-white p-2 rounded-full shadow-2xl transition"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => instanceRef.current?.next()}
          className="absolute top-1/2 lg:right-0 -right-4 -translate-y-1/2 bg-black/60 hover:bg-yellow-400 hover:text-black text-white p-2 rounded-full shadow-2xl transition"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Movies */}
      <div className="text-center my-10">
        <h1 className="inline-block border-2 border-yellow-400 rounded-2xl bg-black/40 px-6 py-2 text-2xl font-bold shadow-lg">
          🎥 Movies
        </h1>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-12">
        {moviesData?.map((movie2: any, index: number) => (
<div key={index} className="relative">
  <Link href={`/MoviesDetails/${movie2.id}`}>
    <div className="relative group shadow-lg rounded-2xl overflow-hidden hover:scale-105 transition-all duration-500">
      <Image
        className="w-full h-full object-cover rounded-xl"
        src={`${environment.baseImgUrl}${movie2.poster_path}`}
        alt={movie2?.title || "Movie Poster"}
        width={240}
        height={360}
      />

      <div className="absolute top-2 left-2 rounded-md bg-yellow-400/90 px-2 py-1 shadow-xl text-xs sm:text-sm font-bold text-black">
        {movie2.vote_average.toFixed(1)}
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex flex-col items-center text-center gap-1.5 lg:opacity-0 lg:translate-y-4 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-500 rounded-b-xl">
        <p className="text-xs sm:text-sm font-medium text-yellow-300">{movie2.media_type}</p>
        <p className="text-base font-bold text-white truncate">{movie2.title}</p>
        <p className="text-xs text-gray-300">{movie2.release_date}</p>
      </div>
    </div>
  </Link>

  {/* الزرار هنا برّه الـ Link ومفيش ضغط بيفتح الديتيلز */}
  <button
    onClick={(e) => {
      e.stopPropagation(); // يمنع ال event يعدي للـ Link
      handleClick(movie2.id, "movie");
    }}
    className={`absolute top-2 -right-1 px-3 py-1 rounded-full cursor-pointer hover:scale-120 transition-all 
      ${favMovies.includes(movie2.id) ? "text-red-500" : "text-white/70"}`}
  >
    <i className="fa-solid fa-heart text-2xl"></i>
  </button>
</div>

        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mb-16">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          className="px-4 py-2 rounded-full bg-black/60 text-gray-300 hover:bg-yellow-400 hover:text-black transition disabled:opacity-40"
        ></button>
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .slice(Math.max(0, page - 2), Math.min(totalPages, page + 1))
          .map((num) => (
            <button
              key={num}
              onClick={() => setPage(num)}
              className={`px-4 py-2 rounded-full transition ${
                page === num
                  ? "bg-yellow-400 text-black font-bold shadow-lg"
                  : "bg-black/60 text-gray-300 hover:bg-yellow-400 hover:text-black"
              }`}
            >
              {num}
            </button>
          ))}
        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
          className="px-4 py-2 rounded-full bg-black/60 text-gray-300 hover:bg-yellow-400 hover:text-black transition disabled:opacity-40"
        >
          Next
        </button>
      </div>

      {/* TV Shows */}
      <div className="text-center my-10">
        <h1 className="inline-block border-2 border-yellow-400 rounded-2xl bg-black/40 px-6 py-2 text-2xl font-bold shadow-lg">
          📺 TV Shows
        </h1>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-12">
        {TvData?.map((TV: any, index: number) => (
          <Link href={`/MoviesDetails/${TV.id}`} key={index}>
            <div className="relative group shadow-lg rounded-2xl overflow-hidden hover:scale-105 transition-all duration-500">
              <Image
                className="w-full h-full object-cover rounded-xl"
                src={`${environment.baseImgUrl}${TV.poster_path}`}
                alt={TV?.title || "Movie Poster"}
                width={240}
                height={360}
              />
              <div className="absolute top-2 left-2 rounded-md bg-yellow-400/90 px-2 py-1 shadow-xl text-xs sm:text-sm font-bold text-black">
                {TV.vote_average.toFixed(1)}
              </div>
              <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex flex-col items-center text-center gap-1.5 lg:opacity-0 lg:translate-y-4 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-500 rounded-b-xl">
                <p className="text-xs sm:text-sm font-medium text-yellow-300">
                  {TV.media_type}
                </p>
                <p className="text-base font-bold text-white truncate">
                  {TV.title}
                </p>
                <p className="text-xs text-gray-300">{TV.release_date}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mb-16">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          className="px-4 py-2 rounded-full bg-black/60 text-gray-300 hover:bg-yellow-400 hover:text-black transition disabled:opacity-40"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .slice(Math.max(0, page - 2), Math.min(totalPages, page + 1))
          .map((num) => (
            <button
              key={num}
              onClick={() => setPage(num)}
              className={`px-4 py-2 rounded-full transition ${
                page === num
                  ? "bg-yellow-400 text-black font-bold shadow-lg"
                  : "bg-black/60 text-gray-300 hover:bg-yellow-400 hover:text-black"
              }`}
            >
              {num}
            </button>
          ))}
        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
          className="px-4 py-2 rounded-full bg-black/60 text-gray-300 hover:bg-yellow-400 hover:text-black transition disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </section>
  );
}
