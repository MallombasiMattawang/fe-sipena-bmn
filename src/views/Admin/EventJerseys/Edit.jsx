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

export default function EventJerseysEdit() {
    //title page
    document.title = "Edit Jerseys Events";

    //navigata
    const navigate = useNavigate();

    //get ID from parameter URL
    const { id } = useParams();

    //define state for form
    const [size, setSize] = useState("");
    const [amount, setAmount] = useState("");
    const [stock, setStock] = useState("");
    const [errors, setErros] = useState([]);

    //token from cookies
    const token = Cookies.get("token");

    //function fetchDataCategory
    const fetchDataCategory = async () => {
        await Api.get(`/api/admin/event-jerseys/${id}`, {
            //header
            headers: {
                //header Bearer + Token
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            //set response data to state
            setSize(response.data.data.size);
            setAmount(response.data.data.amount);
            setStock(response.data.data.stock);
        });
    };

    //useEffect
    useEffect(() => {
        //call function "fetchDataCategory"
        fetchDataCategory();
    }, []);

    //function "updateCategory"
    const updateCategory = async (e) => {
        e.preventDefault();

        //sending data
        await Api.post(
            `/api/admin/event-jerseys/${id}`,
            {
                //data
                size: size,
                amount: amount,
                stock: stock,
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
                navigate("/admin/event-jerseys");
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
                                to="/admin/event-jerseys"
                                className="btn btn-md btn-primary border-0 shadow-sm mb-3"
                                type="button"
                            >
                                <i className="fa fa-long-arrow-alt-left me-2"></i> Back
                            </Link>
                            <div className="card border-0 rounded shadow-sm border-top-success">
                                <div className="card-body bg-dark">
                                    <h6>
                                        <i className="fa fa-folder"></i> Edit Event Jerseys
                                    </h6>
                                    <hr />
                                    <form onSubmit={updateCategory}>
                                    <div className="mb-3">
                                            <label className="form-label fw-bold">
                                                Jerseys Event
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={size}
                                                onChange={(e) => setSize(e.target.value)}
                                                placeholder="Enter Jersey Event"
                                            />
                                        </div>
                                        {errors.size && (
                                            <div className="alert alert-danger">{errors.size[0]}</div>
                                        )}
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">
                                                Amount (pcs)
                                            </label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                                placeholder="Enter Amount"
                                            />
                                        </div>
                                        {errors.amount && (
                                            <div className="alert alert-danger">{errors.amount[0]}</div>
                                        )}
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">
                                                Stock (pcs)
                                            </label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={stock}
                                                max={amount}
                                                onChange={(e) => setStock(e.target.value)}
                                                placeholder="Enter Stock"
                                            />
                                        </div>
                                        {errors.stock && (
                                            <div className="alert alert-danger">{errors.stock[0]}</div>
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