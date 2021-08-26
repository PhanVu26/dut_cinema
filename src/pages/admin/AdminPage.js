import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

import "../../components/admin/style.css";
import Footer from "../../components/admin/Footer/Footer";
import MainContent from "../../components/admin/MainContain/MainContent";
import Navbar from "../../components/admin/Navbar/Navbar";
import UserProfile from "../UserProfile/UserProfile";
import TransactionsPage from "./TransactionsPage";
import SaleChartPage from "./SaleChartPage";

import * as userActions from "../../actions/userManager/userAction";
import * as movieActions from "../../actions/movieManager/index";
import * as transactionActions from "../../actions/transactionAction/index";
import * as cinemaAction from "../../actions/cinemaAction/index";
import * as genreAction from "../../actions/genreAction/index";
import * as ticketTypeAction from "../../actions/ticketTypeAction/index";
import * as analysisAction from "../../actions/analysisAction/index";

import EditShowTimePage from "../ShowTimeManager/EditShowTimePage/EditShowTimePage";
import UsersPage from "./UsersPage";
import MoviesPage from "../manager/MovieManager/MoviesPage";
import GenresPage from "./GenresPage";
import TicketTypesPage from "./TicketTypesPage";
import ActorsPage from "../manager/ActorManager/ActorsPage";
import CinemasPage from "./CinemasPage";
import RoomsPage from "./RoomsPage";
import SeatsPage from "./SeatsPage";
import NotFoundPage from "../error/404/NotFoundPage";
import UnauthPage from "../error/unauth/UnauthPage";
import ShowtimePage from "../ShowTimeManager/EditShowTimePage/ShowtimePage";

const AdminPage = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const account = JSON.parse(localStorage.getItem("account"));
    if (account.roleName !== "Admin") {
      window.location.href = "/403";
    }
    dispatch(userActions.actFetchDataUsersRequest());
    dispatch(movieActions.actFetchDataMoviesRequest());
    dispatch(transactionActions.actFetchDataTransactionsRequest());
    dispatch(cinemaAction.actFetchDataCinemasRequest());
    dispatch(genreAction.actFetchDataGenresRequest());
    dispatch(ticketTypeAction.actFetchDataTicketTypesRequest());
    dispatch(analysisAction.actFetchDataSaleAnalysisRequest(""));
  }, []);
  return (
    <Router>
      <Navbar></Navbar>
      <Switch>
        <Route path="/admin" exact component={MainContent}></Route>
        <Route path="/admin/users" exact component={UsersPage}></Route>
        <Route path="/admin/genres" exact component={GenresPage}></Route>
        <Route
          path="/admin/ticket-types"
          exact
          component={TicketTypesPage}
        ></Route>
        <Route path="/admin/sales" exact component={SaleChartPage}></Route>
        <Route path="/admin/profile" exact component={UserProfile}></Route>
        <Route
          path="/admin/transactions"
          exact
          component={TransactionsPage}
        ></Route>
        <Route path="/admin/cinemas" exact component={CinemasPage}></Route>
        <Route
          path="/admin/cinemas/*/rooms"
          exact
          component={RoomsPage}
        ></Route>
        <Route path="/admin/rooms/*/seats" exact component={SeatsPage}></Route>
        <Route path="/admin/movies" exact component={MoviesPage}></Route>
        <Route path="/admin/actors" exact component={ActorsPage}></Route>
        <Route
          path="/admin/movie-showtimes"
          exact
          component={ShowtimePage}
        ></Route>
        <Route
          path="/admin/movie-showtimes/add"
          exact
          component={EditShowTimePage}
        ></Route>
        <Route path="/admin/404" component={NotFoundPage} />
        <Redirect from="*" to="/admin/404" />
        <Route path="*" exact={true} component={NotFoundPage} />
      </Switch>
      <Footer></Footer>
    </Router>
  );
};

export default AdminPage;
