"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { environment } from "./enivronment";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import HomeLoading from "./loading";
import { useEffect, useState } from "react";
import { useRouter,useSearchParams } from "next/navigation";

export default function Home() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();
   const currentPage = Number(useSearchParams().get('page')) || 1;
  const [ page, setPage ] = useState(currentPage);

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
    queryKey: ["getMoveis", page],
    queryFn: async () => {
      const { data } = await axios.get(
        `${environment.apiBaseUrl}/trending/movie/day?api_key=${environment.api_Key}&page=${page}`
      );
      return data.results ?? [];
    },
        staleTime: 4000,
  });

    // ✅ لو page اتغير في الـ state، حدّث الـ URL
  useEffect(() => {
    router.push(`/?page=${page}`);
  }, [page, router]);

  // Slider
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    renderMode: "performance",
    slides: { perView: 2, spacing: 10 }, // صورة واحدة على الموبايل
    breakpoints: {
      "(min-width: 640px)": { slides: { perView: 3, spacing: 10 } }, // sm
      "(min-width: 1024px)": { slides: { perView: 4, spacing: 15 } }, // lg
      "(min-width: 1280px)": { slides: { perView: 4, spacing: 20 } }, // xl
    },
  });

  if (isLoadingAll) return <HomeLoading />;

  return (
    <section className="bg-[#222831] min-h-screen text-white relative px-4 lg:px-8 pt-5">
      <div
        className=" mx-auto  p-8 border-2 border-yellow-500 
              flex justify-center items-center rounded-4xl shadow-2xl  "
      >
        <>
          <form
            className=" relative rounded-3x flex justify-around items-center w-full "
            onSubmit={(e) => {
              e.preventDefault();
              if (search.trim()) {
                router.push(`/search/${search}`);
              }
            }}
          >
            <div className="flex relative gap-4 ">
              <button
                id="dropdown-button"
                type="button"
                className=" outline-none shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200  focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                onClick={() => setShowDropdown((prev) => !prev)}
              >
                All
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
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
                  id="dropdown"
                  className="z-20 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 absolute left-0 top-12"
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdown-button"
                  >
                    <li>
                      <Link href={`/category-table/women`}>
                        {" "}
                        <button
                          type="button"
                          className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Movies
                        </button>
                      </Link>
                    </li>
                    <li>
                      <Link href={`/electronic/electronic`}>
                        {" "}
                        <button
                          type="button"
                          className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Tv
                        </button>
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
              <div className="relative w-full ">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="search"
                  id="search-dropdown"
                  className=" outline-none block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 text-center"
                  placeholder="Search here..."
                  required
                />
              </div>
            </div>
            <Image
              src="/video-camera.webp"
              width={50}
              height={50}
              alt="Logo"
              className="me-4 hidden sm:inline lg:hover:-scale-x-95 transition-transform duration-300 cursor-pointer"
              priority
              sizes="(max-width: 768px) 20px, (max-width: 1200px) 60px, 70px"
            />
            <h1 className=" absolute ">Cima Quilty</h1>
          </form>
        </>
      </div>

      <h1 className="mb-4 text-xl flex justify-center items-center pt-10">
        Recently Added
      </h1>

      {/* Slider */}
      <div className="relative mb-12 ">
        <div ref={sliderRef} className="keen-slider overflow-hidden">
          {allData?.map((movie: any, index: number) => (
              <Link href={`Movies/${movie.id}`} key={index}>
                <div
                  
                  className="keen-slider__slide flex-shrink-0 w-[150px] sm:w-[180px] lg:w-[220px] group relative rounded-2xl shadow-lg overflow-hidden"
                >
                  <Image
                    className="w-full h-auto object-cover rounded-xl"
                    src={`${environment.baseImgUrl}${movie.poster_path}`}
                    alt={movie.title || "Movie Poster"}
                    width={220}
                    height={330}
                    priority={index < 4}
                    sizes="(max-width: 640px) 150px,
                (max-width: 768px) 180px,
                (max-width: 1024px) 220px,
                220px"
                  />

                  <div className="absolute top-2 left-2 rounded-md bg-amber-400/90 px-2 py-1 shadow-xl text-xs sm:text-sm">
                    {movie.vote_average?.toFixed(1)}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 z-10 bg-black/50 backdrop-blur-[2px] p-3 sm:p-4 flex flex-col items-center text-center gap-1.5 lg:opacity-0 lg:scale-95 lg:group-hover:opacity-100 lg:group-hover:scale-100 transition-all duration-500 ease-out rounded-b-xl">
                    <p className="text-xs sm:text-sm md:text-base font-medium text-amber-300 truncate max-w-[95%] tracking-wide">
                      {movie.media_type}
                    </p>
                    <p className="text-sm sm:text-base md:text-lg font-bold text-white truncate max-w-[95%] leading-snug">
                      {movie.title}
                    </p>
                    <p className="text-xs sm:text-sm md:text-base text-indigo-200 truncate max-w-[95%] tracking-wide">
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
          className="absolute top-1/2 lg:left-0 -left-4 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full shadow-2xl"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => instanceRef.current?.next()}
          className="absolute top-1/2 lg:right-0 -right-4 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full shadow-2xl"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-8 gap-5 mb-12">
        {moviesData?.map((movie2: any, index: number) => (
          
            <Link href={`Movies/${movie2.id}`} key={index}>
              <div
                
                className="relative group shadow-lg rounded-2xl overflow-hidden"
              >
                <Image
                  className="w-full h-full object-cover rounded-xl"
                  src={`${environment.baseImgUrl}${movie2.poster_path}`}
                  alt={movie2?.title || "Movie Poster"}
                  width={240}
                  height={360}
                  sizes="(max-width: 640px) 160px, 
         (max-width: 1024px) 200px, 
         240px"
                />

                <div className="absolute top-2 left-2 rounded-md bg-amber-400/90 px-2 py-1 shadow-xl text-xs sm:text-sm">
                  {movie2.vote_average.toFixed(1)}
                </div>
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
      <div className=" flex justify-center gap-2 mb-12">
        {[1,2,3,4,5,6,7,8,9,10].map((num) => (
          <button
            key={num}
            onClick={() => { setPage(num); }}
            className={`px-3 py-1 rounded-lg ${
              page === num
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {num}
          </button>
        ))}
      </div>
    </section>
  );
}
