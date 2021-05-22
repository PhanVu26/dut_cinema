import React, {Component} from 'react';
import {connect} from 'react-redux';
import Pagination from '../../components/Pagination/Pagination';
import RoomControl from '../../components/Control/RoomControl/RoomControl';
import RoomList from '../../components/Table/RoomTable/RoomList';
import * as roomActions from '../../actions/roomAction/index'
class RoomManager extends Component{
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
        this.props.fetchDataRooms(id);
        this.setState({
          totalRecords: this.props.rooms.length
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
        const {rooms} = this.props;
        var {
            totalPages,
            currentPage,
            pageLimit,
            startIndex,
            endIndex
          } = this.state;
        var rowsPerPage = rooms.slice(startIndex, endIndex + 1);  
        return (       
            <section>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-10 col-lg-9 col-md-8 ml-auto">
                            <div className="container-fluid mt-5">
                                <div className="row">                   
                                    <div className="col-xl-12 col-12 mb-4 mb-xl-0">
                                        <h2 className="text-center mb-2 mt-2">Danh sách room</h2>
                                        <div className="row">
                                            <div className="col-md-8 col-xl-8">
                                                <RoomControl></RoomControl>
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
                                                <span>rooms</span>
                                        </div>
                                        </div>
                                        <div className='table-wrapper-scroll-y my-custom-scrollbar'>
                                            <RoomList
                                                totalPages = {totalPages}
                                                currentPage = {currentPage}
                                                pageLimit = {pageLimit}
                                                startIndex = {startIndex}
                                                endIndex = {endIndex}
                                                rowsPerPage = {rowsPerPage}
                                            ></RoomList>
                                        </div>
                                        <div className="col-xs-12 box_pagination_info text-right">
                                            <p>
                                            {rooms.length} rooms | Trang {currentPage}/{totalPages}
                                            </p>
                                        </div>
                                        <Pagination
                                            totalRecords={rooms.length}
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
        rooms : state.rooms
    }
}

const mapDispatchToProps = (dispatch, props) =>{
    return {
        fetchDataRooms : (id) => {
            dispatch(roomActions.actFetchDataRoomsRequest(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomManager);