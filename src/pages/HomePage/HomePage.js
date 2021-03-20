import React from "react";
import "./HomePage.css";

import Header from "../../components/Header/Header";
import CarouselBanner from "./Carousel/CarouselBanner";
import Footer from "../../components/Footer/Footer"


class HomePage extends React.Component {
    render() {
        return (
            <div>
               <Header/>
               <CarouselBanner/>
               <Footer/>
            </div>
        )
    }
}
export default HomePage

