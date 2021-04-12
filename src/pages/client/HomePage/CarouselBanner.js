import React from "react";
import "./styles/CarouselBannerStyles.css";
import Carousel from "react-bootstrap/Carousel";

const CarouselBanner = () => {
  let Banner = {
    opacity: "1",
  };
  return (
    <div className="carousel" style={Banner}>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.galaxycine.vn/media/2021/4/9/banner-2048x682_1617961579181.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.galaxycine.vn/media/2021/4/12/banner-2048x682_1618212848326.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.galaxycine.vn/media/2021/4/9/2048-x-682_1617958002178.jpg"
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.galaxycine.vn/media/2021/4/9/2048x682_1617958416956.jpg"
            alt="Fourth slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.galaxycine.vn/media/2021/4/7/2048x682_1617781870335.jpg"
            alt="Fifth slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.galaxycine.vn/media/2021/4/7/2048x682_1617782109260.jpg"
            alt="Sixth slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default CarouselBanner;
