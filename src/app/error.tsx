"use client";

import Link from "next/link";

// Define the types for the props
interface GlobalErrorProps {
  error: Error; // or you can define a more specific error type if needed
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-6 space-y-6">
      <h1 className="text-5xl font-extrabold text-gray-900">
        Oops! Something went wrong
      </h1>
      <p className="text-lg text-gray-600">
        {error.message ||
          "An unexpected error has occurred. Please try again later."}
      </p>
      <div className="flex space-x-4">
        <button
          className="px-6 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
          onClick={() => reset()}
        >
          Try Again
        </button>
        <Link href="/sh" passHref>
          <button className="px-6 py-2 rounded-md text-blue-600">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
