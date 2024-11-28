//import react
import { useState } from "react";

//import react router dom
import { Link, useNavigate } from "react-router-dom";

//import layout
import LayoutAdmin from "../../../layouts/Admin";

//import api
import Api from "../../../services/Api";

//import js cookie
import Cookies from "js-cookie";

//import toast
import toast from "react-hot-toast";

export default function LokasiAsetCreate() {
    //title page
    document.title = "Create Lokasi Aset";

    //navigata
    const navigate = useNavigate();

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

    //function "storeLokasiAset"
    const storeLokasiAset = async (e) => {
        e.preventDefault();

        //sending data
        await Api.post(
            "/api/admin/lokasi-asets",
            {
                //data
                nama_lokasi: namaLokasi,
                kode_lokasi: kodeLokasi,
                keterangan: keterangan,
                penanggung_jawab: penanggung_jawab,
                nip_penanggung_jawab: nip_penanggung_jawab,
                kuasa_pengguna: kuasa_pengguna,
                nip_kuasa_pengguna: nip_kuasa_pengguna,
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
                        <div className="col-md-12">
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
                                        <i className="fa fa-folder"></i> Create Lokasi Aset
                                    </h6>
                                    <hr />
                                    <form onSubmit={storeLokasiAset}>
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
                                        {errors.nama_lokasi && (
                                            <div className="alert alert-danger">{errors.nama_lokasi[0]}</div>
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
                                        {errors.kode_lokasi && (
                                            <div className="alert alert-danger">{errors.kode_lokasi[0]}</div>
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
                                                <i className="fa fa-save"></i> Save
                                            </button>
                                            <button type="reset" className="btn btn-md btn-warning">
                                                <i className="fa fa-redo"></i> Reset
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </LayoutAdmin>
    );
}