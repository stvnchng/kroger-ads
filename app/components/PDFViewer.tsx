import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.6.172/pdf.worker.js";

interface PDFViewerProps {
  pdfUrl: string;
  renderFirstPage: boolean;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl, renderFirstPage }) => {
  const getMobileScaleFromPageNum = (pageNum: number) => {
    return pageNum === 1 || pageNum === 4 ? 0.5 : 0.75;
  };

  return (
    <Document file={pdfUrl}>
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
                window.innerWidth < 768 ? getMobileScaleFromPageNum(pageNum) : 1
              }
            />
          );
        })}
      </div>
    </Document>
  );
};

export default PDFViewer;
