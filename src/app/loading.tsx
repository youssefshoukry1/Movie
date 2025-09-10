"use client";
import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#1a1d24] px-4 lg:px-12 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10 animate-pulse">
      {/* Poster Skeleton */}
      <div className="w-[200px] sm:w-[220px] lg:w-[270px] h-[400px] bg-gray-700 rounded-xl mx-auto" />

      {/* Info Skeleton */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        {/* Title */}
        <div className="h-10 bg-gray-700 rounded-md w-3/4" />

        {/* Tagline */}
        <div className="h-6 bg-gray-600 rounded-md w-1/2" />

        {/* Overview */}
        <div className="flex flex-col gap-2 mt-4">
          <div className="h-4 bg-gray-700 rounded-md w-full" />
          <div className="h-4 bg-gray-700 rounded-md w-5/6" />
          <div className="h-4 bg-gray-700 rounded-md w-4/6" />
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-5 bg-gray-700 rounded-md w-3/4" />
          ))}
        </div>

        {/* Production Companies */}
        <div className="flex flex-wrap gap-4 mt-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-10 w-28 bg-gray-700 rounded-xl"
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <div className="h-10 w-32 bg-gray-700 rounded-xl" />
          <div className="h-10 w-28 bg-gray-700 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
