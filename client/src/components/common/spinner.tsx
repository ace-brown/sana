import React from "react";

export default function Spinner() {
  return (
    <div className="flex justify-center items-center">
      <svg
        className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-gray-600 border-solid rounded-full"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="none"
          d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12z"
        />
      </svg>
    </div>
  );
}
