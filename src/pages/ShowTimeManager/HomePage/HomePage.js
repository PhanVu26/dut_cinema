import React, { Component, useEffect } from "react";
import NavigationBar from "../../../components/ShowtimeManager/NavigationBar/NavigationBar";
import ListMovies from "../../../components/ShowtimeManager/ListMovies/ListMovies";
import EditShowTimePage from "../EditShowTimePage/EditShowTimePage";
import { connect } from "react-redux";
//import { actSearchMovie } from "../../actions/action";
import { Link, BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { actFetchCinemaRequest } from "../../../actions/showtimeManager/index";
import { useDispatch, useSelector } from "react-redux";
import UserProfile from "../../UserProfile/UserProfile";
import Navbar from "../../../components/admin/Navbar/Navbar";
import Footer from "../../../components/admin/Footer/Footer";
import NotFoundPage from "../../../pages/error/404/NotFoundPage";
import ListShowTimePage from "../EditShowTimePage/ListShowTimePage";
import ShowtimePage from "../EditShowTimePage/ShowtimePage";

function HomePage(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actFetchCinemaRequest());
  }, []);
  const account = JSON.parse(localStorage.getItem("account"));
  if(account.roleName !== "Theater Manager"){
      window.location.href = "/403";
  }
  return (
    // <>
    //   <NavigationBar />;
    //   <EditShowTimePage />;
    // </>
    <Router>
      <Navbar></Navbar>
      <Switch>
        <Route path="/showtime-manager" exact component={UserProfile}></Route>
        <Route
          path="/showtime-manager/movie-showtimes"
          exact
          component={ShowtimePage}
        ></Route>
        <Route
          path="/showtime-manager/movie-showtimes/add"
          exact
          component={EditShowTimePage}
        ></Route>
        <Route
          path="/showtime-manager/profile"
          exact
          component={UserProfile}
        ></Route>
        <Route path='/showtime-manager/404' component={NotFoundPage} />
        <Redirect from='*' to='/showtime-manager/404' />
        <Route path='*' exact={true} component={NotFoundPage} />
      </Switch>
      <Footer></Footer>
    </Router>
  );
}


export default HomePage;
