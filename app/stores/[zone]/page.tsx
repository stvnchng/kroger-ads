"use client";

import { useEffect, useState } from "react";
import PDFViewer from "../../components/PDFViewer";
import { stores } from "../stores";
import { capitalize } from "../../utils";
import Link from "next/link";

type Ad = {
  valid_from: string;
  valid_to: string;
  pdf_url: string;
};

const StorePage = ({ params }: { params: { zone: string } }) => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [selectedAd, setSelectedAd] = useState<Ad>();

  useEffect(() => {
    async function fetchPdfUrl() {
      const link = stores[params.zone]?.url;
      try {
        const ads: Ad[] = await fetch(link).then((resp) => resp.json());
        console.log(ads);

        setAds(ads);
        setSelectedAd(ads[0]);
      } catch (error) {
        console.error("Error fetching PDF URL:", error);
      }
    }

    fetchPdfUrl();
  }, []);

  const formatDate = (d: string) => {
    const YYYYMMdd = d.split("T")[0].split("-");
    const month = YYYYMMdd[1];
    const day = YYYYMMdd[2];
    return `${month}/${day}`;
  };

  const path = stores[params.zone]?.path;

  return (
    <div>
      <div className="flex flex-col items-center flex-wrap w-full justify-center">
        <h1 className="text-2xl my-2">
          {capitalize(params.zone)}{" "}
          {selectedAd
            ? formatDate(selectedAd.valid_from) +
              "-" +
              formatDate(selectedAd.valid_to)
            : ""}{" "}
          <a
            href={`https://www.kroger.com/stores/grocery/${path}`}
            className="text-blue-500 underline hover:text-blue-700 transition font-semibold"
            target="_blank"
          >
            Load Coupons
          </a>
        </h1>
        <ul className="flex flex-wrap gap-4 pl-6 my-2 ml-3">
          {Object.keys(stores)
            .filter((zone) => zone !== params.zone)
            .map((zone) => (
              <li key={zone} className="mb-2">
                <Link
                  href={`/stores/${zone}`}
                  as={`/stores/${zone}`}
                  className="text-blue-500 underline hover:text-blue-700 transition"
                  target="_blank"
                >
                  {capitalize(zone)}
                </Link>
              </li>
            ))}
        </ul>
      </div>

      {selectedAd ? (
        <PDFViewer
          pdfUrl={selectedAd.pdf_url}
          renderFirstPage={["flowood", "dallas"].includes(params.zone)}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default StorePage;
