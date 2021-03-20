import React, { Component } from "react";
import "./StyleNavigation.css";
import { Link } from "react-router-dom";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuExpand: "",
      isExpand: false,
    };
  }

  handleClickMenu = (menu) => {
    this.setState((prevState) => ({
      menuExpand: menu,
      isExpand:
        prevState.menuExpand === "" || prevState.menuExpand === menu
          ? !prevState.isExpand
          : true,
    }));
  };

  render() {
    const showMenu = this.props.style;
    const { menuExpand, isExpand } = this.state;
    const isExpand1 = "menu1" === menuExpand && isExpand ? true : false;
    const styleMenu1 = isExpand1 ? "show" : "";
    return (
      <div className={`${showMenu}`}>
        <nav className={` wrap-nav-c navbar navbar-expand-md navbar-dark`}>
          <div className="container-c container">
            <div
              className="nav collapse navbar-collapse show"
              id="navbarResponsive"
            >
              <ul className=" navbar-c navbar-nav">
                <li className="nav-item-c nav-item">
                  <Link
                    to="/buy-ticket"
                    className="nav-link-c text-uppercase nav-link"
                    href="about.html"
                  >
                    Mua vé
                  </Link>
                </li>

                <li
                  onClick={() => this.handleClickMenu("menu1")}
                  className={`nav-item-c nav-item dropdown ${styleMenu1}`}
                >
                  <span
                    className="nav-link-c text-uppercase nav-link dropdown-toggle center"
                    id="navbarDropdownPortfolio"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded={isExpand1}
                  >
                    Phim
                  </span>
                  <div
                    className={`dropdown-c dropdown-menu dropdown-menu-right ${styleMenu1}`}
                    aria-labelledby="navbarDropdownPortfolio"
                  >
                    <Link
                      to="/now-showing"
                      className="nav-link-sub text-uppercase dropdown-item"
                      href="portfolio-1-col.html"
                    >
                      Phim đang chiếu
                    </Link>
                    <Link
                      to="/coming-soon"
                      className="nav-link-sub text-uppercase dropdown-item"
                      href="portfolio-2-col.html"
                    >
                      Phim sắp chiếu
                    </Link>
                  </div>
                </li>
                <li className="nav-item-c nav-item">
                  <Link
                    to="/review-film"
                    className="nav-link-c text-uppercase nav-link"
                    href="portfolio-2-col.html"
                  >
                    bình luận phim
                  </Link>
                </li>

                <li className="nav-item-c nav-item">
                  <Link
                    to="/event"
                    className="nav-link-c text-uppercase nav-link"
                    href="services.html"
                  >
                    Ưu Đãi
                  </Link>
                </li>

                <li className="nav-item-c nav-item">
                  <Link
                    to="/theater-ticketprice"
                    className="nav-link-c text-uppercase nav-link"
                    href="contact.html"
                  >
                    Rạp/giá vé
                  </Link>
                </li>

                <li className="nav-item-c nav-item">
                  <Link
                    to="/support"
                    className="nav-link-c text-uppercase nav-link"
                    href="contact.html"
                  >
                    Hỗ trợ
                  </Link>
                </li>
                <Decentralization />
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

function Decentralization() {

  let account = JSON.parse(localStorage.getItem("account"));
  
  if (Object.keys(account).length === 0) {
    return <span></span>;
  } else if (Object.keys(account).length !== 0) {
    let role = account.role;
    if (role === "admin") {
      return (
        <li className="nav-item-c nav-item">
          <Link
            to="/admin-page/ManageUsers"
            className="nav-link-c text-uppercase nav-link"
            href="contact.html"
          >
            Admin
          </Link>
        </li>
      );
    } else {
      return (
        <li className="nav-item-c nav-item">
          <Link
            to="/user-page"
            className="nav-link-c text-uppercase nav-link"
            href="contact.html"
          >
            Thành viên
          </Link>
        </li>
      );
    }
  }
}

export default Navigation;
