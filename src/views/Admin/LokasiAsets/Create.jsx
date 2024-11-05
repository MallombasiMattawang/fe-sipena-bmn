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
                keterangan: keterangan
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