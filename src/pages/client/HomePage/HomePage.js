import React, { Component } from "react";
import CarouselBanner from "./CarouselBanner";
import Movies from "./Movies";
import Promotion from "./Promotion/Promotion";
class HomePage extends Component {
  render() {
    return (
      <div>
        <CarouselBanner />
        <Movies />
        <Promotion />
      </div>
    );
  }
}

export default HomePage;
