import React, { Component } from "react";
import "./styles/NavigationBarStyles.css";
import { Link } from "react-router-dom";

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FilmMenuShow: "",
      isFilmMenuShow: false,
      CinemaBlogShow: "",
      isCinemaBlogShow: false,
      EventShow: "",
      isEventShow: false,
    };
  }

  handleClickFilmMenu = (menu) => {
    this.setState((prev) => {
      return {
        FilmMenuShow: menu,
        isFilmMenuShow:
          prev.FilmMenuShow === "" || prev.FilmMenuShow === menu
            ? !prev.isFilmMenuShow
            : true,
      };
    });
  };

  handleClickCinemaBlog = (menu) => {
    this.setState((prev) => {
      return {
        CinemaBlogShow: menu,
        isCinemaBlogShow:
          prev.CinemaBlogShow === "" || prev.CinemaBlogShow === menu
            ? !prev.isCinemaBlogShow
            : true,
      };
    });
  };

  handleClickEvent = (menu) => {
    this.setState((prev) => {
      return {
        EventShow: menu,
        isEventShow:
          prev.EventShow === "" || prev.EventShow === menu
            ? !prev.isEventShow
            : true,
      };
    });
  };

  render() {
    const { FilmMenuShow, isFilmMenuShow } = this.state;
    const { CinemaBlogShow, isCinemaBlogShow } = this.state;
    const { EventShow, isEventShow } = this.state;
    const isExpandFilmMenu =
      "menu1" === FilmMenuShow && isFilmMenuShow ? true : false;
    const styleFilmMenu = isExpandFilmMenu ? "show" : "";

    const isExpandCinemaBlog =
      "menu2" === CinemaBlogShow && isCinemaBlogShow ? true : false;
    const styleCinemaBlog = isCinemaBlogShow ? "show" : "";

    const isExpandEvent = "menu3" === EventShow && isEventShow ? true : false;
    const styleEvent = isEventShow ? "show" : "";
    return (
      <div className={`${this.props.status}`}>
        <nav className="wrap-nav-c navbar navbar-expand-md navbar-dark">
          <div className="container-c container">
            <div
              className="nav collapse navbar-collapse show"
              id="navbarResponsive"
              name="navbarResponsive"
            >
              <ul className="navbar-c navbar-nav">
                <li className="nav-item-c nav-item">
                  <div className="nav-link-c text-uppercase nav-link">
                    Mua vé
                  </div>
                </li>
                <li
                  className={`nav-item-c nav-item dropdown ${styleFilmMenu}`}
                  onClick={() => this.handleClickFilmMenu("menu1")}
                >
                  <span
                    className="nav-link-c text-uppercase nav-link dropdown-toggle"
                    id="navbarDropdown"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded={isExpandFilmMenu}
                  >
                    Phim
                  </span>
                  <div
                    className={`dropdown-menu-right dropdown-menu dropdown-c ${styleFilmMenu}`}
                    aria-labelledby="navbarDropdown"
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
                <li
                  className={`nav-item-c nav-item dropdown ${styleCinemaBlog}`}
                  onClick={() => this.handleClickCinemaBlog("menu2")}
                >
                  <span
                    className="nav-link-c text-uppercase nav-link dropdown-toggle"
                    id="navbarDropdownCinemaBlog"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded={isExpandCinemaBlog}
                  >
                    Góc điện ảnh
                  </span>
                  <div
                    className={`dropdown-menu-right dropdown-menu dropdown-c ${styleCinemaBlog}`}
                    aria-labelledby="navbarDropdownCinemaBlog"
                  >
                    <div className="nav-link-sub text-uppercase dropdown-item">
                      Thể loại phim
                    </div>
                    <div className="nav-link-sub text-uppercase dropdown-item">
                      Diễn viên
                    </div>
                    <div className="nav-link-sub text-uppercase dropdown-item">
                      Đạo diễn
                    </div>
                    <div className="nav-link-sub text-uppercase dropdown-item">
                      Bình luận phim
                    </div>
                    <div className="nav-link-sub text-uppercase dropdown-item">
                      Blog điện ảnh
                    </div>
                  </div>
                </li>
                <li
                  className={`nav-item-c nav-item dropdown ${styleEvent}`}
                  onClick={() => this.handleClickEvent("menu3")}
                >
                  <span
                    className="nav-link-c text-uppercase nav-link dropdown-toggle"
                    id="navbarDropdownEvent"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded={isExpandEvent}
                  >
                    Sự kiện
                  </span>
                  <div
                    className={`dropdown-menu-right dropdown-menu dropdown-c ${styleEvent}`}
                    aria-labelledby="navbarDropdownEvent"
                  >
                    <div className="nav-link-sub text-uppercase dropdown-item">
                      Ưu đãi
                    </div>
                    <div className="nav-link-sub text-uppercase dropdown-item">
                      Phim hay tháng
                    </div>
                  </div>
                </li>
                <li className="nav-item-c nav-item">
                  <div className="nav-link-c text-uppercase nav-link">
                    Rạp/giá vé
                  </div>
                </li>
                <li className="nav-item-c nav-item">
                  <div className="nav-link-c text-uppercase nav-link">
                    Hỗ trợ
                  </div>
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
            to="/admin"
            className="nav-link-c text-uppercase nav-link"
            href="contact.html"
          >
            Admin
          </Link>
        </li>
      );
    } else if (role === "movie-manager") {
      return (
        <li className="nav-item-c nav-item">
          <Link
            to="/movie-manager"
            className="nav-link-c text-uppercase nav-link"
            href="contact.html"
          >
            Quản lý phim
          </Link>
        </li>
      );
    } else if (role === "showtime-manager") {
      return (
        <li className="nav-item-c nav-item">
          <Link
            to="/showtime-manager"
            className="nav-link-c text-uppercase nav-link"
            href="contact.html"
          >
            Quản lý lịch chiếu
          </Link>
        </li>
      );
    } else {
      return (
        <li className="nav-item-c nav-item">
          <Link
            to="/profile"
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

export default NavigationBar;
