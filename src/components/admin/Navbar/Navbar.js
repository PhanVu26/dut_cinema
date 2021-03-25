import React from "react";

import SlideBar from "../SlideBar/SlideBar"
import TopNavbar from "../TopNavbar/TopNavbar"

const Navbar  = (props) => {
    return (
            <nav class="navbar navbar-expand-md navbar-light">
                <button class="navbar-toggler ml-auto mb-2 bg-light" data-toggle="collapse" data-target="#myNavbar"><span
                    class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="myNavbar">
                    <SlideBar></SlideBar>
                    <TopNavbar></TopNavbar>
                </div>
            </nav>      
    );
};    

export default Navbar;
