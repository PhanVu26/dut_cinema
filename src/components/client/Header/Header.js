import React, { Component } from "react";
import "./styles/Header.css";
import Logo from "../../../assets/images/logo.png";
import NavigationBar from "../NavigationBar/NavigationBar";
import SearchBox from "../SearchBox/SearchBox";
import Login from "./Login";
import Register from "./Register";
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
                <img className="imageLogo" src={Logo} alt="logo" />
              </div>
              <div className="col-8 col-md-8 col-lg-9 text-right text-secondary">
                <Login /> <span>/</span> <Register />
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
        <SearchBox status={showSearch} />
      </div>
    );
  }
}

export default Header;
