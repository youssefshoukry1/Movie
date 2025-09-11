import React from "react";

export default function MovieDetailsLoading() {
  return (
    <div className="relative min-h-screen bg-[#1a1d24] px-4 lg:px-12 py-12">
      {/* Blur Layer */}
      <div className="absolute inset-0 bg-gray-800/50 backdrop-blur-lg" />

      <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-10 animate-pulse">
        {/* Poster */}
        <div className="w-[200px] sm:w-[220px] lg:w-[270px] h-[400px] bg-gray-700 rounded-xl mx-auto" />

        {/* Info */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="h-10 bg-gray-700 rounded-md w-3/4" />
          <div className="h-6 bg-gray-600 rounded-md w-1/2" />

          <div className="flex flex-col gap-2 mt-4">
            <div className="h-4 bg-gray-700 rounded-md w-full" />
            <div className="h-4 bg-gray-700 rounded-md w-5/6" />
            <div className="h-4 bg-gray-700 rounded-md w-4/6" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-5 bg-gray-700 rounded-md w-3/4" />
            ))}
          </div>

          <div className="flex flex-wrap gap-4 mt-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-10 w-28 bg-gray-700 rounded-xl" />
            ))}
          </div>

          <div className="flex gap-4 mt-6">
            <div className="h-10 w-32 bg-gray-700 rounded-xl" />
            <div className="h-10 w-28 bg-gray-700 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
