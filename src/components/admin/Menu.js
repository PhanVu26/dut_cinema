import React from "react";

import "./style.css";  

const Menu  = (props) => {
    return (
        <section>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-xl-10 col-lg-9 col-md-8 ml-auto">
                        <div class="row mt-md-3 pt-md-5 mb-3">
                            <div class="col-xl-3 col-sm-6 p-2">
                                <div class="card card-style">
                                    <div class="card-body ">
                                        <div class="d-flex justify-content-between">
                                            <i class="fas fa-hashtag fa-3x text-warning"></i>
                                            <div class="text-right">
                                                <h5>Hashtags</h5>
                                            <h3>23</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-footer">
                                        <i class="fas fa-sync mr-3"></i>
                                        <span>Updated Know</span>
                                    </div>
                                </div>

                            </div>
                            <div class="col-xl-3 col-sm-6 p-2">
                                <div class="card card-style">
                                    <div class="card-body">
                                        <div class="d-flex justify-content-between">
                                            <i class="fas fa-sticky-note fa-3x text-success"></i>
                                            <div class="text-right">
                                                <h5>Posts</h5>
                                                <h3>123</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-footer">
                                        <i class="fas fa-sync mr-3"></i>
                                        <span>Updated Know</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-3 col-sm-6 p-2">
                                <div class="card card-style">
                                    <div class="card-body">
                                        <div class="d-flex justify-content-between">
                                            <i class="fas fa-users fa-3x text-primary"></i>
                                            <div class="text-right">
                                                <h5>Users</h5>
                                                <h3>31</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-footer">
                                        <i class="fas fa-sync mr-3"></i>
                                        <span>Updated Know</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-3 col-sm-6 p-2">
                                <div class="card card-style">
                                    <div class="card-body">
                                        <div class="d-flex justify-content-between">
                                            <i class="fas fa-chart-line fa-3x text-danger"></i>
                                            <div class="text-right">
                                                <h5>Sales</h5>
                                                <h3>$135,000</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-footer">
                                        <i class="fas fa-sync mr-3"></i>
                                        <span>Updated Know</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>  
    );
};    

export default Menu;
