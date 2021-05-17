import React from "react"
import { NavLink } from "react-router-dom";

const SlideBar = (props) => {
    const menus = props.menus;
    const showMenu = (menus) => {       
        const results = menus.map((item, index) => {
            return (
                <li className="nav-item " key = {index}>
                    <NavLink to= {item.url} className="nav-link text-white p-2 mb-2">
                        <i className={"fas " + item.icon + " fas fa-lg mr-3 text-white"}></i>{item.label}</NavLink>
                </li>
            )
        })
        return results;
    }
    const account = JSON.parse(localStorage.getItem("account"));
    console.log("account", account)
    return (          
        <div className="col-xl-2 col-lg-3 col-md-4 sidebar fixed-top sidebar-side">
            <a href="#" className="navbar-brand text-white mx-auto text-center bottom-border py-3 mb-4 d-block">{account.role}</a>
            <div className="bottom-border text-center">
                <img src="https://images.pexels.com/photos/532220/pexels-photo-532220.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=640"
                    width="50" className="rounded-circle" alt="" />
                <a href="" className="text-white">{account.name}</a>
            </div>
            <ul className="navbar-nav mt-4 flex-column ">
                <li className="nav-item ">
                    <NavLink to= "/admin" className="nav-link text-white p-2 mb-2 current"><i
                        className="fas fa-home fa-lg mr-3 text-white"></i>DashBoard</NavLink>
                </li>
                {showMenu(menus)}
            </ul>
        </div>
                        
    )
}

export default SlideBar;