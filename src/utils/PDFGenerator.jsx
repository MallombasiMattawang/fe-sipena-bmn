import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { QRCodeSVG } from "qrcode.react";

const PdfGenerator = ({ data }) => {
  const pdfRef = useRef();

  const generatePdf = async () => {
    const input = pdfRef.current;
    const canvas = await html2canvas(input, {
      scale: 2,
      useCORS: true
    });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save("generated-document.pdf");
  };

  return (
    <div>
      <div ref={pdfRef}>

        <table>
          <tr>
            <td>
              <img
                src={"https://bmn.otban5-events.com/images/logo1fix.png"}
                width={"300px"}
                className="rounded"
              />
              adada
            </td>
            <td>
              <QRCodeSVG value={data.kodeAset} size={30} />
            </td>
          </tr>
        </table>

      </div>
      <button onClick={generatePdf}>Download PDF</button>
    </div>
  );
};

export default PdfGenerator;