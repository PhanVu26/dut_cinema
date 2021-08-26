import { LocalDiningOutlined } from "@material-ui/icons";
import React, { Component } from "react";
import "./NavigationBarStyles.css";
import { Link, withRouter } from "react-router-dom";

class NavigationBar extends Component {
  constructor(props) {
    super(props);
  }

  logOut = () => {
    localStorage.setItem("account", JSON.stringify(""));
  };

  // render() {
  //   if (!localStorage.getItem("account")) {
  //     localStorage.setItem("account", JSON.stringify(""));
  //   }
  //   let account = JSON.parse(localStorage.getItem("account"));
  //   if (Object.keys(account).length === 0) {
  //     return <></>;
  //   } else {
  //     let role = account.role;
  //     if (role === "admin" || role === "showtime-manager") {
  //       return (
  //         <nav>
  //           <h5>DUTCinema</h5>
  //           <ul>
  //             <li>
  //               <span>{account.userName} | </span>
  //               <Link to="/" onClick={this.props.logOut}>
  //                 Log Out
  //               </Link>
  //             </li>
  //           </ul>
  //         </nav>
  //       );
  //     } else {
  //       return <></>;
  //     }
  //   }
  // }

  render() {
    return (
      <nav>
        <h5>DUTCinema</h5>
        <ul>
          <li>
            {/* <span>{account.userName} | </span> */}
            <Link to="/" onClick={this.props.logOut}>
              Log Out
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default NavigationBar;
