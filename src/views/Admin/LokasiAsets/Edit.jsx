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