import React, { useState, useEffect } from "react";

//import layout web
import LayoutWeb from "../../../layouts/Web";

//import service api
import Api from "../../../services/Api";

//import component alert
import AlertDataEmpty from "../../../components/general/AlertDataEmpty";

//import component loading
import Loading from "../../../components/general/Loading";

//import component card aparatur
import CardAparatur from "../../../components/general/CardAparatur";

export default function Aparaturs() {
  //title page
  document.title = "Aparaturs - Desa Santri";

  //init state
  const [aparaturs, setAparaturs] = useState([]);
  const [loadingAparatur, setLoadingAparatur] = useState(true);

  //fetch data aparaturs
  const fetchDataAparaturs = async () => {
    //setLoadingAparatur "true"
    setLoadingAparatur(true);

    //fetch data
    await Api.get("/api/public/aparaturs").then((response) => {
      //assign response to state "aparaturs"
      setAparaturs(response.data.data);

      //setLoadingAparatur "false"
      setLoadingAparatur(false);
    });
  };

  //hook useEffect
  useEffect(() => {
    //call method "fetchDataAparaturs"
    fetchDataAparaturs();
  }, []);

  return (
    <LayoutWeb>
      <div className="container mt-4 mb-3">
        <div classname="row">
          <div className="col-md-12">
            <h5 className="text-uppercase">
              <i className="fa fa-user-circle"></i> Aparatur DESA
            </h5>
            <hr />
          </div>
        </div>
        <div className="row mt-4">
          {loadingAparatur ? (
            <Loading />
          ) : aparaturs.length > 0 ? (
            aparaturs.map((aparatur) => (
              <CardAparatur
                key={aparatur.id}
                name={aparatur.name}
                image={aparatur.image}
                role={aparatur.role}
              />
            ))
          ) : (
            <AlertDataEmpty />
          )}
        </div>
      </div>
    </LayoutWeb>
  );
}
