import React from "react";


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
                                <div className="col-xl-6 col-12 mb-4 mb-xl-0">
                                    <h2 className="text-muted text-center mb-5">Users</h2>
                                    <table style={{color: "black"}} className="table table-striped bg-light text-center">
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
                                    <ul className="pagination justify-content-center">
                                        <li className="page-item"><a href="#" className="page-link px-3 py-2">
                                            <span>&laquo;</span>
                                        </a></li>
                                        {
                                            
                                        }
                                        <li className="page-item active"><a href="#" className="page-link py-2 px-3">1</a></li>
                                        <li className="page-item"><a href="#" className="page-link py-2 px-3">2</a></li>
                                        <li className="page-item"><a href="#" className="page-link py-2 px-3">3</a></li>
                                        <li className="page-item"><a href="#" className="page-link py-2 px-3">4</a></li>
                                        <li className="page-link"><a href="#" className="page-item py-2 px-3">
                                            <span>&raquo;</span>
                                        </a></li>
                                    </ul>
                                </div>
                                <div className="col-xl-6 col-12">
                                    <h2 className="text-muted text-center mb-5">Pricing</h2>
                                    <table className="table table-dark table-hover text-center">
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
                                                <td><span className="badge badge-success w-75 py-2">Approved</span></td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>Amir</td>
                                                <td>$1000</td>
                                                <td>25/09/2011</td>
                                                <td><span className="badge badge-success py-2 w-75">Approved</span></td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>Amir</td>
                                                <td>$1000</td>
                                                <td>25/09/2011</td>
                                                <td><span className="badge badge-danger w-75 py-2">Waiting</span></td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>Amir</td>
                                                <td>$1000</td>
                                                <td>25/09/2011</td>
                                                <td><span className="badge badge-success w-75 py-2">Approved</span></td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>Amir</td>
                                                <td>$1000</td>
                                                <td>25/09/2011</td>
                                                <td><span className="badge badge-danger w-75 py-2">Waiting</span></td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>Amir</td>
                                                <td>$1000</td>
                                                <td>25/09/2011</td>
                                                <td><span className="badge badge-success w-75 py-2">Approved</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <ul className="pagination justify-content-center">
                                        <li className="page-item"><a href="#" className="page-link px-3 py-2">
                                            <span>&laquo;</span>
                                        </a></li>
                                        <li className="page-item active"><a href="#" className="page-link py-2 px-3">1</a></li>
                                        <li className="page-item"><a href="#" className="page-link py-2 px-3">2</a></li>
                                        <li className="page-item"><a href="#" className="page-link py-2 px-3">3</a></li>
                                        <li className="page-item"><a href="#" className="page-link py-2 px-3">4</a></li>
                                        <li className="page-link"><a href="#" className="page-item py-2 px-3">
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