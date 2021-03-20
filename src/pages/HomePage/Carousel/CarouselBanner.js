import React from "react";
import Carousel from "react-bootstrap/Carousel";
import './CarouselStyle.css'

function CarouselBanner() {
    let Banner = {
      opacity: "1",
    }
    return (
      <div className="carousel" style= {Banner}>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://www.galaxycine.vn/media/2020/11/2/banner-2048x682_1604305881849.jpg"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://www.galaxycine.vn/media/2020/2/28/n3-ss-2048x682_1582863674634.jpg"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://www.galaxycine.vn/media/2020/2/28/2048x682_1582860213657.jpg"
              alt="Third slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://www.galaxycine.vn/media/2020/10/23/banner-2048x682_1603448463402.jpg"
              alt="Fourth slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://www.galaxycine.vn/media/2020/10/22/2048x682px1_1603373831290.png"
              alt="Fifth slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://www.galaxycine.vn/media/2020/11/10/2048x682_1605002076002.jpg"
              alt="Fifth slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }
export default CarouselBanner;
