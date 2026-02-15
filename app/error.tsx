"use client";
import { useEffect } from "react";

function Error({
  error,
  reset,
}: {
  error: Error & { digest: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 px-4">
      <h2 className="text-2xl font-bold text-gray-900">
        Something went wrong!
      </h2>
      <p className="text-gray-600 text-center max-w-md">
        {error.message || "An unexpected error occurred."}
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}

export default Error;
