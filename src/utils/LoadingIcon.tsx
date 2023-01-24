import React from "react";

const LoadingIcon = () => {
  return (
    <svg
      className="animate-spin h-5 w-5 mr-3"
      stroke="#ffffff"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        fill="none"
        r="10"
        strokeDasharray="42"
        strokeLinecap="round"
      ></circle>
      <circle
        cx="12"
        cy="12"
        fill="none"
        opacity="0.25"
        r="10"
        strokeLinecap="round"
      ></circle>
    </svg>
  );
};

export default LoadingIcon;
