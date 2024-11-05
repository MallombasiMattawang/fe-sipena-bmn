import React, { useState, useEffect } from "react";

//import layout web
import LayoutWeb from "../../../layouts/Web";

//import service api
import Api from "../../../services/Api";

//import useParams
import { useParams } from "react-router-dom";

//import component loading
import Loading from "../../../components/general/Loading";

export default function WebPagesShow() {
  //init state
  const [page, setPage] = useState({});
  const [loadingPage, setLoadingPage] = useState(true);

  //destruct id
  const { slug } = useParams();

  //fetch data page
  const fetchDetailDataPage = async () => {
    //setLoadingPages "true"
    setLoadingPage(true);

    //fetch data
    await Api.get(`/api/public/pages/${slug}`).then((response) => {
      //assign response to state "pages"
      setPage(response.data.data);

      //title page
      document.title = `${response.data.data.title} - Desa Santri`;

      //setLoadingPages "false"
      setLoadingPage(false);
    });
  };

  //hook useEffect
  useEffect(() => {
    //call method "fetchDataPages"
    fetchDetailDataPage();
  }, []);

  return (
    <LayoutWeb>
      <div className="container mt-4 mb-3">
        {loadingPage ? (
          <Loading />
        ) : (
          <div className="row">
            <div className="col-md-12">
              <h4 className="text-uppercase">
                <i className="fa fa-info-circle"></i> {page.title}
              </h4>
              <hr />
              <div className="card border-0 shadow-sm rounded-3">
                <div className="card-body post-content">
                  <p dangerouslySetInnerHTML={{ __html: page.content }}></p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </LayoutWeb>
  );
}
