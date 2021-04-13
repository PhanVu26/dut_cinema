import React, {Component} from 'react';
import {connect} from 'react-redux';
import Navbar from '../../../components/manager/Navbar/Navbar'
import MovieControl from '../../../components/Control/MovieControl/MovieControl';
import MovieList from '../../../components/Table/MovieTable/MovieList';
import Footer from '../../../components/admin/Footer/Footer';
import {
    BrowserRouter as Router,
  } from "react-router-dom";
import Pagination from '../../../components/Pagination/Pagination';
import ActorControl from '../../../components/Control/ActorControl/ActorControl';
import ActorList from '../../../components/Table/ActorTable/ActorList';
class ActorManager extends Component{
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
          totalRecords: this.props.actors.length
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
        const {actors} = this.props;
        var {
            totalPages,
            currentPage,
            pageLimit,
            startIndex,
            endIndex
          } = this.state;
        var rowsPerPage = actors.slice(startIndex, endIndex + 1);  
        console.log("rowPerPage: ", rowsPerPage);
        return (       
            <section>
                <div className="container-fluid mt-5">
                    <div className="row">                   
                        <div className="col-xl-12 col-12 mb-4 mb-xl-0">
                            <h2 className="text-center mb-3 mt-2">Danh sách diễn viên</h2>
                            <div className="row">
                                <div className="col-md-8 col-xl-8">
                                    <ActorControl></ActorControl>
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
                                    <span>actors</span>
                            </div>
                            </div>
                            <div className='table-wrapper-scroll-y my-custom-scrollbar'>
                                <ActorList
                                    totalPages = {totalPages}
                                    currentPage = {currentPage}
                                    pageLimit = {pageLimit}
                                    startIndex = {startIndex}
                                    endIndex = {endIndex}
                                    rowsPerPage = {rowsPerPage}
                                ></ActorList>
                            </div>
                            <div className="col-xs-12 box_pagination_info text-right">
                                <p>
                                {actors.length} actors | Trang {currentPage}/{totalPages}
                                </p>
                            </div>
                            <Pagination
                                totalRecords={actors.length}
                                pageLimit={pageLimit || 5}
                                initialPage={1}
                                pagesToShow={5}
                                onChangePage={this.onChangePage}
                            ></Pagination>
                        </div>
                        
                    </div>
                </div>
            </section> 
                
        )
    }
}

const mapStateToProps = (state) => {
    return {
        actors : state.actors
    }
}

const mapDispatchToProps = (dispatch, props) =>{

}

export default connect(mapStateToProps, mapDispatchToProps)(ActorManager);