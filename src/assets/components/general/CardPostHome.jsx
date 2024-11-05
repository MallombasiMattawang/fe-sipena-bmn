import React from "react";

//import link
import { Link } from "react-router-dom";

//import DateID
import DateID from "../../utils/DateID";

export default function CardPostHome(props) {
  return (
    <div className="col-md-6 mb-3" key={props.key}>
      <Link to={`/posts/${props.slug}`} className="text-decoration-none">
        <div class="card mb-3 w-100 rounded-3 border-0 shadow-sm">
          <div class="row g-0 mb-0 pb-0">
            <div class="col-md-4">
              <img
                src={props.image}
                class="img-fluid rounded h-100 w-100"
                style={{ objectFit: "cover" }}
                alt={props.title}
              />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">
                  {props.title.length > 50
                    ? `${props.title.substring(0, 50)}...`
                    : props.title}
                </h5>
                <hr />
                <div class="d-flex justify-content-between">
                  <div class="start-0">
                    <i className="fa fa-user"></i> {props.user}
                  </div>
                  <div class="end-0">
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