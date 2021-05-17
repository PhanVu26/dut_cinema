import React from "react";
import UserManagementPage from "../../../pages/admin/UserManagementPage";
import SalesChart from '../Chart/SalesChart'


const MainContent  = (props) => {
    return (
        <div className="container-fluid">
            <section>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-10 col-lg-9 col-md-8 ml-auto">
                            <div className="row mt-md-3 pt-md-5 mb-3">
                                <div className="col-xl-3 col-sm-6 p-2">
                                    <div className="card card-style">
                                        <div className="card-body ">
                                            <div className="d-flex justify-content-between">
                                                <i className="fas fa-hashtag fa-3x text-warning"></i>
                                                <div className="text-right">
                                                    <h5>Movies</h5>
                                                <h3>23</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <i className="fas fa-sync mr-3"></i>
                                            <span>Updated Know</span>
                                        </div>
                                    </div>

                                </div>
                                <div className="col-xl-3 col-sm-6 p-2">
                                    <div className="card card-style">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between">
                                                <i className="fas fa-sticky-note fa-3x text-success"></i>
                                                <div className="text-right">
                                                    <h5>Posts</h5>
                                                    <h3>123</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <i className="fas fa-sync mr-3"></i>
                                            <span>Updated Know</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-sm-6 p-2">
                                    <div className="card card-style">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between">
                                                <i className="fas fa-users fa-3x text-primary"></i>
                                                <div className="text-right">
                                                    <h5>Users</h5>
                                                    <h3>31</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <i className="fas fa-sync mr-3"></i>
                                            <span>Updated Know</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-sm-6 p-2">
                                    <div className="card card-style">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between">
                                                <i className="fas fa-chart-line fa-3x text-danger"></i>
                                                <div className="text-right">
                                                    <h5>Sales</h5>
                                                    <h3>$135,000</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <i className="fas fa-sync mr-3"></i>
                                            <span>Updated Know</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> 
            <section>
                <div className="container-fluid mt-5">
                    <div className="row">
                        <div className="col-xl-10 col-lg-9 col-md-8 ml-auto">
                            <div className="row ">
                                <div className="col-md-6 col-6 mb-4 mb-xl-0">
                                    <h2 className="text-muted text-center mb-5">Doanh thu</h2>
                                    <SalesChart></SalesChart>
                                    
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        
    )
}

export default MainContent;