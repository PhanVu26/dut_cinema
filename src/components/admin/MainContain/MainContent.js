import React from "react";
import Loader from 'react-loader-advanced';
import { useSelector } from "react-redux";
import SalesChart from '../Chart/SalesChart'


const MainContent  = (props) => {
    const movies = useSelector(state => state.movies.movies)
    const users = useSelector(state => state.users.users)
    const transactions = useSelector(state => state.transactions.transactions)
    const loading = useSelector(state => state.transactions.loading)
    const cinemas = useSelector(state => state.cinemas.cinemas)
    const genres = useSelector(state => state.genres.genres)
    const ticketTypes = useSelector(state => state.ticketTypes.ticketTypes)
    const saleAnalysis = useSelector(state => state.analysisReducer.saleAnalysis);

    const countSalesTotal = (saleAnalysis) => {
        let sum = 0;
        saleAnalysis.forEach(ele => {
            sum += parseInt(ele.sumSales)
        });
        return sum;
    }
    return (
        <Loader show={loading} message={'Loading.......'}>
            <div className="container-fluid">
                <section>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xl-10 col-lg-9 col-md-8 ml-auto">
                                <div className="row mt-md-3 pt-md-2 mb-2">
                                    <div className="col-xl-3 col-sm-6 p-2">
                                        <div className="card card-style">
                                            <div className="card-body ">
                                                <div className="d-flex justify-content-between">
                                                    <i className="fas fa-film fa-3x text-warning"></i>
                                                    <div className="text-right">
                                                        <h5>Phim</h5>
                                                    <h3>{movies.length}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-footer">
                                                
                                                
                                            </div>
                                        </div>

                                    </div>
                                    <div className="col-xl-3 col-sm-6 p-2">
                                        <div className="card card-style">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between">
                                                    <i className="fas fa-handshake fa-3x text-success"></i>
                                                    <div className="text-right">
                                                        <h5>Giao d???ch</h5>
                                                        <h3>{transactions.length}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-footer">
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-sm-6 p-2">
                                        <div className="card card-style">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between">
                                                    <i className="fas fa-users fa-3x text-primary"></i>
                                                    <div className="text-right">
                                                        <h5>Ng?????i d??ng</h5>
                                                        <h3>{users.length}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-footer">
                                                
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xl-3 col-sm-6 p-2">
                                        <div className="card card-style">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between">
                                                    <i className="fas fa-theater-masks fa-3x text-success"></i>
                                                    <div className="text-right">
                                                        <h5>R???p chi???u</h5>
                                                        <h3>{cinemas.length}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-footer">
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-sm-6 p-2">
                                        <div className="card card-style">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between">
                                                    <i className="fas fa-chart-line fa-3x text-danger"></i>
                                                    <div className="text-right">
                                                        <h5>Th??? lo???i</h5>
                                                        <h3>{genres.length}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-footer">
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-sm-6 p-2">
                                        <div className="card card-style">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between">
                                                    <i className="fas fa-chart-line fa-3x text-danger"></i>
                                                    <div className="text-right">
                                                        <h5>Lo???i v??</h5>
                                                        <h3>{ticketTypes.length}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-footer">
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-sm-6 p-2">
                                        <div className="card card-style">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between">
                                                    <i className="fas fa-chart-line fa-3x text-danger"></i>
                                                    <div className="text-right">
                                                        <h5>Doanh thu</h5>
                                                        <h3>{countSalesTotal(saleAnalysis)}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-footer">
                                                
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
                                    <div className="col-md-12 col-12 mb-4 mb-xl-0">
                                        <SalesChart></SalesChart>
                                        
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Loader>
    )
}

export default MainContent;