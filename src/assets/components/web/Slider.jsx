import { useState, useEffect } from "react";

//import api service
import Api from "../../services/Api";

//import component carousel
import { Carousel } from "react-bootstrap";

//import component loading
import Loading from "../general/Loading";

export default function Slider() {
  //init state
  const [sliders, setSliders] = useState([]);
  const [loadingSlider, setLoadingSlider] = useState(true);

  //fetch data
  const fetchDataSliders = async () => {
    //setLoadingSlider "true"
    setLoadingSlider(true);

    await Api.get("/api/public/sliders").then((response) => {
      //assign response to state "sliders"
      setSliders(response.data.data);

      //setLoadingSlider "false"
      setLoadingSlider(false);
    });
  };

  //use effect
  useEffect(() => {
    //call method "fetchDataSliders"
    fetchDataSliders();
  }, []);

  return (
    <Carousel
      prevIcon={
        <i className="fa fa-chevron-left fa-lg carousel-custom text-dark shadow-sm"></i>
      }
      nextIcon={
        <i className="fa fa-chevron-right fa-lg carousel-custom text-dark shadow-sm"></i>
      }
    >
      {loadingSlider ? (
        <Loading />
      ) : (
        sliders.map((slider) => (
          <Carousel.Item key={slider.id}>
            <img
              className="d-block w-100"
              src={slider.image}
              style={{ height: "500px", objectFit: "cover" }}
              alt="First slide"
            />
          </Carousel.Item>
        ))
      )}
    </Carousel>
  );
}