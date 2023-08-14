"use client";

import Link from "next/link";
import { stores } from "./stores";
import { capitalize } from "../utils";

export default function Page() {
  const openAllLinks = () => {
    Object.keys(stores).forEach((zone) => {
      window.open(`/stores/${zone}`, "_blank");
    });
  };

  return (
    <ul className="pl-6 mt-6 ml-4">
      {/* <li className="mb-6">
        <button
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-md"
          onClick={openAllLinks}
        >
          Open All Links
        </button>
      </li> */}
      {Object.keys(stores).map((zone) => (
        <li key={zone} className="mb-6">
          <Link
            href={`/stores/${zone}`}
            as={`/stores/${zone}`}
            className="text-blue-500 underline hover:text-blue-700 transition"
            target="_blank"
          >
            Weekly Ad for {capitalize(zone)}
          </Link>
        </li>
      ))}
    </ul>
  );
}
