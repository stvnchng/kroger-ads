import { useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PDFViewer = ({ pdfUrl, renderFirstPage }) => {
  async function extractTextFromPDF(pdfUrl) {
    const loadingTask = pdfjs.getDocument(pdfUrl);
    const pdfDocument = await loadingTask.promise;

    const allPagesText = [];

    const blacklist = new Set([
      "With Card &",
      "Digital Coupon",
      "WEEKLY",
      "DIGITAL",
      "DEALS",
      "While supplies last.",
      "Scan",
      "DIGITALDEALS",
      "Look for",
      "these tags.",
      "Use each coupon",
      "in one transaction.",
      "With Card &",
      "Digital Coupon",
    ]);

    const filteredPattern = "GT0";

    for (let pageNum = renderFirstPage ? 1 : 2; pageNum <= 4; pageNum++) {
      const page = await pdfDocument.getPage(pageNum);
      const pageText = await page.getTextContent();

      let pageTextContent = [];

      let curr = "";
      for (let i = 0; i < pageText.items.length; i++) {
        const s = pageText.items[i].str;
        if (blacklist.has(s) || s.includes(filteredPattern)) {
          continue;
        }
        // pageTextContent.push(s);
        // continue;
        if (s === "$" && i + 2 < pageText.items.length) {
          const dollars = pageText.items[i + 1].str;
          const cents = pageText.items[i + 2].str;
          curr += `$${dollars}.${cents}`;
          i += 2; // Skip the next two items
        } else if (s !== "") {
          // if (i > 0) curr += " ";
          curr += s;
        } else {
          pageTextContent.push(curr);
          curr = "";
        }
      }

      allPagesText.push(pageTextContent);
    }
    console.log(allPagesText);

    return allPagesText;
  }

  useEffect(() => {
    extractTextFromPDF(pdfUrl)
      .then((textContent) => {
        console.log(textContent);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <Document file={pdfUrl}>
        <div className="flex flex-wrap w-full m-0 justify-center">
          {Array.from(new Array(renderFirstPage ? 4 : 3), (el, index) => (
            <Page
              key={`page_${index + (renderFirstPage ? 1 : 2)}`}
              pageNumber={index + (renderFirstPage ? 1 : 2)}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className={"text-black"}
            />
          ))}
        </div>
      </Document>
    </div>
  );
};

export default PDFViewer;
