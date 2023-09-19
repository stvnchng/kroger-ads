import Link from "next/link";
import { stores } from "../stores";
import { capitalize } from "../utils";

export default function StoreList({ zone }: { zone: string }) {
  return (
    <ul className="flex flex-wrap gap-4 my-3 mx-5 justify-center">
      {Object.keys(stores)
        .filter((z) => z !== zone)
        .map((z) => (
          <li key={z} className="mb-2">
            <Link
              href={`/stores/${z}`}
              as={`/stores/${z}`}
              className="text-blue-500 underline hover:text-blue-700 transition"
              target="_blank"
            >
              {capitalize(z)}
            </Link>
          </li>
        ))}
    </ul>
  );
}
