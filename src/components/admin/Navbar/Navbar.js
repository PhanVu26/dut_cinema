import React, { useEffect, useState } from "react";
import { generatePath, useLocation } from 'react-router-dom'

import SlideBar from "../SlideBar/SlideBar"
import TopNavbar from "../TopNavbar/TopNavbar"
import * as menus from './Menus'

function Navbar() {
    const [listMenus, setListMenus] = useState([]);
    const [pathName, setPathName] = useState("");
    const location = useLocation();
    const movie_manager_menus = menus.movie_manager_menus;
    const showtime_menus = menus.showtime_menus;
    const admin_menus = menus.admin_menus;

    const setMenus = (pathName) => {
        if(pathName.includes("/admin")){
            setListMenus(admin_menus)
        }else if(pathName.includes("/manager")){
            setListMenus(movie_manager_menus)
        }else {
            setListMenus(showtime_menus)
        }
        
    }
    useEffect(() => {
        let pathName = location.pathname;
        setPathName(pathName)
        setMenus(pathName);
    }, [])
    return (
            <nav className="navbar navbar-expand-md navbar-light">
                <button className="navbar-toggler ml-auto mb-2 bg-light" data-toggle="collapse" data-target="#myNavbar"><span
                    className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="myNavbar">
                    <SlideBar pathname = {pathName} menus = {listMenus}></SlideBar>
                    <TopNavbar></TopNavbar>
                </div>
            </nav>      
    );
};    

export default Navbar;
