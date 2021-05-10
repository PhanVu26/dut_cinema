import React, { Component, useEffect } from "react";
import NavigationBar from "../../../components/ShowtimeManager/NavigationBar/NavigationBar";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import ListMovies from "../../../components/ShowtimeManager/ListMovies/ListMovies";
import EditShowTimePage from "../EditShowTimePage/EditShowTimePage";
import { connect } from "react-redux";
//import { actSearchMovie } from "../../actions/action";
import { Link, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { actFetchCinemaRequest } from "../../../actions/showtimeManager/index";
import { useDispatch, useSelector } from "react-redux";
import UserProfile from "../../UserProfile/UserProfile";
import Footer from "../../../components/ShowtimeManager/Footer/Footer";
import Navbar from "../../../components/ShowtimeManager/Navbar/Navbar";

function HomePage(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actFetchCinemaRequest());
  });

  return (
    // <>
    //   <NavigationBar />;
    //   <EditShowTimePage />;
    // </>
    <Router>
    <Navbar></Navbar>        
    <Switch>
        <Route path="/showtime-manager/movie-showtimes" component={EditShowTimePage}></Route>  
        <Route path="/showtime-manager/profile" component={UserProfile}></Route>  
    </Switch>
    <Footer></Footer>
    </Router>
  );

}

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

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onFetchDataCinema: () => {
//       dispatch(actFetchCinemaRequest());
//     },
//   };
// };

// const withConnect = connect(null, mapDispatchToProps);

// export default compose(withRouter, withConnect)(HomePage);

export default HomePage;
