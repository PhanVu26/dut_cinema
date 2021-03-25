import React from "react";


const MainContent  = (props) => {
    return (
        <div className="container-fluid">
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
                                                    <h5>Movies</h5>
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
            <section>
                <div class="container-fluid mt-5">
                    <div class="row">
                        <div class="col-xl-10 col-lg-9 col-md-8 ml-auto">
                            <div class="row ">
                                <div class="col-xl-6 col-12 mb-4 mb-xl-0">
                                    <h2 class="text-muted text-center mb-5">Users</h2>
                                    <table style={{color: "black"}} class="table table-striped bg-light text-center">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Username</th>
                                                <th>Password</th>
                                                <th>Role</th>
                                                <th>Contact</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            
                                        </tbody>
                                    </table>
                                    <ul class="pagination justify-content-center">
                                        <li class="page-item"><a href="#" class="page-link px-3 py-2">
                                            <span>&laquo;</span>
                                        </a></li>
                                        {
                                            
                                        }
                                        <li class="page-item active"><a href="#" class="page-link py-2 px-3">1</a></li>
                                        <li class="page-item"><a href="#" class="page-link py-2 px-3">2</a></li>
                                        <li class="page-item"><a href="#" class="page-link py-2 px-3">3</a></li>
                                        <li class="page-item"><a href="#" class="page-link py-2 px-3">4</a></li>
                                        <li class="page-link"><a href="#" class="page-item py-2 px-3">
                                            <span>&raquo;</span>
                                        </a></li>
                                    </ul>
                                </div>
                                <div class="col-xl-6 col-12">
                                    <h2 class="text-muted text-center mb-5">Pricing</h2>
                                    <table class="table table-dark table-hover text-center">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Date</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>Amir</td>
                                                <td>$1000</td>
                                                <td>25/09/2011</td>
                                                <td><span class="badge badge-success w-75 py-2">Approved</span></td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>Amir</td>
                                                <td>$1000</td>
                                                <td>25/09/2011</td>
                                                <td><span class="badge badge-success py-2 w-75">Approved</span></td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>Amir</td>
                                                <td>$1000</td>
                                                <td>25/09/2011</td>
                                                <td><span class="badge badge-danger w-75 py-2">Waiting</span></td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>Amir</td>
                                                <td>$1000</td>
                                                <td>25/09/2011</td>
                                                <td><span class="badge badge-success w-75 py-2">Approved</span></td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>Amir</td>
                                                <td>$1000</td>
                                                <td>25/09/2011</td>
                                                <td><span class="badge badge-danger w-75 py-2">Waiting</span></td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>Amir</td>
                                                <td>$1000</td>
                                                <td>25/09/2011</td>
                                                <td><span class="badge badge-success w-75 py-2">Approved</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <ul class="pagination justify-content-center">
                                        <li class="page-item"><a href="#" class="page-link px-3 py-2">
                                            <span>&laquo;</span>
                                        </a></li>
                                        <li class="page-item active"><a href="#" class="page-link py-2 px-3">1</a></li>
                                        <li class="page-item"><a href="#" class="page-link py-2 px-3">2</a></li>
                                        <li class="page-item"><a href="#" class="page-link py-2 px-3">3</a></li>
                                        <li class="page-item"><a href="#" class="page-link py-2 px-3">4</a></li>
                                        <li class="page-link"><a href="#" class="page-item py-2 px-3">
                                            <span>&raquo;</span>
                                        </a></li>
                                    </ul>
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