"use client";
import React from "react";
import BackButton from "./Buttons/BackButton";
import SortButton from "@/components/Buttons/SortButton";
import useSorting from "@/utils/useSorting";

export default function SortingMenu({ onBack }) {
  const {
    option,
    setOption,
    inputNumbers,
    setInputNumbers,
    fullText,
    setFullText,
    timeTaken,
    average,
    handleSort,
    output,
    setOutput,
  } = useSorting();

  const handleSelectChange = (e) => {
    setOption(e.target.value);
  };

  const handleInputChange = (e) => {
    setFullText(""); // cancel file preview mode
    setInputNumbers(e.target.value);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const textContent = event.target.result.trim();
      setFullText(textContent);
      setInputNumbers(
        textContent.slice(0, 200) + (textContent.length > 200 ? "..." : "")
      );
    };
    reader.readAsText(file);
  };

  const handleGenerateRandom = () => {
    const count = 20000000;
    const numbers = Array.from({ length: count }, () =>
      Math.floor(Math.random() * 20000000)
    );
    const randomStr = numbers.join(", ");
    setFullText(randomStr);
    setInputNumbers(
      randomStr.slice(0, 200) + (randomStr.length > 200 ? "..." : "")
    );
  };

  return (
    <>
      <section className="flex flex-col items-center lg:p-24 lg:pb-2  pb-8 px-4 bg-[#101010] ">
        <header className="mb-12">
          <h1 className="text-6xl font-extrabold grotesk bg-gradient-to-r from-[#fa9047] via-[#c162dc] to-[#4a2386]  bg-clip-text text-transparent">
            Sorting Algorithms
          </h1>
        </header>
        <nav className="flex flex-row gap-10">
          <div>
            <form className="max-w-sm mx-auto">
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-[#d9d9d9]"
              >
                Select your choice
              </label>
              <select
                id="countries"
                value={option}
                onChange={handleSelectChange}
                className="bg-gray-50 border border-gray-300 text-[#101010] text-sm rounded-lg block w-full p-2.5"
              >
                <option value="Choose Tech" disabled>
                  Choose Tech
                </option>
                <option value="Assembly">Assembly</option>
                <option value="Javascript">Javascript</option>
              </select>
            </form>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="mb-2 lg:text-xl text-lg font-extrabold inter text-[#d9d9d9]">
              Time Taken:
            </p>
            <p className="mb-2 lg:text-xl text-lg font-extrabold grotesk text-[#d9d9d9]">
              {timeTaken.toFixed(4)} ms
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="mb-2 lg:text-xl text-lg font-extrabold inter text-[#d9d9d9]">
              Average:
            </p>
            <p className="mb-2 lg:text-xl text-lg font-extrabold grotesk text-[#d9d9d9]">
              {average.toFixed(4)}
            </p>
          </div>
        </nav>
      </section>

      <section className="flex flex-col items-center bg-[#101010]">
        <div className="mb-6 w-full max-w-2xl lg:px-0 px-4">
          <label
            htmlFor="numbers-input"
            className="block mb-2 text-sm font-medium text-[#d9d9d9]"
          >
            Put your numbers here
          </label>
          <div className="flex">
            <input
              type="text"
              id="numbers-input"
              placeholder="Enter numbers or use upload..."
              value={inputNumbers}
              onChange={handleInputChange}
              className="flex-grow p-3 text-gray-900 border border-gray-300 rounded-l-lg bg-gray-50 text-base"
            />
            <input
              type="file"
              id="hidden-file-upload"
              accept=".txt"
              up="true"
              onChange={handleFileUpload}
              className="hidden"
            />
            <label
              htmlFor="hidden-file-upload"
              className="cursor-pointer px-4 py-3 bg-gradient-to-r from-[#fa9047] via-[#c162dc] to-[#4a2386] bg-[length:200%_100%] bg-left hover:bg-right text-white text-lg font-medium rounded-r-lg transition-all duration-500 ease-in-out"
            >
              Upload As Text
            </label>
          </div>
          <label
            htmlFor="message"
            className="block mt-2 mb-2 text-sm font-medium text-[#d9d9d9]"
          >
            Output
          </label>
          <textarea
            id="message"
            readOnly
            value={output}
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Sorting Output will be shown here..."
          ></textarea>
        </div>

        <div className="flex flex-row lg:gap-10 space-x-3 lg:px-0 px-4">
          <BackButton onClick={onBack} label="<- Back" />
          <SortButton onClick={handleSort} label="Sort the list" />
          <SortButton
            onClick={handleGenerateRandom}
            label="Generate List (10 Million Random Numbers)"
          />
        </div>
      </section>
    </>
  );
}
