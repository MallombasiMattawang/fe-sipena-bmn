import React from "react";

//import DateID
import DateID from "../../utils/DateID";

//import link
import { Link } from "react-router-dom";

export default function CardPost(props) {
  return (
    <div className="col-md-4 mb-3" key={props.key}>
      <Link to={`/posts/${props.slug}`} className="text-decoration-none">
        <div className="card mb-3 w-100 rounded-3 border-0 shadow-sm h-100">
          <div className="image-wrapper">
            <img src={props.image} className="card-img-top" alt="..." />
          </div>
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">
              {props.title.length > 50
                ? `${props.title.substring(0, 50)}...`
                : props.title}
            </h5>
            <p className="card-text mt-3">
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
            </p>
            {/* <div className="mt-auto">
              <small className="text-body-secondary text-white">
                <i className="fa fa-calendar"></i>{" "}
                {DateID(new Date(props.date))}
              </small>
            </div> */}
          </div>
        </div>
      </Link>
    </div>
  );
}
