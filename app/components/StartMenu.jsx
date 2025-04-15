"use client";
import React from "react";
import LaunchButton from "./Buttons/LaunchButton";
import { useRouter } from "next/navigation";
import GithubButton from "./Buttons/GithubButton";
export default function StartMenu({ onLaunch }) {
  return (
    <section className="flex flex-col items-center lg:p-24 p-8 bg-[#101010]">
      <header className="mb-12">
        <h1 className="lg:text-6xl text-4xl font-extrabold grotesk bg-gradient-to-r from-[#fa9047] via-[#c162dc] to-[#4a2386]  bg-clip-text text-transparent">
          Libyan Programmers Challenge
        </h1>
      </header>

      <section className="w-full max-w-3xl mb-12 inter">
        <p className="text-xl text-[#d9d9d9]">
          This is a simple project to demonstrate the use of{" "}
          <span className="font-bold underline decoration-blue-400 underline-offset-4">
            WebAssembly
          </span>{" "}
          and{" "}
          <span className="font-bold underline decoration-blue-400 underline-offset-4">
            Assembly language
          </span>{" "}
          for fast calculations. The project is built using{" "}
          <span className="font-bold underline decoration-blue-400 underline-offset-4">
            Next.js
          </span>{" "}
          and{" "}
          <span className="font-bold underline decoration-blue-400 underline-offset-4">
            Tailwind CSS
          </span>
          .
        </p>
      </section>

      <h1 className="mb-2 text-3xl font-extrabold grotesk text-[#d9d9d9]">
        Technologies
      </h1>
      <section className="w-full max-w-3xl inter">
        <ul className="inter text-xl text-[#d9d9d9] space-y-2">
          <li>
            <p className="mb-2">
              1. &nbsp;
              <a
                href="https://ar.wikipedia.org/wiki/%D9%88%D9%8A%D8%A8_%D8%A3%D8%B3%D9%85%D8%A8%D9%84%D9%8A"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-400 hover:text-blue-500 transition"
              >
                Assembly language
              </a>
              &nbsp; for fast calculations instead of JavaScript.
            </p>
          </li>
          <li>
            2. &nbsp;
            <a
              href="https://nextjs.org/"
              className="underline text-blue-400 hover:text-blue-500 transition"
            >
              Tailwind & Next.js
            </a>
            &nbsp; for frontend.
          </li>
          <li>
            3. &nbsp;
            <a
              href="https://example.com" /* Replace with the appropriate URL if needed */
              className="underline text-blue-400 hover:text-blue-500 transition"
            >
              C language
            </a>
            &nbsp; to compile to WebAssembly.
          </li>
        </ul>
      </section>

      <div className="mt-12 space-x-3 flex ">
        <LaunchButton onClick={onLaunch} label="Launch Challenge Solver" />
        <GithubButton
          onClick={() => {
            window.location.href = "https://github.com/NotCure/WASMvsJS";
          }}
          label="Github"
        />
      </div>
    </section>
  );
}
