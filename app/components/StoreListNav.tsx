"use client";

import { useState } from "react";
import { stores } from "../ads/stores";

const StoreListNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleJumpClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-1/2 right-2 transform -translate-y-1/2 p-4">
      <button
        className="block md:hidden p-2 bg-gray-200 rounded text-gray-800"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        Jump to Store
      </button>

      <ul
        className={`mt-8 md:mt-0 md:block ${isMenuOpen ? "hidden" : "block"}`}
      >
        {Object.keys(stores).map((zone) => {
          return (
            <li key={zone} className="mb-2">
              <button
                className="text-blue-500"
                onClick={() => handleJumpClick(zone)}
              >
                {zone}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default StoreListNav;
