import React from "react";

import "../style.css";
const TopNavbar = (props) => {
    const logout = () => {
        let result = window.confirm("Bạn có muốn đăng xuất ?");
        if (result === true) {
            window.localStorage.removeItem("account");
            window.location.href = "/login";
        }
    }
    return(
        <div className="col-xl-10 col-lg-9 col-md-8 bg-dark ml-auto fixed-top py-2 top-navbar">
            <div className="row align-items-center">
                <div className="col-md-4">
                    
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
                        <li className="nav-item ml-md-auto">
                            <a onClick= {logout} data-toggle="modal" data-target="#sign-out" className="nav-link"><i
                                className="fas text-danger fa-sign-out-alt fa-lg text-muted"></i></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );    
};

export default TopNavbar;