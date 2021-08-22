import React,{useState } from "react"
import { NavLink, useLocation } from "react-router-dom";

const SlideBar = (props) => {
    const location = useLocation();
    const menus = props.menus;
    const [active, setActive] = useState(location.pathname);
    const showMenu = (menus) => {       
        const results = menus.map((item, index) => {
            return (
                <li className="nav-item " key = {index}>
                    <NavLink 
                        to= {item.url}
                        onClick={() => {setActive(item.url)}}
                        className={`nav-link text-white p-2 mb-2 ${active === item.url ? " current" : ""} `} >
                        <i className={"fas " + item.icon + " fas fa-lg mr-3 text-white"}></i>{item.label}
                    </NavLink>
                </li>
            )
        })
        return results;
    }
    const account = JSON.parse(localStorage.getItem("account"));
    return (          
        <div className="col-xl-2 col-lg-3 col-md-4 sidebar fixed-top sidebar-side">
            <a href="#" className="navbar-brand text-white mx-auto text-center bottom-border py-3 mb-4 d-block">DUT Cinema</a>
            <div className="text-center">
                <a href="" className="text-white">{account.user.name}</a>
            </div>
            <ul className="navbar-nav mt-4 flex-column ">
                <li className="nav-item ">
                    <NavLink 
                        to= {"/" + props.pathname.split('/')[1]} 
                        onClick={() => {setActive("")}}
                        className={`nav-link text-white p-2 mb-2 ${active === "" ? "current":""}`}>
                            <i className="fas fa-home fa-lg mr-3 text-white"></i>DashBoard</NavLink>
                </li>
                {showMenu(menus)}
            </ul>
        </div>
                        
    )
}

export default SlideBar;