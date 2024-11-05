import React, { useState, useEffect } from "react";

//import layout web
import LayoutWeb from "../../../layouts/Web";

//import service api
import Api from "../../../services/Api";

//import component alert
import AlertDataEmpty from "../../../components/general/AlertDataEmpty";

//import component loading
import Loading from "../../../components/general/Loading";

//import component card post
import CardPost from "../../../components/general/CardPost";

//import pagination component
import Pagination from "../../../components/general/Pagination";

export default function WebPostsIndex() {
  //title page
  document.title = "Informasi Event";

  //init state
  const [posts, setPosts] = useState([]);
  const [loadingPost, setLoadingPost] = useState(true);

  //define state "pagination"
  const [pagination, setPagination] = useState({
    currentPage: 0,
    perPage: 0,
    total: 0,
  });

  //fetch data posts
  const fetchDataPosts = async (pageNumber = 1) => {
    //setLoadingPost "true"
    setLoadingPost(true);

    //define variable "page"
    const page = pageNumber ? pageNumber : pagination.currentPage;

    await Api.get(`/api/public/posts?page=${page}`).then((response) => {
      //assign response to state "posts"
      setPosts(response.data.data.data);

      //set data pagination to state "pagination"
      setPagination(() => ({
        currentPage: response.data.data.current_page,
        perPage: response.data.data.per_page,
        total: response.data.data.total,
      }));

      //setLoadingPost "false"
      setLoadingPost(false);
    });
  };

  //hook useEffect
  useEffect(() => {
    //call method "fetchDataPosts"
    fetchDataPosts();
  }, []);

  return (
    <LayoutWeb>
      <div className="container mt-4 mb-3">
        <div classname="row">
          <div className="col-md-12">
            <h5 className="text-uppercase">
              <i className="fa fa-book"></i> Informasi Event
            </h5>
            <hr />
          </div>
        </div>
        <div className="row mt-4">
          {loadingPost ? (
            <Loading />
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <CardPost
                key={post.id}
                image={post.image}
                slug={post.slug}
                title={post.title}
                content={post.content}
                date={post.created_at}
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
          onChange={(pageNumber) => fetchDataPosts(pageNumber)}
          position="center"
        />
      </div>
    </LayoutWeb>
  );
}
