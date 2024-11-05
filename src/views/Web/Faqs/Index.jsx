import React, { useState, useEffect } from "react";

//import layout web
import LayoutWeb from "../../../layouts/Web";

//import service api
import Api from "../../../services/Api";

//import component alert
import AlertDataEmpty from "../../../components/general/AlertDataEmpty";

//import component loading
import Loading from "../../../components/general/Loading";

//import component card page
import CardPage from "../../../components/general/CardPage";

export default function WebFaqsIndex() {
  //title page
  document.title = "FAQ Events";

  //init state
  const [faqs, setFaqs] = useState([]);
  const [loadingPages, setLoadingPages] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null); // State to track the active accordion

  //fetch data faqs
  const fetchDataFaqs = async () => {
    //setLoadingPages "true"
    setLoadingPages(true);

    //fetch data
    await Api.get("/api/public/faqs").then((response) => {
      //assign response to state "faqs"
      setFaqs(response.data.data);

      //setLoadingPages "false"
      setLoadingPages(false);
    });
  };

  //hook useEffect
  useEffect(() => {
    //call method "fetchDataFaqs"
    fetchDataFaqs();
  }, []);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <LayoutWeb>
      <div className="container mt-4 mb-3">
        <div className="row">
          <div className="col-md-12">
            <h5 className="text-uppercase">
              <i className="fa fa-info-circle"></i> FAQ (Frequently Asked Question)
            </h5>
            <hr />
          </div>
        </div>
        <div className="row mt-4">
          {loadingPages ? (
            <Loading />
          ) : faqs.length > 0 ? (
            faqs.map((faq, index) => (
              <div key={faq.id} className="col-md-12 mb-3">
                <div className="card">
                  <div
                    className="card-header"
                    onClick={() => toggleAccordion(index)}
                    style={{ cursor: "pointer" }}
                  >
                    <h5 className="mb-0">{faq.question}</h5>
                  </div>
                  {activeIndex === index && (
                    <div
                      className="card-body"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    ></div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <AlertDataEmpty />
          )}
        </div>
      </div>
    </LayoutWeb>
  );
}
