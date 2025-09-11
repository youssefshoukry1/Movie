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

export default function Home() {
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
    queryKey: ["getMoveis"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${environment.apiBaseUrl}/trending/movie/day?api_key=${environment.api_Key}`
      );
      return data.results ?? [];
    },
    staleTime: 4000,
  });

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

  if (isLoadingAll) return <HomeLoading/>;

  return (
    <section className="bg-[#222831] min-h-screen text-white relative px-4 lg:px-8">
      <h1 className="mb-4 text-xl flex justify-center items-center">
        Recently Added
      </h1>

      {/* Slider */}
      <div className="relative mb-12 ">
        <div ref={sliderRef} className="keen-slider overflow-hidden">
          {allData?.map((movie: any, index: number) => (
              <>
              <Link href={`Movies/${movie.id}`}>
            <div
              key={index}
              className="keen-slider__slide flex-shrink-0 w-[150px] sm:w-[180px] lg:w-[220px] group relative rounded-2xl shadow-lg overflow-hidden"
            >
              
                <Image
                  className="w-full h-auto object-cover rounded-xl"
                  src={`${environment.baseImgUrl}${movie.poster_path}`}
                  alt={movie.title}
                  width={220}
                  height={330}
                  priority={index < 4}
                  sizes="(max-width: 640px) 150px,
                (max-width: 768px) 180px,
                (max-width: 1024px) 220px,
                220px"
                />
              
              <div className="absolute top-2 left-2 rounded-md bg-amber-400/90 px-2 py-1 shadow-xl text-xs sm:text-sm">
                {movie.vote_average.toFixed(1)}
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
            
              </>
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
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
        {moviesData?.map((movie2: any, index: number) => (
          <>
            <Link href={`Movies/${movie2.id}`}>
          <div
            key={index}
            className="relative group shadow-lg rounded-2xl overflow-hidden"
          >
           <Image
  className="w-full h-full object-cover rounded-xl"
  src={`${environment.baseImgUrl}${movie2.poster_path}`}
  alt={movie2.title}
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
          
          </>
        ))}
      </div>
    </section>
  );
}
