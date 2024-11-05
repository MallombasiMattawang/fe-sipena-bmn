import React from "react";

export default function footer() {
  return (
    <footer>
      <div className="container-fluid footer-top">
        <div className="row p-4">
          <div className="col-md-4 mb-4 mt-3">
            <h5>
              TENTANG
              <strong style={{ color: "#ffd22e" }}> DESA SANTRI</strong>
            </h5>
            <hr />
            <div className="text-center">
              <img src="/images/logo-sfm.png" width="100" />
            </div>
            <p className="text-justify mt-3">
              Desa Santri merupakan desa yang berletak di kabupaten Jombang dan
              desa ini kebanyakan berada di kawasan Pesantren.
            </p>
          </div>
          <div className="col-md-4 mb-4 mt-3">
            <h5>
              DOWNLOAD <strong style={{ color: "#ffd22e" }}> APLIKASI</strong>
            </h5>
            <hr />
            <div className="text-left">
              <img
                src="/images/playstore.png"
                width={"180"}
                className="text-center align-items-center"
              />
            </div>
            <p className="text-justify mt-2 text-left">
              Dapatkan info update Desa lebih cepat melalui aplikasi Android.
              Silahkan unduh melalui PlayStore.
            </p>
          </div>
          <div className="col-md-4 mb-4 mt-3">
            <h5>
              KONTAK <strong style={{ color: "#ffd22e" }}>DESA</strong>
            </h5>
            <hr />
            <p>
              <i className="fa fa-map-marker"></i> Jln. Diponegoro No. 58,
              Wonosalam, Jombang, Jawa Timur, 61473
              <br />
              <br />
              <i className="fas fa-envelope"></i> info@desa-santri.com
              <br />
              <br />
              <i className="fas fa-phone"></i> +62 857-8585-2224
            </p>
          </div>
        </div>
      </div>
      <div className="container-fluid footer-bottom">
        <div className="row p-3">
          <div className="text-center text-white font-weight-bold">
            Copyright © 2023 DESA SANTRI. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}