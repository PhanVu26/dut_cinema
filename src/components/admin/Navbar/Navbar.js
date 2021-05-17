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
        switch(pathName){
            case "/admin": {
                setListMenus(admin_menus)
                break;
            }
            case "/manager": {
                setListMenus(movie_manager_menus);
                break;
            }
            case "/showtime-manager": {
                setListMenus(showtime_menus);
                break;
            }
            default: setListMenus([]);
                break
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
                    <SlideBar menus = {listMenus}></SlideBar>
                    <TopNavbar></TopNavbar>
                </div>
            </nav>      
    );
};    

export default Navbar;
