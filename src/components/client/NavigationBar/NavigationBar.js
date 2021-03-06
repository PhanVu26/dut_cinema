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
                  <Link
                    to="/buy-ticket"
                    className="nav-link-c text-uppercase nav-link"
                    href="about.html"
                  >
                    Mua v??
                  </Link>
                </li>
                <li
                  className={`nav-item-c nav-item dropdown ${styleFilmMenu}`}
                  onClick={() => this.handleClickFilmMenu("menu1")}
                >
                  <span
                    className="nav-link-c text-uppercase nav-link dropdown-toggle center"
                    id="navbarDropdown"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded={isExpandFilmMenu}
                  >
                    Phim
                  </span>
                  <div
                    className={`dropdown-c dropdown-menu dropdown-menu-right ${styleFilmMenu}`}
                    aria-labelledby="navbarDropdownPortfolio"
                  >
                    <Link
                      to="/now-showing"
                      className="nav-link-sub text-uppercase dropdown-item"
                      href="portfolio-1-col.html"
                    >
                      Phim ??ang chi???u
                    </Link>
                    <Link
                      to="/coming-soon"
                      className="nav-link-sub text-uppercase dropdown-item"
                      href="portfolio-2-col.html"
                    >
                      Phim s???p chi???u
                    </Link>
                  </div>
                </li>
                <li
                  className={`nav-item-c nav-item dropdown ${styleCinemaBlog}`}
                  onClick={() => this.handleClickCinemaBlog("menu2")}
                >
                  <span
                    className="nav-link-c text-uppercase nav-link dropdown-toggle center"
                    id="navbarDropdownCinemaBlog"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded={isExpandCinemaBlog}
                  >
                    G??c ??i???n ???nh
                  </span>
                  <div
                    className={`dropdown-c dropdown-menu dropdown-menu-right ${styleCinemaBlog}`}
                    aria-labelledby="navbarDropdownCinemaBlog"
                  >
                    <div className="nav-link-sub text-uppercase dropdown-item">
                      Th??? lo???i phim
                    </div>
                    <div className="nav-link-sub text-uppercase dropdown-item">
                      Di???n vi??n
                    </div>
                    <div className="nav-link-sub text-uppercase dropdown-item">
                      ?????o di???n
                    </div>
                    <div className="nav-link-sub text-uppercase dropdown-item">
                      B??nh lu???n phim
                    </div>
                    <div className="nav-link-sub text-uppercase dropdown-item">
                      Blog ??i???n ???nh
                    </div>
                  </div>
                </li>
                <li className="nav-item-c nav-item">
                  <Link
                    to="/promotion"
                    className="nav-link-c text-uppercase nav-link"
                    href="portfolio-1-col.html"
                  >
                    ??u ????i
                  </Link>
                </li>
                <li className="nav-item-c nav-item">
                <Link
                    to="/"
                    className="nav-link-c text-uppercase nav-link"
                    href="portfolio-1-col.html"
                  >
                    R???p/Gi?? v??
                  </Link>
                </li>
                <li className="nav-item-c nav-item">
                  <Link
                    to="/"
                    className="nav-link-c text-uppercase nav-link"
                    href="portfolio-1-col.html"
                  >
                    H??? tr???
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
            Qu???n l?? phim
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
            Qu???n l?? l???ch chi???u
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
            Th??nh vi??n
          </Link>
        </li>
      );
    }
  }
}

export default NavigationBar;
