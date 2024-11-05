import React from "react";

//import link
import { Link } from "react-router-dom";

export default function CardPage(props) {
  return (
    <div className="col-md-4 mb-4">
      <Link to={`/pages/${props.slug}`} className="text-decoration-none">
        <div
          className="card border-0 shadow-sm rounded-3 text-center text-uppercase"
          key={props.key}
        >
          <div className="card-body mt-2">
            <h5>{props.title}</h5>
          </div>
        </div>
      </Link>
    </div>
  );
}