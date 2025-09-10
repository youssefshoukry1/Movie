"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { environment } from "../../enivronment";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function MovieDetails() {
  const { id } = useParams();

  const { isLoading, data: movieDetails } = useQuery({
    queryKey: ["getDetails", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `${environment.apiBaseUrl}/movie/${id}?api_key=${environment.api_Key}`
      );
      return data; // object مش array
    },
    staleTime: 4000,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <section className="min-h-screen text-white relative px-4 lg:px-8 py-8 bg-[#222831]">
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
        <Image
          className="w-full h-auto object-cover rounded-xl"
          src={`${environment.baseImgUrl}${movieDetails.poster_path}`}
          alt={movieDetails.title}
          width={220}
          height={330}
          priority
          sizes="(max-width: 640px) 150px,
                (max-width: 768px) 180px,
                (max-width: 1024px) 220px,
                220px"
        />
        <div>
          <h1 className="text-3xl font-bold mb-4">{movieDetails.title}</h1>
          <p className="text-gray-300">{movieDetails.overview}</p>
        </div>
      </div>
    </section>
  );
}
