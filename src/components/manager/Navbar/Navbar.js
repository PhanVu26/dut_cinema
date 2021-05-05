import React from "react";

import SlideBar from "../SlideBar/SlideBar"
import TopNavbar from "../TopNavbar/TopNavbar"

const Navbar  = (props) => {
    return (
            <nav className="navbar navbar-expand-md navbar-light">
                <button className="navbar-toggler ml-auto mb-2 bg-light" data-toggle="collapse" data-target="#myNavbar"><span
                    className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="myNavbar">
                    <SlideBar></SlideBar>
                    <TopNavbar></TopNavbar>
                </div>
            </nav>      
    );
};    

export default Navbar;
