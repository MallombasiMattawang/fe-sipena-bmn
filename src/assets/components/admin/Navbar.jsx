//import React
import React, { useState } from "react";

//import Link from react router dom
import { Link, useNavigate } from "react-router-dom";

//import API
import Api from "../../services/Api";

//import js cookie
import Cookies from "js-cookie";

//import toast
import toast from "react-hot-toast";

//import digitalclock
import DigitalClock from "../../utils/DigitalClock";

export default function navbar() {
    //state toggle
    const [sidebarToggle, setSidebarToggle] = useState(false);

    //function toggle hanlder
    const sidebarToggleHandler = (e) => {
        e.preventDefault();

        if (!sidebarToggle) {
            //add class on body
            document.body.classList.add("sb-sidenav-toggled");

            //set state "sidebarToggle" to true
            setSidebarToggle(true);
        } else {
            //remove class on body
            document.body.classList.remove("sb-sidenav-toggled");

            //set state "sidebarToggle" to false
            setSidebarToggle(false);
        }
    };

    //navigate
    const navigate = useNavigate();

    //method logout
    const logout = async (e) => {
        e.preventDefault();

        //fetch to rest api for logout
        await Api.post("/api/logout").then(() => {
            //remove user from cookies
            Cookies.remove("user");

            //remove token from cookies
            Cookies.remove("token");

            //remove permissions from cookies
            Cookies.remove("permissions");

            //show toast
            toast.success("Logout Successfully!", {
                position: "top-right",
                duration: 4000,
            });

            //redirect to login page
            navigate("/login");
        });
    };

    return (
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-green border-top-yellow shadow-sm fixed-top" style={{ paddingLeft: 0, height: '56px', zIndex: '1039' }}>
            <a className="navbar-brand ps-3 fw-bold" href="#">
                E-TIKETING
            </a>
            <button
                className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
                id="sidebarToggle"
                onClick={sidebarToggleHandler}
                href="#!"
            >
                <i className="fas fa-bars"></i>
            </button>
            <DigitalClock />
            <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0"></form>
            <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                <li className="nav-item dropdown">
                    <a
                        className="nav-link dropdown-toggle"
                        id="navbarDropdown"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <i className="fas fa-user fa-fw"></i>
                    </a>
                    <ul
                        className="dropdown-menu dropdown-menu-end"
                        aria-labelledby="navbarDropdown"
                    >
                        <li>
                            <Link className="dropdown-item" onClick={logout}>
                                Logout
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
}