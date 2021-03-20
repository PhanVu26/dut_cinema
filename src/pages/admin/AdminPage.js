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
import Footer from "../../components/admin/Footer";
import Modal from "../../components/admin/Modal";
import MainContent from "../../components/admin/MainContent";
import Navbar from "../../components/admin/Navbar";

const AdminPage = (props) => {
    return (
        <Router>
            <Navbar></Navbar>        
            <Modal></Modal>
            <MainContent></MainContent>
            <Footer></Footer>
        </Router>
            
    )
}

export default AdminPage;