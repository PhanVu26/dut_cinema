import React, { Component } from "react";
import Navigation from "../Navigation/Navigation";
import SearchBox from "../SearchBox/SearchBox";
import Login from "./Login";
import Register from "./Register";
import "./styleHeader.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { actLoginAccountRequest } from "../../../actions/index";
import Logo from "../../../assets/images/logo.png";
import axios from "axios";
class Header extends Component {
  render() {
    if (!localStorage.getItem("account")) {
      localStorage.setItem("account", JSON.stringify(""));
    }
    let account = JSON.parse(localStorage.getItem("account"));
    if (Object.keys(account).length === 0) {
      console.log("123312313");
      let account = {
        email: "admin@gmail.com",
        password: "123456789",
      };
      actLoginAccountRequest(account).then((res) => {
        let dataAccount = res.data;
        console.log("dataAccount: ", dataAccount);
        if (res.status < 200 || res.status > 299) {
          alert("Sign in unsuccessful");
        } else {
          if (Object.keys(dataAccount).length !== 0) {
            localStorage.setItem("account", JSON.stringify(dataAccount));
          }

          // alert("Logged in successfully");
          // this.setState({ show: false });
          // window.location.reload();
        }
      });
    }
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
              <div className="col-8 col-md-8 col-lg-9 text-right text-secondary"></div>
            </div>
          </div>
        </div>

        {/* menu mobile */}
        <div className={`skip-links`}>
          <span className="skip-links-item">
            <a href="/#" className="linkItem">
              <span className="icon">
                <span>
                  <i className="fas fa-bars"></i>
                </span>
              </span>
              <span className="label">Menu</span>
            </a>
          </span>
          <span className="skip-links-item">
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
        <SearchBox />
      </div>
    );
  }
}

export default Header;
