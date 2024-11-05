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

export default function CategoryCreate() {
    //title page
    document.title = "Create Category - Desa Digital";

    //navigata
    const navigate = useNavigate();

    //define state for form
    const [name, setName] = useState("");
    const [errors, setErros] = useState([]);

    //token from cookies
    const token = Cookies.get("token");

    //function "storeCategory"
    const storeCategory = async (e) => {
        e.preventDefault();

        //sending data
        await Api.post(
            "/api/admin/categories",
            {
                //data
                name: name,
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
                navigate("/admin/categories");
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
                                to="/admin/categories"
                                className="btn btn-md btn-primary border-0 shadow-sm mb-3"
                                type="button"
                            >
                                <i className="fa fa-long-arrow-alt-left me-2"></i> Back
                            </Link>
                            <div className="card border-0 rounded shadow-sm border-top-success">
                                <div className="card-body">
                                    <h6>
                                        <i className="fa fa-folder"></i> Create Category
                                    </h6>
                                    <hr />
                                    <form onSubmit={storeCategory}>
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">
                                                Category Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Enter Category Name"
                                            />
                                        </div>
                                        {errors.name && (
                                            <div className="alert alert-danger">{errors.name[0]}</div>
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