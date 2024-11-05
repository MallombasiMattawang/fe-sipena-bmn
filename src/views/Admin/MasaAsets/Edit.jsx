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

export default function MasaAsetEdit() {
    //title page
    document.title = "Edit Masa Aset";

    //navigata
    const navigate = useNavigate();

    //get ID from parameter URL
    const { id } = useParams();

    //define state for form
    const [namaMasa, setNamaMasa] = useState("");
    const [errors, setErros] = useState([]);

    //token from cookies
    const token = Cookies.get("token");

    //function fetchDataMasaAset
    const fetchDataMasaAset = async () => {
        await Api.get(`/api/admin/masa-asets/${id}`, {
            //header
            headers: {
                //header Bearer + Token
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            //set response data to state
            setNamaMasa(response.data.data.nama_masa);
        });
    };

    //useEffect
    useEffect(() => {
        //call function "fetchDataMasaAset"
        fetchDataMasaAset();
    }, []);

    //function "updateMasaAset"
    const updateMasaAset = async (e) => {
        e.preventDefault();

        //sending data
        await Api.post(
            `/api/admin/masa-asets/${id}`,
            {
                //data
                nama_masa: namaMasa,
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
                navigate("/admin/masa-asets");
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
                                to="/admin/masa-asets"
                                className="btn btn-md btn-primary border-0 shadow-sm mb-3"
                                type="button"
                            >
                                <i className="fa fa-long-arrow-alt-left me-2"></i> Back
                            </Link>
                            <div className="card border-0 rounded shadow-sm border-top-success">
                                <div className="card-body">
                                    <h6>
                                        <i className="fa fa-folder"></i> Edit Masa Manfaat Aset (Tahun)
                                    </h6>
                                    <hr />
                                    <form onSubmit={updateMasaAset}>
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">
                                                Nama Masa
                                            </label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={namaMasa}
                                                onChange={(e) => setNamaMasa(e.target.value)}
                                                placeholder="Enter Nama Masa"
                                            />
                                        </div>
                                        {errors.namaMasa && (
                                            <div className="alert alert-danger">{errors.namaMasa[0]}</div>
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
                    </div>
                </div>
            </main>
        </LayoutAdmin>
    );
}