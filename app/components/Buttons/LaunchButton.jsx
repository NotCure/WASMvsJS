"use client";
import React from "react";

export default function LaunchButton({ onClick, label }) {
  return (
    <button
      onClick={onClick}
      className="px-6 py-4 text-white bg-transparent border-[1.5px] rounded-xl hover:border-[#d9d9d9] hover:bg-[#d9d9d9] hover:text-[#101010] transition-all duration-300 ease-in-out inter font-semibold"
    >
      {label}
    </button>
  );
}
