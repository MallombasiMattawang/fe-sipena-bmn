import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

//import layout web
import LayoutWeb from "../../../layouts/Web";

//import component slider
import Slider from "../../../components/web/Slider";

//import service api
import Api from "../../../services/Api";

//import alert
import AlertDataEmpty from "../../../components/general/AlertDataEmpty";

//import Loading
import Loading from "../../../components/general/Loading";

//import card product
import CardProduct from "../../../components/general/CardProduct";

//import card post home
import CardPostHome from "../../../components/general/CardPostHome";
import CardPost from "../../../components/general/CardPost";

//import ModalPopup
import ModalPopup from "../../../components/general/ModalPopup";

export default function Home() {
  //title page
  document.title = "Selamat Datang di Events Otban5 Makassar";

  //init state products
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  //init state posts
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  //state for modal
  const [showModal, setShowModal] = useState(true);
  const [videoData, setVideoData] = useState(null);

  const handleCloseModal = () => setShowModal(false);

  //fetch data products
  // const fetchDataProducts = async () => {
  //   //setLoadingProducts "true"
  //   setLoadingProducts(true);

  //   //fetch data
  //   await Api.get("/api/public/products_home").then((response) => {
  //     //assign response to state "products"
  //     setProducts(response.data.data);

  //     //setLoadingProducts "false"
  //     setLoadingProducts(false);
  //   });
  // };

  //fetch data posts
  const fetchDataPosts = async () => {
    //setLoadingPosts "true"
    setLoadingPosts(true);

    //fetch data
    await Api.get("/api/public/posts_home").then((response) => {
      //assign response to state "posts"
      setPosts(response.data.data);

      //setLoadingPosts "false"
      setLoadingPosts(false);
    });
  };

  //fetch data videos
  const fetchDataVideo = async () => {
    try {
      const response = await Api.get("/api/public/videos");
      const video = response.data.data[0]; // Ambil video pertama
      setVideoData(video);
    } catch (error) {
      console.error("Failed to fetch video:", error);
    }
  };

  //hook useEffect
  useEffect(() => {
    //call method "fetchDataProducts"
    // fetchDataProducts();

    //call method "fetchDataPosts"
    fetchDataPosts();

    //call method "fetchDataVideo"
    fetchDataVideo();
  }, []);

  const handleModalEnter = () => {
    const videoElement = document.getElementById("videoPlayer");
    if (videoElement) {
      videoElement.play();
    }
  };

  return (
    <LayoutWeb>
      <Slider />

      {videoData ? (
        <ModalPopup show={showModal} handleClose={handleCloseModal} />
      ) : null}

      <div className="container mt-5 mb-4">
        <div className="row">
          <div className="col-md-12 mb-3">
            <div className="section-title">
              <h4>
                <i className="fa fa-book"></i>
                <strong style={{ color: "rgb(209 104 0)" }}> Informasi </strong>
                Event
              </h4>
            </div>
          </div>
          {loadingPosts ? (
            <Loading />
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <CardPost
                key={post.id}
                image={post.image}
                slug={post.slug}
                title={post.title}
                content={post.content}
                user={post.user.name}
                date={post.created_at}
              />
            ))
          ) : (
            <AlertDataEmpty />
          )}
        </div>
      </div>
    </LayoutWeb>
  );
}
