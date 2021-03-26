import React, { Component } from "react";
import CarouselBanner from "./CarouselBanner";
import Movies from "./Movies";
class HomePage extends Component {
  render() {
    return (
      <div>
        <CarouselBanner />
        <Movies />
      </div>
    );
  }
}

export default HomePage;
