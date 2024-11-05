import React, { useState, useEffect } from "react";

//import layout web
import LayoutWeb from "../../../layouts/Web";

//import service api
import Api from "../../../services/Api";

//import component alert
import AlertDataEmpty from "../../../components/general/AlertDataEmpty";

//import component loading
import Loading from "../../../components/general/Loading";

//import component card product
import CardProduct from "../../../components/general/CardProduct";

//import pagination component
import Pagination from "../../../components/general/pagination";

export default function WebProductsIndex() {
  //title page
  document.title = "Produk Desa - Desa Santri";

  //init state
  const [products, setProducts] = useState([]);
  const [loadingProduct, setLoadingProduct] = useState(true);

  //define state "pagination"
  const [pagination, setPagination] = useState({
    currentPage: 0,
    perPage: 0,
    total: 0,
  });

  //fetch data products
  const fetchDataProducts = async (pageNumber = 1) => {
    //setLoadingPhoto "true"
    setLoadingProduct(true);

    //define variable "page"
    const page = pageNumber ? pageNumber : pagination.currentPage;

    await Api.get(`/api/public/products?page=${page}`).then((response) => {
      //assign response to state "products"
      setProducts(response.data.data.data);

      //set data pagination to state "pagination"
      setPagination(() => ({
        currentPage: response.data.data.current_page,
        perPage: response.data.data.per_page,
        total: response.data.data.total,
      }));

      //setLoadingPhoto "false"
      setLoadingProduct(false);
    });
  };

  //hook useEffect
  useEffect(() => {
    //call method "fetchDataProducts"
    fetchDataProducts();
  }, []);

  return (
    <LayoutWeb>
      <div className="container mt-4 mb-3">
        <div classname="row">
          <div className="col-md-12">
            <h5 className="text-uppercase">
              <i className="fa fa-shopping-bag"></i> PRODUK DESA
            </h5>
            <hr />
          </div>
        </div>
        <div className="row mt-4">
          {loadingProduct ? (
            <Loading />
          ) : products.length > 0 ? (
            products.map((product) => (
              <CardProduct
                key={product.id}
                image={product.image}
                title={product.title}
                slug={product.slug}
                price={product.price}
                phone={product.phone}
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
          onChange={(pageNumber) => fetchDataProducts(pageNumber)}
          position="center"
        />
      </div>
    </LayoutWeb>
  );
}
