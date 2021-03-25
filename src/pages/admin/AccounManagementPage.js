import React from "react";
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
import AccountManagement from "../../components/admin/AccountTable/AccountManagement";
import Navbar from "../../components/admin/Navbar/Navbar";

const AccountManagementPage = (props) => {
    return (
        <Router>
            <Navbar></Navbar>        
            <Modal></Modal>
            <AccountManagement></AccountManagement>
            <Footer></Footer>
        </Router>
            
    )
}

export default AccountManagementPage;