import React, { useState, useEffect } from "react";

//import layout web
import LayoutWeb from "../../../layouts/Web";

//import service api
import Api from "../../../services/Api";

//import component alert
import AlertDataEmpty from "../../../components/general/AlertDataEmpty";

//import component loading
import Loading from "../../../components/general/Loading";

//import component card photo
import CardPhoto from "../../../components/general/CardPhoto";

//import pagination component
import Pagination from "../../../components/general/pagination";

export default function WebPhotosIndex() {
  //title page
  document.title = "Galeri Foto";

  //init state
  const [photos, setPhotos] = useState([]);
  const [loadingPhoto, setLoadingPhoto] = useState(true);

  //define state "pagination"
  const [pagination, setPagination] = useState({
    currentPage: 0,
    perPage: 0,
    total: 0,
  });

  //fetch data photos
  const fetchDataPhotos = async (pageNumber = 1) => {
    //setLoadingPhoto "true"
    setLoadingPhoto(true);

    //define variable "page"
    const page = pageNumber ? pageNumber : pagination.currentPage;

    await Api.get(`/api/public/photos?page=${page}`).then((response) => {
      //assign response to state "photos"
      setPhotos(response.data.data.data);

      //set data pagination to state "pagination"
      setPagination(() => ({
        currentPage: response.data.data.current_page,
        perPage: response.data.data.per_page,
        total: response.data.data.total,
      }));

      //setLoadingPhoto "false"
      setLoadingPhoto(false);
    });
  };

  //hook useEffect
  useEffect(() => {
    //call method "fetchDataPhotos"
    fetchDataPhotos();
  }, []);

  return (
    <LayoutWeb>
      <div className="container mt-4 mb-3">
        <div classname="row">
          <div className="col-md-12">
            <h5 className="text-uppercase">
              <i className="fa fa-images"></i> GALERI FOTO
            </h5>
            <hr />
          </div>
        </div>
        <div className="row mt-4">
          {loadingPhoto ? (
            <Loading />
          ) : photos.length > 0 ? (
            photos.map((photo) => (
              <CardPhoto
                key={photo.id}
                image={photo.image}
                caption={photo.caption}
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
          onChange={(pageNumber) => fetchDataPhotos(pageNumber)}
          position="center"
        />
      </div>
    </LayoutWeb>
  );
}
