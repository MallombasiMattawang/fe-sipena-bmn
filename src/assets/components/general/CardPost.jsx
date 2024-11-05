import React from "react";

//import DateID
import DateID from "../../utils/DateID";

//import link
import { Link } from "react-router-dom";

export default function CardPost(props) {
  return (
    <div className="col-md-4 mb-3" key={props.key}>
      <Link to={`/posts/${props.slug}`} className="text-decoration-none">
        <div class="card mb-3 w-100 rounded-3 border-0 shadow-sm">
          <img src={props.image} class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">
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
          </div>
          <div class="card-footer">
            <small class="text-body-secondary">
              <i className="fa fa-calendar"></i> {DateID(new Date(props.date))}
            </small>
          </div>
        </div>
      </Link>
    </div>
  );
}