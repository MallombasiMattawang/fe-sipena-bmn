import React, { useRef } from "react";

import { QRCodeSVG } from "qrcode.react";

import moneyFormat from "./MoneyFormat";
import dateTimeFormat from "./dateTimeFormat";

import { dateFormat } from "./DateFormat";

const PrintComponentLokasi = ({ data }) => {
  const printRef = useRef();

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;

    // Mengembalikan fungsi event listener untuk menyegarkan halaman setelah print
    window.location.reload();
  };

  return (
    <div>
      {/* <button className="btn btn-secondary mb-3" onClick={handlePrint}><i className="fas fa-print"></i> Print</button> */}
      <div ref={printRef} id="print-area" className="print-area">        
        <table className="table table-bordered">
          <thead>
            <tr>
              <td colSpan={2} className="text-center">
                <strong>SCAN ME</strong> <br />
                <QRCodeSVG value={data.kodeLokasi} size={100} />
                <br />
                
              </td>
            </tr>
            <tr className="text-center">
              <th>Kode Lokasi</th>
              <th><small>{data.kodeLokasi}</small></th>
            </tr>
            <tr className="text-center">
              <th>Nama Lokasi</th>
              <th><small>{data.namaLokasi}</small></th>
            </tr>
            <tr className="text-center">
              <th>Keterangan</th>
              <th><small>{data.keterangan}</small></th>
            </tr>
          </thead>
          <tbody>
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PrintComponentLokasi;
