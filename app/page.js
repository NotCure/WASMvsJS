"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StartMenu from "./components/StartMenu";
import SortingMenu from "./components/SortingMenu";

export default function Home() {
  const [showStartMenu, setShowStartMenu] = useState(true);
  const handleLaunch = () => {
    setShowStartMenu(false);
  };

  const handleBack = () => {
    setShowStartMenu(true);
  };
  return (
    <main className="min-h-screen">
      <AnimatePresence mode="wait">
        {showStartMenu ? (
          <motion.div
            key="startmenu"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <StartMenu onLaunch={handleLaunch} />
          </motion.div>
        ) : (
          <motion.div
            key="sortingmenu"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <SortingMenu onBack={handleBack} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
