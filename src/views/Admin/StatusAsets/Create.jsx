//import react
import { useState, useEffect } from "react";

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

export default function StatusAsetCreate() {
    //title page
    document.title = "Buat status Aset";

    //navigata
    const navigate = useNavigate();

    //define state for form
    const [nama_status, setNama_status] = useState("");
    const [errors, setErros] = useState([]);

    //token from cookies
    const token = Cookies.get("token");


    //useEffect
    useEffect(() => {

    }, []);

    //function "storeCategory"
    const storeCategory = async (e) => {
        e.preventDefault();

        //sending data
        await Api.post(
            "/api/admin/status-asets",
            {
                //data
                nama_status: nama_status,
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
                navigate("/admin/status-asets");
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
                                to="/admin/status-asets"
                                className="btn btn-md btn-primary border-0 shadow-sm mb-3"
                                type="button"
                            >
                                <i className="fa fa-long-arrow-alt-left me-2"></i> Back
                            </Link>
                            <div className="card border-0 rounded shadow-sm border-top-success">
                                <div className="card-body bg-dark">
                                    <h6>
                                        <i className="fa fa-folder"></i> Buat Status Aset
                                    </h6>
                                    <hr />
                                    <form onSubmit={storeCategory}>
                                        
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">
                                                Nama Status
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={nama_status}
                                                onChange={(e) => setNama_status(e.target.value)}
                                                placeholder="Enter Status Aset"
                                            />
                                        </div>
                                        {errors.nama_status && (
                                            <div className="alert alert-danger">{errors.nama_status[0]}</div>
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