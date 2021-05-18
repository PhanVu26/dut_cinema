import React, { useEffect } from "react";
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

const AdminPage = (props) => {
    useEffect(() =>{
        const account = JSON.parse(localStorage.getItem("account"));
        if(account.roleName !== "Admin"){
            window.location.href = "/login";
        }
    },[])
    return (

        <Router>
        <Navbar></Navbar>        
        <Switch>
            <Route path="/admin" exact component={MainContent}></Route>
            <Route path="/admin/users" exact component={UserManagementPage}></Route>  
            <Route path="/admin/sales" exact component={UserManagementPage}></Route>  
            <Route path="/admin/profile" exact component={UserProfile}></Route>  
            <Route path="/admin/transactions" exact component={TransactionPage}></Route>  
        </Switch>
        <Footer></Footer>
        </Router>
            
    )
}

export default AdminPage;