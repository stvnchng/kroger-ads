"use client";

import Link from "next/link";
import { capitalize, formatDate } from "../utils";
import PDFViewer from "./PDFViewer";
import { useEffect, useState } from "react";
import { stores } from "../ads/stores";

export type Ad = {
  flyer_type: string;
  valid_from: string;
  valid_to: string;
  pdf_url: string;
};

interface StoreAdViewProps {
  zone: string;
  showOldAds?: boolean;
}

export const StoreAdView = ({ zone, showOldAds }: StoreAdViewProps) => {
  const [ad, setAd] = useState<Ad | null>(null);

  useEffect(() => {
    async function fetchPdfUrl(zone: string) {
      const link = stores[zone]?.url;
      try {
        const ads: Ad[] = await fetch(link, { cache: "no-cache" }).then(
          (resp) => resp.json()
        );
        console.log(ads);

        setAd(
          showOldAds &&
            ads.find((ad, index) => index > 0 && ad.flyer_type === "weekly")
            ? ads.find((ad, index) => index > 0 && ad.flyer_type === "weekly")!
            : ads[0]
        );
      } catch (error) {
        console.error("Error fetching PDF URL:", error);
      }
    }

    fetchPdfUrl(zone);
  }, [showOldAds, zone]);

  const whitelist = ["flowood", "dallas"];

  // TODO: figure out what state isn't being checked
  const handleLoad = () => {
    console.log("parent");
    // setLoading(false);
  };

  return (
    <div
      className="flex flex-col items-center flex-wrap w-full justify-center"
      id={zone}
    >
      <h1 className="text-2xl my-3">
        <Link
          href={`https://www.kroger.com/stores/grocery/${stores[zone].path}`}
          className="text-blue-500 underline hover:text-blue-700 transition font-semibold"
          target="_blank"
        >
          {capitalize(zone)}
        </Link>
        {ad
          ? " " +
            formatDate(ad.valid_from) +
            "-" +
            formatDate(ad.valid_to) +
            " "
          : ""}
      </h1>
      {ad ? ( // TODO: add loading check
        <PDFViewer
          pdfUrl={ad.pdf_url}
          renderFirstPage={whitelist.includes(zone)}
          onLoad={handleLoad}
        />
      ) : (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      )}
    </div>
  );
};
