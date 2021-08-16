import React, { useEffect } from "react";
import { useDispatch } from 'react-redux'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';  
import 'bootstrap/dist/css/bootstrap.min.css';

import "../../components/admin/style.css";
import Footer from "../../components/admin/Footer/Footer";
import Modal from "../../components/admin/Modal/Modal";
import MainContent from "../../components/admin/MainContain/MainContent";
import Navbar from "../../components/admin/Navbar/Navbar";
import UserManagementPage from "./UserManagementPage";
import UserProfile from "../UserProfile/UserProfile";
import TransactionsPage from "./TransactionsPage";
import SaleChartPage from './SaleChartPage';
import CinemaManagement from './CinemaManagement';

import * as userActions from '../../actions/userManager/userAction'
import * as movieActions from '../../actions/movieManager/index'
import * as transactionActions from '../../actions/transactionAction/index'
import * as actions from '../../actions/index'
import * as cinemaAction from '../../actions/cinemaAction/index'
import * as genreAction from '../../actions/genreAction/index'
import * as ticketTypeAction from '../../actions/ticketTypeAction/index'

import RoomManagement from "./RoomManagement";
import MovieManager from "../manager/MovieManager";
import ActorManager from "../manager/ActorManager";
import EditShowTimePage from "../ShowTimeManager/EditShowTimePage/EditShowTimePage";
import SeatManagement from "./SeatManagement";
import GenreManagementPage from './GenreManagement';
import TicketTypeManagementPage from './TicketTypeManagement';
import UsersPage from './UsersPage';
import MoviesPage from '../manager/MovieManager/MoviesPage';
import GenresPage from './GenresPage';
import TicketTypesPage from './TicketTypesPage';


const AdminPage = (props) => {
    const dispatch = useDispatch()
    useEffect(() =>{
        const account = JSON.parse(localStorage.getItem("account"));
        if(account.roleName !== "Admin"){
            window.location.href = "/login";
        }
        dispatch(userActions.actFetchDataUsersRequest())
        dispatch(movieActions.actFetchDataMoviesRequest())
        dispatch(transactionActions.actFetchDataTransactionsRequest())
        dispatch(cinemaAction.actFetchDataCinemasRequest())
        dispatch(genreAction.actFetchDataGenresRequest())
        dispatch(ticketTypeAction.actFetchDataTicketTypesRequest())

    },[])
    return (

        <Router>
        <Navbar></Navbar>        
        <Switch>
            <Route path="/admin" exact component={MainContent}></Route>
            <Route path="/admin/users" exact component={UsersPage}></Route>  
            <Route path="/admin/genres" exact component={GenresPage}></Route> 
            <Route path="/admin/ticket-types" exact component={TicketTypesPage}></Route> 
            <Route path="/admin/sales" exact component={SaleChartPage}></Route>  
            <Route path="/admin/profile" exact component={UserProfile}></Route>  
            <Route path="/admin/transactions" exact component={TransactionsPage}></Route>  
            <Route path="/admin/cinemas" exact component={CinemaManagement}></Route>  
            <Route path="/admin/cinemas/*/rooms" exact component={RoomManagement}></Route>
            <Route path="/admin/rooms/*/seats" exact component={SeatManagement}></Route>  
            <Route path="/admin/movies" exact component={MoviesPage}></Route>  
            <Route path="/admin/actors" exact component={ActorManager}></Route>
            <Route path="/admin/movie-showtimes" exact component={EditShowTimePage}></Route>
        </Switch>
        <Footer></Footer>
        </Router>
            
    )
}

export default AdminPage;