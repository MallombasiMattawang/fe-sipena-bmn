import React from "react";

export default function CardAparatur(props) {
  return (
    <div className="col-md-4 mb-4">
      <div
        className="card border-0 shadow-sm rounded-3 text-center text-uppercase"
        key={props.key}
      >
        <div className="card-body mt-2">
          <div className="text-center mb-3">
            <img src={props.image} className="w-50 rounded-pill" />
          </div>
          <h5>{props.name}</h5>
          <hr />
          <h6>
            <i>{props.role}</i>
          </h6>
        </div>
      </div>
    </div>
  );
}