import React, {Component} from 'react';
import {connect} from 'react-redux';
import Pagination from '../../components/Pagination/Pagination';
import SeatControl from '../../components/Control/SeatControl/SeatControl';
import SeatList from '../../components/Table/SeatTable/SeatList';
import * as seatActions from '../../actions/seatAction/index'
class SeatManager extends Component{
    constructor(props) {
        super(props);
        this.state = {
            totalRecords: "",
            totalPages: "",
            pageLimit: 10,
            currentPage: "",
            startIndex: "",
            endIndex: ""
        };
      }
      componentDidMount() {
        const id = window.location.pathname.split('/')[3]  
        this.props.fetchDataSeats(id);
        const {seats} = this.props;
        const data = seats.reduce((prev, curr) => (prev[curr.row] = ++prev[curr.row] || 1, prev), {});
        const results = [];
        const keys = Object.keys(data);
        const values = Object.values(data);
        for(let i = 0 ; i < keys.length; i ++){
            results.push({
                row: keys[i],
                quantity: values[i]
            })
        }
        this.setState({
          totalRecords: results.length
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
        const {seats} = this.props;
        const data = seats.reduce((prev, curr) => (prev[curr.row] = ++prev[curr.row] || 1, prev), {});
        const results = [];
        const keys = Object.keys(data);
        const values = Object.values(data);
        for(let i = 0 ; i < keys.length; i ++){
            results.push({
                row: keys[i],
                quantity: values[i]
            })
        }
        var {
            totalPages,
            currentPage,
            pageLimit,
            startIndex,
            endIndex
          } = this.state;
        var rowsPerPage = results.slice(startIndex, endIndex + 1);  
        return (       
            <section>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-10 col-lg-9 col-md-8 ml-auto">
                            <div className="container-fluid mt-5">
                                <div className="row">                   
                                    <div className="col-xl-12 col-12 mb-4 mb-xl-0">
                                        <h2 className="text-center mb-2 mt-2">Danh sách ghế ngồi</h2>
                                        <div className="row">
                                            <div className="col-md-8 col-xl-8">
                                                <SeatControl></SeatControl>
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
                                                    <option value={10}>10</option>
                                                    <option value={25}>25</option>
                                                    <option value={50}>50</option>
                                                    <option value={100}>100</option>
                                                </select>
                                                <span>Seats</span>
                                        </div>
                                        </div>
                                        <div className='table-wrapper-scroll-y my-custom-scrollbar'>
                                            <SeatList
                                                totalPages = {totalPages}
                                                currentPage = {currentPage}
                                                pageLimit = {pageLimit}
                                                startIndex = {startIndex}
                                                endIndex = {endIndex}
                                                rowsPerPage = {rowsPerPage}
                                            ></SeatList>
                                        </div>
                                        <div className="col-xs-12 box_pagination_info text-right">
                                            <p>
                                            Trang {currentPage}/{totalPages}
                                            </p>
                                        </div>
                                        <Pagination
                                            totalRecords={results.length}
                                            pageLimit={pageLimit || 10}
                                            initialPage={1}
                                            pagesToShow={5}
                                            onChangePage={this.onChangePage}
                                        ></Pagination>
                                    </div>
                                    
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
        seats : state.seats.seats
    }
}

const mapDispatchToProps = (dispatch, props) =>{
    return {
        fetchDataSeats : (id) => {
            dispatch(seatActions.actFetchDataSeatsRequest(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeatManager);