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
import Navbar from "../../components/admin/Navbar/Navbar";
import UserControl from "../../components/admin/Control/UserControl/UserControl";
import UserList from "../../components/admin/Table/UserTable/UserList";
import Pagination from "../../components/admin/Pagination/Pagination";

const UserManagementPage = (props) => {
    return (
        <Router>
            <Navbar></Navbar>        
            <Modal></Modal>
            <section>
                <div class="container-fluid mt-5">
                    <div class="row">                   
                        <div class="col-xl-10 col-lg-9 col-md-8 ml-auto">
                            <div class="row ">
                                <div class="col-xl-12 col-12 mb-4 mb-xl-0">
                                    <h2 class="text-muted text-center mb-5">Danh sách người dùng</h2>
                                    <UserControl></UserControl>
                                    <UserList></UserList>
                                    <Pagination></Pagination>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section> 
            <Footer></Footer>
        </Router>
            
    )
}

export default UserManagementPage;