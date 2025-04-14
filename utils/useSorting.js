import { useState } from "react";

export default function useSorting() {
  // UI state
  const [option, setOption] = useState("Choose Tech");
  const [inputNumbers, setInputNumbers] = useState("");
  const [fullText, setFullText] = useState("");
  const [output, setOutput] = useState("");

  // Performance state
  const [timeTaken, setTimeTaken] = useState(0);
  const [average, setAverage] = useState(0);

  // Handler for triggering the sort
  const handleSort = () => {
    // Ensure that a tech option is selected.
    if (option === "Choose Tech") {
      alert("Please select Assembly or Javascript.");
      return;
    }

    // Ensure that the input string is not empty.
    if (!inputNumbers.trim()) {
      alert("Please enter a valid list of numbers separated by commas.");
      return;
    }

    // Create a new worker to handle sorting.
    const worker = new Worker("/sortWorker.js");

    // Message handler for when the worker posts a response.
    worker.onmessage = (e) => {
      const { duration, average, sorted, error } = e.data;

      if (error) {
        alert("Worker Error: " + error);
      } else {
        setTimeTaken(duration);
        setAverage(average);

        let result = "";

        // Check the type of sorted data and generate a string result.
        if (sorted) {
          if (typeof sorted === "string") {
            result = sorted;
          } else if (Array.isArray(sorted) || sorted instanceof Int32Array) {
            result = Array.from(sorted).join(", ");
          }
        }

        if (result) {
          if (result.length > 1000) {
            setOutput(result.slice(0, 1000) + " ..."); // Append ellipsis if needed.
          } else {
            setOutput(result);
          }
        } else {
          setOutput("");
        }
      }

      worker.terminate(); // Clean up the worker once processing is done.
    };

    // Error handler for the worker.
    worker.onerror = (error) => {
      alert(error.message);
      worker.terminate();
    };

    // Post the necessary data to the worker.
    worker.postMessage({
      tech: option,
      inputNumbers: fullText || inputNumbers,
    });
  };

  return {
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
  };
}
