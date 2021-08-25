import React, {Component} from 'react';
import Loader from 'react-loader-advanced';
import {connect} from 'react-redux';
import Pagination from '../../../components/Pagination/Pagination';
import ActorControl from '../../../components/Control/ActorControl/ActorControl';
import ActorList from '../../../components/Table/ActorTable/ActorList';
import * as actorActions from '../../../actions/actorManager/index'
class ActorManager extends Component{
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
        this.props.fetchDataActors();
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
        const {actors, loading} = this.props;
        var {
            totalPages,
            currentPage,
            pageLimit,
            startIndex,
            endIndex
          } = this.state;
        var rowsPerPage = actors.slice(startIndex, endIndex + 1);  
        return (    
            <Loader show={loading} message={'Loading.......'}> 
            <section>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-10 col-lg-9 col-md-8 ml-auto">
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
            </Loader>   
        )
    }
}

const mapStateToProps = (state) => {
    return {
        actors : state.actors.actors,
        loading: state.actors.loading
    }
}

const mapDispatchToProps = (dispatch, props) =>{
    return {
        fetchDataActors : () => {
            dispatch(actorActions.actFetchDataActorsRequest())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActorManager);