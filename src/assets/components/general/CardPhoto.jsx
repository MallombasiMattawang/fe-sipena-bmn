import React from "react";

export default function CardPhoto(props) {
  return (
    <div className="col-md-4 mb-4">
      <div
        className="card border-0 shadow-sm rounded-3 text-center"
        key={props.key}
      >
        <div className="card-body mt-2">
          <div className="text-center mb-3">
            <img src={props.image} className="w-100 rounded" />
          </div>
          <hr />
          <h6>
            <i>{props.caption}</i>
          </h6>
        </div>
      </div>
    </div>
  );
}