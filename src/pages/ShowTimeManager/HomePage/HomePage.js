import React, { Component } from "react";
import NavigationBar from "../../../components/ShowtimeManager/NavigationBar/NavigationBar";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

class HomePage extends Component {
  // render() {
  //   if (!localStorage.getItem("account")) {
  //     localStorage.setItem("account", JSON.stringify(""));
  //   }
  //   let account = JSON.parse(localStorage.getItem("account"));
  //   if (Object.keys(account).length === 0) {
  //     return <NotFoundPage />;
  //   } else {
  //     let role = account.role;
  //     if (role === "admin" || role === "showtime-manager") {
  //       return <NavigationBar />;
  //     } else {
  //       return <NotFoundPage />;
  //     }
  //   }
  // }
  render() {
    return <NavigationBar />;
  }
}

export default HomePage;
