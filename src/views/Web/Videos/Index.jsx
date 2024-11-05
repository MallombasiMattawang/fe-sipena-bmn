import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

//import layout web
import LayoutWeb from "../../../layouts/Web";

//import service api
import Api from "../../../services/Api";

//import component alert
import AlertDataEmpty from "../../../components/general/AlertDataEmpty";

//import component loading
import Loading from "../../../components/general/Loading";

//import component card video
import CardVideo from "../../../components/general/CardVideo"; // Perbaiki jalur import jika diperlukan

//import pagination component
import Pagination from "../../../components/general/Pagination";

export default function WebVideosIndex() {
  //title page
  document.title = "Galeri Video";

  //init state
  const [videos, setVideos] = useState([]);
  const [loadingVideo, setLoadingVideo] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  //define state "pagination"
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    total: 0,
  });

  //fetch data videos
  const fetchDataVideos = async (pageNumber = 1) => {
    //setLoadingVideo "true"
    setLoadingVideo(true);

    //define variable "page"
    const page = pageNumber ? pageNumber : pagination.currentPage;

    try {
      const response = await Api.get(`/api/public/videos?page=${page}`);
      const data = response.data;

      // Pastikan data tidak undefined atau null
      if (data && data.data) {
        //assign response to state "videos"
        setVideos(data.data);

        //set data pagination to state "pagination"
        setPagination({
          currentPage: page,
          perPage: pagination.perPage,
          total: data.data.length,
        });
      } else {
        setVideos([]);
        setPagination({
          currentPage: 1,
          perPage: 10,
          total: 0,
        });
      }
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    } finally {
      //setLoadingVideo "false"
      setLoadingVideo(false);
    }
  };

  //hook useEffect
  useEffect(() => {
    //call method "fetchDataVideos"
    fetchDataVideos();
  }, []);

  const handleShow = (video) => {
    setCurrentVideo(video);
    setShowModal(true);
  };

  const handleClose = () => {
    setCurrentVideo(null);
    setShowModal(false);
  };

  return (
    <LayoutWeb>
      <div className="container mt-4 mb-3">
        <div className="row">
          <div className="col-md-12">
            <h5 className="text-uppercase">
              <i className="fa fa-video"></i> GALERI VIDEO
            </h5>
            <hr />
          </div>
        </div>
        <div className="row mt-4">
          {loadingVideo ? (
            <Loading />
          ) : videos.length > 0 ? (
            videos.map((video) => (
              <CardVideo
                key={video.id}
                image={video.image}
                caption={video.caption}
                onClick={() => handleShow(video)}
              />
            ))
          ) : (
            <AlertDataEmpty />
          )}
        </div>
        <Pagination
          currentPage={pagination.currentPage}
          perPage={pagination.perPage}
          total={pagination.total}
          onChange={(pageNumber) => fetchDataVideos(pageNumber)}
          position="center"
        />
      </div>
      
      {currentVideo && (
        <Modal show={showModal} onHide={handleClose} centered size="lg">
          
          <Modal.Body>
            <video width="100%" controls autoPlay>
              <source src={currentVideo.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </LayoutWeb>
  );
}
