import React, { Component } from "react";
import Navigation from "../Navigation/Navigation";
import SearchBox from "../SearchBox/SearchBox";
import Login from "./Login";
import Register from "./Register";
import "./styleHeader.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

import Logo from "../../../assets/images/logo.png";


class Header extends Component {

  render() {
    return (
      <div className="wrapper-header">
        {/* Header banner */}
        <div className=" container-fluid">
          <div className="container">
            <div className="wrap-header row d-flex align-items-center">
              <div className="col-4 col-md-4 col-lg-3">
                <Link to="/">
                  <img className="imageLogo" src={Logo} alt="logo"></img>
                </Link>
              </div>
              <div className="col-8 col-md-8 col-lg-9 text-right text-secondary">
              </div>
            </div>
          </div>
        </div>

        {/* menu mobile */}
        <div className={`skip-links`}>
          <span
            className="skip-links-item"
          >
            <a href="/#" className="linkItem">
              <span className="icon">
                <span>
                  <i className="fas fa-bars"></i>
                </span>
              </span>
              <span className="label">Menu</span>
            </a>
          </span>
          <span
            className="skip-links-item"
          >
            <a href="/#" className=" linkItem skip-link skip-search">
              <span className="icon">
                <span>
                  <i className="fas fa-search"></i>
                </span>
              </span>
              <span className="label">Tìm kiếm</span>
            </a>
          </span>
        </div>

        {/* Navigation */}
        <Navigation />

        {/* Search */}
        <SearchBox
        />
      </div>
    );
  }
}

export default Header;
