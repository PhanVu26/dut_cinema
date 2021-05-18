import React, { Component } from "react";
import 'font-awesome/css/font-awesome.min.css';  
import 'bootstrap/dist/css/bootstrap.min.css';

import "../../components/admin/style.css";
import {connect} from 'react-redux';

import TransactionList from "../../components/Table/TransactionTable/TransactionList";
import Pagination from "../../components/Pagination/Pagination";
import * as actions from '../../actions/transactionAction/index';

class TransactionPage extends Component{
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
        this.props.fetchDataTransaction();
        this.setState({
          totalRecords: this.props.transactions.length
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
        const {transactions} = this.props;
        console.log("tr", transactions)
        var {
            totalPages,
            currentPage,
            pageLimit,
            startIndex,
            endIndex
          } = this.state;
        var rowsPerPage = transactions?.slice(startIndex, endIndex + 1);  
        return (
                <section>
                    <div class="container-fluid mt-5">
                        <div class="row">                   
                            <div class="col-xl-10 col-lg-9 col-md-8 ml-auto">
                                <div class="row ">
                                    <div class="col-xl-12 col-12 mb-4 mb-xl-0">
                                        <h2 class="text-center mb-3 mt-2">Quản lý giao dịch</h2>
                                        <div className="row">
                                            <div className="col-md-8 col-xl-8">
                                                
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
                                                <span>Transactions</span>
                                        </div>
                                        </div>
                                        <div className='table-wrapper-scroll-y my-custom-scrollbar'>
                                            <TransactionList
                                                totalPages = {totalPages}
                                                currentPage = {currentPage}
                                                pageLimit = {pageLimit}
                                                startIndex = {startIndex}
                                                endIndex = {endIndex}
                                                rowsPerPage = {rowsPerPage}
                                            ></TransactionList>
                                        </div>
                                        <div className="col-xs-12 box_pagination_info text-right">
                                            <p>
                                            {transactions.length} Transactions | Trang {currentPage}/{totalPages}
                                            </p>
                                        </div>
                                        <Pagination
                                            totalRecords={transactions.length}
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
                
        )
    }
}

const mapStateToProps = (state) => {
    return {
        transactions : state.transactions
    }
}

const mapDispatchToProps = (dispatch, props) =>{
    return {
        fetchDataTransaction : () => {
            dispatch(actions.actFetchDataTransactionsRequest());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionPage);