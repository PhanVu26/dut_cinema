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
import TransactionPage from "./TransactionPage";
import SaleChartPage from './SaleChartPage';
import CinemaManagement from './CinemaManagement';

import * as userActions from '../../actions/userManager/userAction'
import * as movieActions from '../../actions/movieManager/index'
import * as transactionActions from '../../actions/transactionAction/index'
import * as actions from '../../actions/index'

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
    },[])
    return (

        <Router>
        <Navbar></Navbar>        
        <Switch>
            <Route path="/admin" exact component={MainContent}></Route>
            <Route path="/admin/users" exact component={UserManagementPage}></Route>  
            <Route path="/admin/sales" exact component={SaleChartPage}></Route>  
            <Route path="/admin/profile" exact component={UserProfile}></Route>  
            <Route path="/admin/transactions" exact component={TransactionPage}></Route>  
            <Route path="/admin/cinemas" exact component={CinemaManagement}></Route>  
        </Switch>
        <Footer></Footer>
        </Router>
            
    )
}

export default AdminPage;