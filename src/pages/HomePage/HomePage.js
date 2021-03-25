import React from "react";
import "./HomePage.css";

import Header from "../../components/client/Header/Header";
import CarouselBanner from "./Carousel/CarouselBanner";
import Footer from "../../components/client/Footer/Footer"


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

