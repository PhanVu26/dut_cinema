import React from "react";

import "../style.css";
const TopNavbar = (props) => {

    return(
        <div className="col-xl-10 col-lg-9 col-md-8 bg-dark ml-auto fixed-top py-2 top-navbar">
            <div className="row align-items-center">
                <div className="col-md-4">
                    <h4 className="text-light text-uppercase mb-0">DashBoard</h4>
                </div>
                <div className="col-md-5">
                    <form>
                        <div className="input-group">
                            <input type="text" className="form-control search-input" placeholder="Search.." />
                            <button type="button" className="btn btn-white search-button m-0 p-2"><i
                                className="fas fa-search text-danger"></i></button>
                        </div>
                    </form>
                </div>
                <div className="col-md-3">
                    <ul className="navbar-nav">
                        <li className="nav-item icon-parent">
                            <a href="#" className="nav-link"><i
                                className="fas fa-comments fa-lg text-muted icon-bullet"></i></a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link"><i
                                className="fas fa-bell text-muted fa-lg icon-bullet"></i></a>
                        </li>
                        <li className="nav-item ml-md-auto">
                            <a href="" data-toggle="modal" data-target="#sign-out" className="nav-link"><i
                                className="fas text-danger fa-sign-out-alt fa-lg text-muted"></i></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );    
};

export default TopNavbar;