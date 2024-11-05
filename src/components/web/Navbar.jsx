import React from "react";

import { Link, useLocation } from "react-router-dom";
import Countdown from "../../views/Web/CountdownTimer/Index";

export default function Navbar() {
  //assigning location variable
  const location = useLocation();

  //destructuring pathname from location
  const { pathname } = location;

  //Javascript split method to get the name of the path in array
  const activeRoute = pathname.split("/");

  return (
    <>
     

      <div className="jumbotron-header pb-3">
        <div className="container">
          <div className="row">
            <div className="col-md-9 d-none d-md-block d-lg-block">
              <div className="header-logo">
                <a href="#">
                  <img
                    src="/images/logo-login.png"
                    width="110"
                    className="img-responsive"
                  />
                </a>
              </div>
              <div className="header-text">
              <h2 className="header-school">OTBAN5-EVENTS</h2>
                <hr />
                <div className="header-address">
                  Otoritas Bandar Udara Wilayah V Kelas 1 - Makassar
                </div>
              </div>
            </div>

            <div className="row d-block d-md-none d-lg-none">
              <div className="col-md-6 text-center mt-3">
                <a href="#">
                  <img
                    src="/images/logo-login.png"
                    width="110"
                    className="img-responsive"
                  />
                </a>
              </div>
              <div className="col-md-12 text-center text-white mb-3">
                <h2 className="header-school">OTBAN5-EVENTS</h2>
                <hr />
                <div className="header-address">
                Otoritas Bandar Udara Wilayah V Kelas 1 - Makassar
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div
                className="d-none d-md-block d-lg-block"
                style={{ marginTop: "60px" }}
              ></div>
              {/* <Countdown /> */}
              {/* <form
                className="d-flex"
                action="#"
                method="GET"
              >
                <input
                  className="form-control border-0 me-2"
                  type="search"
                  name="q"
                  placeholder="cari Informasi Event..."
                  aria-label="Search"
                />
                <button className="btn btn-primary-dark" type="submit" style={{ backgroundColor: '#005005',borderColor: '#005005',color: 'white' }}>
                  CARI
                </button>
              </form> */}
            </div>
          </div>
        </div>
      </div>
      <nav className="navbar navbar-expand-md navbar-light navbar-blue nav-web">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item ms-2">
                <Link
                  className={
                    activeRoute[1] === ""
                      ? "nav-link active text-uppercase"
                      : "nav-link text-uppercase"
                  }
                  to="/"
                >
                  <i className="fa fa-home"></i> BERANDA
                </Link>
              </li>

            
              <li className="nav-item ms-2">
                <Link
                  className={
                    activeRoute[1] === "posts"
                      ? "nav-link active text-uppercase"
                      : "nav-link text-uppercase"
                  }
                  to="/posts"
                >
                  <i className="fa fa-book"></i> Informasi
                </Link>
              </li>

              <li className="nav-item ms-2">
                <Link
                  className={
                    activeRoute[1] === "faqs"
                      ? "nav-link active text-uppercase"
                      : "nav-link text-uppercase"
                  }
                  to="/faqs"
                >
                  <i className="fa fa-question"></i> FAQ
                </Link>
              </li>

             

              <li className="nav-item ms-2">
                <Link
                  className={
                    activeRoute[1] === "photos"
                      ? "nav-link active text-uppercase"
                      : "nav-link text-uppercase"
                  }
                  to="/photos"
                >
                  <i className="fa fa-camera"></i>  FOTO
                </Link>
                
              </li>

              <li className="nav-item ms-2">
                <Link
                  className={
                    activeRoute[1] === "videos"
                      ? "nav-link active text-uppercase"
                      : "nav-link text-uppercase"
                  }
                  to="/videos"
                >
                  <i className="fa fa-video"></i> VIDEO
                </Link>
                
              </li>
             
            </ul>
            <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                <li className="nav-item">
                <Link
                  className={
                    activeRoute[1] === "regis-confirm"
                      ? "nav-link active text-uppercase bg-success"
                      : "nav-link text-uppercase bg-success"
                  }
                  to="/regis-confirm"
                >
                  <i className="fa fa-credit-card"></i> KONFIRMASI
                </Link>
                </li>
                &nbsp;&nbsp;
                {/* <li className="nav-item">
                <Link
                  className={
                    activeRoute[1] === "regis-member"
                      ? "nav-link active text-uppercase bg-danger"
                      : "nav-link text-uppercase bg-danger"
                  }
                  to="/regis-member"
                >
                  <i className="fa fa-pencil"></i> REGISTRASI
                </Link>
                </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
