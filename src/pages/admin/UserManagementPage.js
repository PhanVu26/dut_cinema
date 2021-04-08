import React, { Component } from "react";
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
import {connect} from 'react-redux';
import * as actions from '../../actions/index';
import UserControl from "../../components/Control/UserControl/UserControl";
import UserList from "../../components/Table/UserTable/UserList";
import Pagination from "../../components/Pagination/Pagination";

class UserManagementPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            totalRecords: "",
            totalPages: "",
            pageLimit: 5,
            currentPage: "",
            startIndex: "",
            endIndex: ""
        };
      }
      componentDidMount() {
        // this.props.fetchAllProducts();
        this.setState({
          totalRecords: this.props.users.length
        });
      }
      onChangePage = data => {
        this.setState({
            pageLimit: data.pageLimit,
            totalPages: data.totalPages,
            currentPage: data.page,
            startIndex: data.startIndex,
            endIndex: data.endIndex
        });
      };
    render(){
        const {users} = this.props;
        var {
            totalPages,
            currentPage,
            pageLimit,
            startIndex,
            endIndex
          } = this.state;
        var rowsPerPage = users.slice(startIndex, endIndex + 1);  
        console.log("rowPerPage: ", rowsPerPage);
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
                                        <h2 class="text-center mb-5 mt-3">Danh sách người dùng</h2>
                                        <div className="row">
                                            <div className="col-md-8 col-xl-8">
                                                <UserControl></UserControl>
                                            </div>
                                            <div className="col-xs-4 col-md-4">
                                                <span>Hiển thị</span>
                                                <select
                                                    className='mr-2 ml-2'
                                                    value={pageLimit}
                                                    onChange={e =>
                                                        this.setState({ pageLimit: parseInt(e.target.value) })
                                                    }
                                                    >
                                                    <option value={5}>5</option>
                                                    <option value={10}>10</option>
                                                    <option value={25}>25</option>
                                                    <option value={50}>50</option>
                                                    <option value={100}>100</option>
                                                </select>
                                                <span>Users</span>
                                        </div>
                                        </div>
                                        <div className='table-wrapper-scroll-y my-custom-scrollbar'>
                                            <UserList
                                                totalPages = {totalPages}
                                                currentPage = {currentPage}
                                                pageLimit = {pageLimit}
                                                startIndex = {startIndex}
                                                endIndex = {endIndex}
                                                rowsPerPage = {rowsPerPage}
                                            ></UserList>
                                        </div>
                                        <div className="col-xs-12 box_pagination_info text-right">
                                            <p>
                                            {users.length} Users | Trang {currentPage}/{totalPages}
                                            </p>
                                        </div>
                                        <Pagination
                                            totalRecords={users.length}
                                            pageLimit={pageLimit || 5}
                                            initialPage={1}
                                            pagesToShow={5}
                                            onChangePage={this.onChangePage}
                                        ></Pagination>
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
}

const mapStateToProps = (state) => {
    return {
        users : state.users
    }
}

const mapDispatchToProps = (dispatch, props) =>{

}

export default connect(mapStateToProps, mapDispatchToProps)(UserManagementPage);