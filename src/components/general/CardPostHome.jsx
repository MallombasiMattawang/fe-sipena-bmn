import React from "react";

//import link
import { Link } from "react-router-dom";

//import DateID
import DateID from "../../utils/DateID";

export default function CardPostHome(props) {
  return (
    <div className="col-md-6 mb-3" key={props.key}>
      <Link to={`/posts/${props.slug}`} className="text-decoration-none">
        <div className="card mb-3 w-100 rounded-3 border-0 shadow-sm h-100">
          <div className="row g-0 mb-0 pb-0 h-100">
            <div className="col-md-5">
              <div className="image-wrapper p-3">
                <img
                  src={props.image}
                  className="img-fluid rounded"
                  alt={props.title}
                />
              </div>
            </div>
            <div className="col-md-7 d-flex">
              <div className="card-body d-flex flex-column justify-content-between bg-dark">
                <div>
                  <h5 className="card-title">
                    {props.title.length > 50
                      ? `${props.title.substring(0, 50)}...`
                      : props.title}
                  </h5>
                  <hr />
                  {props.content.length > 40 ? (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: props.content.substring(0, 40) + "...",
                      }}
                    ></span>
                  ) : (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: props.content,
                      }}
                    ></span>
                  )}
                </div>
                <div className="d-flex justify-content-between mt-auto">
                  <div className="start-0">

                  </div>
                  <div className="end-0">
                    <i className="fa fa-calendar"></i>{" "}
                    {DateID(new Date(props.date))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
