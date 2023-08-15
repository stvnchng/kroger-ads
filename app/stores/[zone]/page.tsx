"use client";

import { useEffect, useState } from "react";
import PDFViewer from "../../components/PDFViewer";
import { stores } from "../stores";
import { capitalize } from "../../utils";

type Ad = {
  available_from: string;
  available_to: string;
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

  const formatDate = (d: string | Date) => {
    const date = new Date(d);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${month}/${day}`;
  };

  const getWednesday = (d: string) => {
    const date = new Date(d);
    const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

    const daysUntilNextWednesday = (10 - dayOfWeek) % 7; // 10 represents Wednesday (3) + 7 days

    const nextWednesday = new Date(date);
    nextWednesday.setDate(date.getDate() + daysUntilNextWednesday);

    return nextWednesday;
  };

  const path = stores[params.zone]?.path;

  return (
    <div>
      <div className="flex flex-wrap w-full justify-center">
        <h1 className="text-2xl mb-4">
          {capitalize(params.zone)}{" "}
          {selectedAd
            ? formatDate(getWednesday(selectedAd.available_from)) +
              "-" +
              formatDate(selectedAd.available_to)
            : ""}{" "}
          <a
            href={`https://www.kroger.com/stores/grocery/${path}`}
            className="text-blue-500 underline hover:text-blue-700 transition font-semibold"
            target="_blank"
          >
            Load Coupons
          </a>
        </h1>
      </div>

      {selectedAd ? (
        <PDFViewer
          pdfUrl={selectedAd.pdf_url}
          renderFirstPage={["mississippi", "dallas"].includes(params.zone)}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default StorePage;
