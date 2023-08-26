"use client";

import { stores } from "../ads/stores";

const StoreListNav = () => {
  const handleJumpClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 p-2 md:hidden z-40 bg-gray-200 rounded text-gray-800">
        <div className="flex justify-center gap-2">
          Jump to Store
          <select
            className="ml-1"
            onChange={(e) => handleJumpClick(e.target.value)}
          >
            {Object.keys(stores).map((zone) => (
              <option key={zone} value={zone}>
                {zone}
              </option>
            ))}
          </select>
        </div>
      </div>

      <nav className="fixed top-1/2 right-2 transform -translate-y-1/2 p-4">
        <ul className={`md:mt-0 md:block hidden`}>
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
    </>
  );
};

export default StoreListNav;
