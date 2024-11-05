// components/general/ModalPopup.js
import React from "react";
import { Modal, Button } from "react-bootstrap";

const ModalPopup = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title><p className="text-black text-center">Pengambilan Racepack</p></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-black">
        <p>
            Diinformasikan kepada seluruh partisipan OBU 5 RUN yang telah menyelesaikan pembayaran untuk mengambil paket racepack dengan menunjukkan email konfirmasi pembayaran atau KTP.
            </p>
            
             <table className="">
                <tr>
                    <td>Tempat </td>
                    <td>:</td>
                    <td><strong>Gedung Dormitory Kantor Otoritas Bandar Udara Wil.V Makassar</strong></td>
                </tr>
                <tr>
                    <td>Hari/Tanggal </td>
                    <td>:</td>
                    <td><strong>jum'at - sabtu, 6-7 September 2024 </strong></td>
                </tr>
                <tr>
                    <td>Waktu </td>
                    <td>:</td>
                    <td><strong>09:00 – 18:00 WITA</strong></td>
                </tr>
                <tr>
                    <td>CP </td>
                    <td>:</td>
                    <td><strong>+62 812-2449-7480</strong></td>
                </tr>
            </table>
            <br />
            <p>
                Bagi yang diwakilkan, wajib menunjukkan surat kuasa dan FC KTP peserta. Untuk surat kuasa silahkan download di sini 
                <a href="https://docs.google.com/document/d/17tqmLv6KMIm-X2vIxGVGVXkdAI6XOS4V/edit?usp=sharing&ouid=116630032210897281066&rtpof=true&sd=true" target="_blank"> Surat Kuasa</a> 
            </p>
            <p>Dihimbau untuk komunitas agar mengambil paket lomba secara kolektif dengan menunjuk 1 perwakilan.</p>
            <p>Atas perhatian para runners kami ucapkan terima kasih.</p>

            
        <br />
         🏁🏁 Sampai Ketemu di Garis Start 🏁🏁
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalPopup;
