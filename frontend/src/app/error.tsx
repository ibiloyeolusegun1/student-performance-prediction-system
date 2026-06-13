"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white shadow-xl rounded-xl p-10 text-center max-w-xl">
        <div className="text-red-500 text-7xl font-bold">
          ⚠
        </div>

        <h1 className="text-amber-950 text-3xl font-bold mt-4">
          Application Error
        </h1>

        <p className="text-gray-500 mt-3">
          The Student Performance Prediction System
          encountered an unexpected problem.
        </p>

        <button
          onClick={() => reset()}
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
}