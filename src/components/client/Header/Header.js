import React, { Component } from "react";
import "./styles/Header.css";
import Logo from "../../../assets/images/DUTlogo.png";
import NavigationBar from "../NavigationBar/NavigationBar";
import SearchBox from "../SearchBox/SearchBox";
import Login from "./Login";
import Register from "./Register";
import { Link, withRouter } from "react-router-dom";
import history from "../../../commons/history";
import { compose } from "redux";
import { connect } from "react-redux";
// this is a header component to show the header and navigation to viewer
class Header extends Component {
  constructor(props) {
    super(props);
    // state openMenu and openSearch use to know when to show menu and search in mobile screen
    this.state = {
      openMenu: false,
      openSearch: false,
    };
  }

  // make a alert to customer to confirm that they want to log out
  onDelete = () => {
    let result = window.confirm("Bạn có muốn đăng xuất ?");
    if (result === true) {
      window.localStorage.removeItem("account");
    }
  };

  // toggle the Menu, if the Search is opened that close the search
  handleToggleMenu() {
    this.setState({
      openMenu: !this.state.openMenu,
    });
    if (this.state.openSearch) {
      this.setState({
        openSearch: !this.state.openSearch,
      });
    }
  }

  // toggle the Search, if the Menu is opened that close the menu
  handlerToggleSearch() {
    this.setState({
      openSearch: !this.state.openSearch,
    });
    if (this.state.openMenu) {
      this.setState({
        openMenu: !this.state.openMenu,
      });
    }
  }

  // keyCode equals 13 represented for Enter button
  handlerOnEnter = (e, keyword) => {
    if (e.keyCode === 13) {
      this.props.searchMovie(keyword);
      history.push("/search");
    }
  };

  render() {
    let showMenu = this.state.openMenu ? "showMenu" : "hideMenu";
    let showSearch = this.state.openSearch ? "showSearch" : "hideSearch";
    return (
      <div className="wrapper-header">
        <div className="container-fluid">
          <div className="container">
            <div className="wrap-header row d-flex align-items-center">
              <div className="col-4 col-md4 col-lg-3">
                <Link to="/">
                  <img className="imageLogo" src={Logo} alt="logo" />
                </Link>
              </div>
              <div className="col-8 col-md-8 col-lg-9 text-right text-secondary">
                <Decentralization
                  account={this.props}
                  onDelete={this.onDelete}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="skip-links">
          <span
            className="skip-links-item"
            onClick={this.handleToggleMenu.bind(this)}
          >
            <a href="#" className="linkItem">
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
            onClick={this.handlerToggleSearch.bind(this)}
          >
            <a href="#" className="linkItem skip-link skip-search">
              <span className="icon">
                <span>
                  <i className="fas fa-search"></i>
                </span>
              </span>
              <span className="label">Tìm kiếm</span>
            </a>
          </span>
        </div>
        <NavigationBar status={showMenu} />
        <SearchBox status={showSearch} handleOnEnter={this.handleOnEnter} />
      </div>
    );
  }
}

function Decentralization(props) {
  let { onDelete } = props;
  if (!localStorage.getItem("account")) {
    localStorage.setItem("account", JSON.stringify(""));
  }
  let account = JSON.parse(localStorage.getItem("account"));
  if (Object.keys(account).length === 0) {
    return (
      <div>
        <Login /> <span>/</span> <Register />
      </div>
    );
  } else if (Object.keys(account).length !== 0) {
    let role = account.role;
    if (role === "admin") {
      return (
        <div>
          <span>
            Admin:
            <Link to="/admin" className="mx-1">
              {account.userName}
            </Link>{" "}
            |{" "}
          </span>

          <Link to="/" onClick={() => onDelete()}>
            Thoát
          </Link>
        </div>
      );
    } else if (role === "movie-manager") {
      return (
        <div>
          <span>
            Quản lý phim:
            <Link to="/movie-manager" className="mx-1">
              {account.userName}
            </Link>{" "}
            |{" "}
          </span>

          <Link to="/" onClick={() => onDelete()}>
            Thoát
          </Link>
        </div>
      );
    } else if (role === "showtime-manager") {
      return (
        <div>
          <span>
            Quản lý lịch chiếu:
            <Link to="/showtime-manager" className="mx-1">
              {account.userName}
            </Link>{" "}
            |{" "}
          </span>

          <Link to="/" onClick={() => onDelete()}>
            Thoát
          </Link>
        </div>
      );
    } else {
      return (
        <div>
          <span>
            {" "}
            User:
            <Link to="/user-page" className="mx-1">
              {account.userName}
            </Link>{" "}
            |{" "}
          </span>

          <Link to="/" onClick={() => onDelete()}>
            Thoát
          </Link>
        </div>
      );
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchMovie: (keyword) => {
      // dispatch(actSearchMovie(keyword));
    },
  };
};

// const withConnect = connect(null, mapDispatchToProps);

// export default compose(withRouter, withConnect)(Header);
export default Header;
