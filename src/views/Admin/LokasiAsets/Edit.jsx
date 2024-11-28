//import react
import { useState, useEffect } from "react";

//import react router dom
import { Link, useNavigate, useParams } from "react-router-dom";

//import layout
import LayoutAdmin from "../../../layouts/Admin";

//import api
import Api from "../../../services/Api";

//import js cookie
import Cookies from "js-cookie";

//import toast
import toast from "react-hot-toast";

import jsPDF from 'jspdf';
import PrintComponentLokasi from "../../../utils/PrintComponentLokasi";

export default function LokasiAsetEdit() {
    //title page
    document.title = "Edit Lokasi Aset";

    //navigata
    const navigate = useNavigate();

    //get ID from parameter URL
    const { id } = useParams();

    //define state for form
    const [namaLokasi, setNamaLokasi] = useState("");
    const [kodeLokasi, setKodeLokasi] = useState("");
    const [keterangan, setKeterangan] = useState("");
    const [penanggung_jawab, setPenanggung_jawab] = useState("");
    const [nip_penanggung_jawab, setNip_penanggung_jawab] = useState("");
    const [kuasa_pengguna, setKuasa_pengguna] = useState("");
    const [nip_kuasa_pengguna, setNip_kuasa_pengguna] = useState("");
    const [errors, setErros] = useState([]);

    //token from cookies
    const token = Cookies.get("token");

    //function fetchDataLokasiAset
    const fetchDataLokasiAset = async () => {
        await Api.get(`/api/admin/lokasi-asets/${id}`, {
            //header
            headers: {
                //header Bearer + Token
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            //set response data to state
            setNamaLokasi(response.data.data.nama_lokasi);
            setKodeLokasi(response.data.data.kode_lokasi);
            setKeterangan(response.data.data.keterangan);
            setPenanggung_jawab(response.data.data.penanggung_jawab);
            setNip_penanggung_jawab(response.data.data.nip_penanggung_jawab);
            setKuasa_pengguna(response.data.data.kuasa_pengguna);
            setNip_kuasa_pengguna(response.data.data.nip_kuasa_pengguna);
        });
    };

    const dataToPrint = {
        kodeLokasi,
        namaLokasi,
        keterangan,
    };

    //useEffect
    useEffect(() => {
        //call function "fetchDataLokasiAset"
        fetchDataLokasiAset();
    }, []);

    //function "updateLokasiAset"
    const updateLokasiAset = async (e) => {
        e.preventDefault();

        //sending data
        await Api.post(
            `/api/admin/lokasi-asets/${id}`,
            {
                //data
                nama_lokasi: namaLokasi,
                kode_lokasi: kodeLokasi,
                keterangan: keterangan,
                penanggung_jawab: penanggung_jawab,
                nip_penanggung_jawab: nip_penanggung_jawab,
                kuasa_pengguna: kuasa_pengguna,
                nip_kuasa_pengguna: nip_kuasa_pengguna,
                _method: "PUT",
            },
            {
                //header
                headers: {
                    //header Bearer + Token
                    Authorization: `Bearer ${token}`,
                    "content-type": "multipart/form-data",
                },
            }
        )
            .then((response) => {
                //show toast
                toast.success(response.data.message, {
                    position: "top-right",
                    duration: 4000,
                });

                //redirect
                navigate("/admin/lokasi-asets");
            })
            .catch((error) => {
                //set error message to state "errors"
                setErros(error.response.data);
            });
    };

    return (
        <LayoutAdmin>
            <main>
                <div className="container-fluid mb-5 mt-5">
                    <div className="row">
                        <div className="col-md-8">
                            <Link
                                to="/admin/lokasi-asets"
                                className="btn btn-md btn-primary border-0 shadow-sm mb-3"
                                type="button"
                            >
                                <i className="fa fa-long-arrow-alt-left me-2"></i> Back
                            </Link>
                            <div className="card border-0 rounded shadow-sm border-top-success">
                                <div className="card-body">
                                    <h6>
                                        <i className="fa fa-folder"></i> Edit Lokasi Aset
                                    </h6>
                                    <hr />
                                    <form onSubmit={updateLokasiAset}>
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">
                                                Nama Lokasi / Ruangan
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={namaLokasi}
                                                onChange={(e) => setNamaLokasi(e.target.value)}
                                                placeholder="Enter Nama Lokasi"
                                            />
                                        </div>
                                        {errors.namaLokasi && (
                                            <div className="alert alert-danger">{errors.namaLokasi[0]}</div>
                                        )}
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">
                                                Kode Lokasi / Ruangan
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={kodeLokasi}
                                                onChange={(e) => setKodeLokasi(e.target.value)}
                                                placeholder="Enter Kode Lokasi"
                                            />
                                        </div>
                                        {errors.kodeLokasi && (
                                            <div className="alert alert-danger">{errors.kodeLokasi[0]}</div>
                                        )}
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">
                                                Penanggung Jawab
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={penanggung_jawab}
                                                onChange={(e) => setPenanggung_jawab(e.target.value)}
                                                placeholder="Enter Penanggung Jawab Lokasi"
                                            />
                                        </div>
                                        {errors.penanggung_jawab && (
                                            <div className="alert alert-danger">{errors.penanggung_jawab[0]}</div>
                                        )}
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">
                                                NIP Penanggung Jawab
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={nip_penanggung_jawab}
                                                onChange={(e) => setNip_penanggung_jawab(e.target.value)}
                                                placeholder="Enter NIP Penanggung Jawab Lokasi"
                                            />
                                        </div>
                                        {errors.nip_penanggung_jawab && (
                                            <div className="alert alert-danger">{errors.nip_penanggung_jawab[0]}</div>
                                        )}
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">
                                                Kuasa Pengguna
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={kuasa_pengguna}
                                                onChange={(e) => setKuasa_pengguna(e.target.value)}
                                                placeholder="Enter Kuasa Pengguna"
                                            />
                                        </div>
                                        {errors.kuasa_pengguna && (
                                            <div className="alert alert-danger">{errors.kuasa_pengguna[0]}</div>
                                        )}
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">
                                                NIP Kuasa Pengguna
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={nip_kuasa_pengguna}
                                                onChange={(e) => setNip_kuasa_pengguna(e.target.value)}
                                                placeholder="Enter NIP Kuasa Pengguna"
                                            />
                                        </div>
                                        {errors.nip_kuasa_pengguna && (
                                            <div className="alert alert-danger">{errors.nip_kuasa_pengguna[0]}</div>
                                        )}
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">
                                                Keterangan
                                            </label>
                                            <textarea
                                                className="form-control"
                                                value={keterangan}
                                                onChange={(e) => setKeterangan(e.target.value)}
                                                placeholder="Enter Keterangan Lokasi"
                                                rows="4"
                                            />
                                        </div>
                                        {errors.keterangan && (
                                            <div className="alert alert-danger">{errors.keterangan[0]}</div>
                                        )}
                                        <div>
                                            <button
                                                type="submit"
                                                className="btn btn-md btn-primary me-2"
                                            >
                                                <i className="fa fa-save"></i> Update
                                            </button>
                                            <button type="reset" className="btn btn-md btn-warning">
                                                <i className="fa fa-redo"></i> Reset
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                        <div className="card">
                                <div className="card-header">
                                    <h6>Barcode Lokasi Aset</h6>
                                </div>
                                <div className="card-body bg-dark text-center">
                                    <PrintComponentLokasi data={dataToPrint} />
                                    <a
                                        href={`https://api-bmn.otban5-events.com/api/public/barcode-lokasi-aset-pdf/${kodeLokasi}`}
                                        className="btn btn-md btn-info border-0 shadow-sm mb-3"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i className="fa fa-file-pdf me-2"></i> Cetak Qrcode
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </LayoutAdmin>
    );
}