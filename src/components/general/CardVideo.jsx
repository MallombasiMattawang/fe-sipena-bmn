import React from "react";
import { FaPlayCircle } from "react-icons/fa"; // Import icon

export default function CardVideo({ image, caption, onClick }) {
  return (
    <div className="col-md-4 mb-4" onClick={onClick}>
      <div className="card border-0 shadow-sm rounded-3 text-center">
        <div className="card-body mt-2">
          <div className="image-wrapper" onClick={onClick}>
            <img src={image} className="w-100 rounded" alt="Video Thumbnail" />
            <FaPlayCircle className="play-icon" />
          </div>
          <hr />
          <h6>
            <i>{caption}</i>
          </h6>
        </div>
      </div>
    </div>
  );
}
