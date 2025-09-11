import React from "react";

export default function HomeLoading() {
  return (
    <div className="min-h-screen bg-[#1a1d24] px-4 lg:px-12 py-12">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-6 animate-pulse">
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="w-full h-[260px] bg-gray-700 rounded-xl"
          />
        ))}
      </div>
    </div>
  );
}
