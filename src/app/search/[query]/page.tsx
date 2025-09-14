"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { environment } from "../../enivronment";
import HomeLoading from "@/app/loading";

export default function SearchPage() {
  const { query } = useParams();

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
      <h1 className="text-2xl font-bold mb-6">Results for: {query}</h1>

      {data?.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {data.map((item: any) => (
            <Link key={item.id} href={`/Movies/${item.id}`}>
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
