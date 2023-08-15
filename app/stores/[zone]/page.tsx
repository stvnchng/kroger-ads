"use client";

import { useEffect, useState } from "react";
import PDFViewer from "../../components/PDFViewer";
import { stores } from "../stores";
import { capitalize } from "../../utils";

const StorePage = ({ params }: { params: { zone: string } }) => {
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    async function fetchPdfUrl() {
      const link = stores[params.zone]?.url;
      try {
        const pdfUrl = await fetch(link)
          .then((resp) => resp.json())
          .then((data) => data[0].pdf_url);
        console.log(pdfUrl);
        setPdfUrl(pdfUrl);
      } catch (error) {
        console.error("Error fetching PDF URL:", error);
      }
    }

    fetchPdfUrl();
  }, []);

  const getNextWednesday = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

    const daysUntilNextWednesday = (10 - dayOfWeek) % 7; // 10 represents Wednesday (3) + 7 days

    const nextWednesday = new Date(today);
    nextWednesday.setDate(today.getDate() + daysUntilNextWednesday);

    return nextWednesday;
  };

  const formatDateToMMDD = (date: Date) => {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${month}/${day}`;
  };

  function addDaysToDate(date: Date, days: number) {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + days);
    return newDate;
  }

  const path = stores[params.zone]?.path;
  const wed = getNextWednesday();

  return (
    <div>
      <div className="flex flex-wrap w-full justify-center">
        <h1 className="text-2xl mb-4">
          {capitalize(params.zone)}{" "}
          {formatDateToMMDD(wed) +
            "-" +
            formatDateToMMDD(addDaysToDate(wed, 6))}{" "}
          <a
            href={`https://www.kroger.com/stores/grocery/${path}`}
            className="text-blue-500 underline hover:text-blue-700 transition font-semibold"
            target="_blank"
          >
            Load Coupons
          </a>
        </h1>
      </div>

      {pdfUrl ? (
        <PDFViewer
          pdfUrl={pdfUrl}
          renderFirstPage={["mississippi", "dallas"].includes(params.zone)}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default StorePage;
