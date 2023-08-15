import { TextItem } from "pdfjs-dist/types/src/display/api";
import { useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PDFViewerProps {
  pdfUrl: string;
  renderFirstPage: boolean;
  onLoad: () => void;
}

const PDFViewer: React.FC<PDFViewerProps> = ({
  pdfUrl,
  renderFirstPage,
  onLoad,
}) => {
  async function extractTextFromPDF(pdfUrl: string) {
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
        const s = (pageText.items[i] as TextItem).str;
        if (blacklist.has(s) || s.includes(filteredPattern)) {
          continue;
        }
        if (s === "$" && i + 2 < pageText.items.length) {
          const dollars = (pageText.items[i + 1] as TextItem).str;
          const cents = (pageText.items[i + 2] as TextItem).str;
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
    // TODO: parsing text WIP
    // extractTextFromPDF(pdfUrl).then((textContent) => {
    //   console.log(textContent);
    // });
  }, []);

  const handleLoadSuccess = () => {
    console.log("loaded PDF");
    onLoad();
    console.log("invoked");
  };

  const getMobileScaleFromPageNum = (pageNum: number) => {
    return pageNum === 1 || pageNum === 4 ? 0.5 : 0.75;
  };

  return (
    <div>
      <Document file={pdfUrl} onLoadSuccess={handleLoadSuccess}>
        <div className="flex flex-wrap w-full m-0 justify-center">
          {Array.from(new Array(renderFirstPage ? 4 : 3), (el, index) => {
            const pageNum = index + (renderFirstPage ? 1 : 2);
            return (
              <Page
                key={`page_${pageNum}`}
                pageNumber={pageNum}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                scale={
                  window.innerWidth < 768
                    ? getMobileScaleFromPageNum(pageNum)
                    : 1
                }
              />
            );
          })}
        </div>
      </Document>
    </div>
  );
};

export default PDFViewer;
