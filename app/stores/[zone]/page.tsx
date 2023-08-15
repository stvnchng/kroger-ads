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

  const path = stores[params.zone]?.path;

  return (
    <div>
      <div className="flex flex-wrap w-full justify-center">
        <h1 className="text-2xl mb-4">
          {capitalize(params.zone)} Weekly Ad{" "}
          <a
            href={`https://www.kroger.com/stores/grocery/${path}`}
            className="text-blue-500 underline hover:text-blue-700 transition font-semibold"
            target="_blank"
          >
            Load Coupons
          </a>
        </h1>
      </div>

      {pdfUrl ? <PDFViewer pdfUrl={pdfUrl} /> : <p>Loading...</p>}
    </div>
  );
};

export default StorePage;
