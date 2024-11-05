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

export default function UsersCreate() {
    //title page
    document.title = "Create User - Desa Digital";

    //navigata
    const navigate = useNavigate();

    //define state for form
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [rolesData, setRolesData] = useState([]);
    const [errors, setErros] = useState([]);

    //define state "roles"
    const [roles, setRoles] = useState([]);

    //token from cookies
    const token = Cookies.get("token");

    //function "fetchDataRoles"
    const fetchDataRoles = async () => {
        await Api.get("/api/admin/roles/all", {
            //header
            headers: {
                //header Bearer + Token
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            //set response data to state "roles"
            setRoles(response.data.data);
        });
    };

    //useEffect
    useEffect(() => {
        //call function "fetchDataRoles"
        fetchDataRoles();
    }, []);

    //function "handleCheckboxChange"
    const handleCheckboxChange = (e) => {
        //define data
        let data = rolesData;

        //push data on state
        data.push(e.target.value);

        //set data to state
        setRolesData(data);
    };

    //function "storeUser"
    const storeUser = async (e) => {
        e.preventDefault();

        //sending data
        await Api.post(
            "/api/admin/users",
            {
                //data
                name: name,
                email: email,
                password: password,
                password_confirmation: passwordConfirmation,
                roles: rolesData,
            },
            {
                //header
                headers: {
                    //header Bearer + Token
                    Authorization: `Bearer ${token}`,
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
                navigate("/admin/users");
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
                                to="/admin/users"
                                className="btn btn-md btn-primary border-0 shadow-sm mb-3"
                                type="button"
                            >
                                <i className="fa fa-long-arrow-alt-left me-2"></i> Back
                            </Link>
                            <div className="card border-0 rounded shadow-sm border-top-success">
                                <div className="card-body">
                                    <h6>
                                        <i className="fa fa-user"></i> Create User
                                    </h6>
                                    <hr />
                                    <form onSubmit={storeUser}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label fw-bold">
                                                        Full Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        placeholder="Enter Full Name"
                                                    />
                                                </div>
                                                {errors.name && (
                                                    <div className="alert alert-danger">
                                                        {errors.name[0]}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label fw-bold">
                                                        Email Address
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        placeholder="Enter Email Address"
                                                    />
                                                </div>
                                                {errors.email && (
                                                    <div className="alert alert-danger">
                                                        {errors.email[0]}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label fw-bold">Password</label>
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        placeholder="Enter Password"
                                                    />
                                                </div>
                                                {errors.password && (
                                                    <div className="alert alert-danger">
                                                        {errors.password[0]}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label fw-bold">
                                                        Password Confirmation
                                                    </label>
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        value={passwordConfirmation}
                                                        onChange={(e) =>
                                                            setPasswordConfirmation(e.target.value)
                                                        }
                                                        placeholder="Enter Password Confirmation"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="mb-3">
                                            <label className="fw-bold">Roles</label>
                                            <br />
                                            {roles.map((role) => (
                                                <div
                                                    className="form-check form-check-inline"
                                                    key={Math.random()}
                                                >
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value={role.name}
                                                        onChange={handleCheckboxChange}
                                                        id={`check-${role.id}`}
                                                    />
                                                    <label
                                                        className="form-check-label fw-normal"
                                                        htmlFor={`check-${role.id}`}
                                                    >
                                                        {role.name}
                                                    </label>
                                                </div>
                                            ))}

                                            {errors.roles && (
                                                <div className="alert alert-danger mt-2">
                                                    {errors.roles[0]}
                                                </div>
                                            )}
                                        </div>
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