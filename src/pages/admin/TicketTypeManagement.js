import React, {Component} from 'react';
import Loader from 'react-loader-advanced';
import {connect} from 'react-redux';
import Pagination from '../../components/Pagination/Pagination';
import TicketTypeControl from '../../components/Control/TicketTypeControl/TicketTypeControl'
import TicketTypeList from '../../components/Table/TicketTypeTable/TicketTypeList';
import * as ticketTypeActions from '../../actions/ticketTypeAction/index'
class TicketTypeManager extends Component{
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
        this.props.fetchDataTicketTypes();
        this.setState({
          totalRecords: this.props.ticketTypes.length
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
        const {ticketTypes, loading} = this.props;
        var {
            totalPages,
            currentPage,
            pageLimit,
            startIndex,
            endIndex
          } = this.state;
        var rowsPerPage = ticketTypes.slice(startIndex, endIndex + 1);  
        return (    
            <Loader show={loading} message={'Loading.......'}> 
            <section>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-10 col-lg-9 col-md-8 ml-auto">
                            <div className="container-fluid mt-5">
                                <div className="row">                   
                                    <div className="col-xl-12 col-12 mb-4 mb-xl-0">
                                        <h2 className="text-center mb-3 mt-2">Danh sách thể loại vé</h2>
                                        <div className="row">
                                            <div className="col-md-8 col-xl-8">
                                                <TicketTypeControl></TicketTypeControl>
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
                                                <span>TicketTypes</span>
                                        </div>
                                        </div>
                                        <div className='table-wrapper-scroll-y my-custom-scrollbar'>
                                            <TicketTypeList
                                                totalPages = {totalPages}
                                                currentPage = {currentPage}
                                                pageLimit = {pageLimit}
                                                startIndex = {startIndex}
                                                endIndex = {endIndex}
                                                rowsPerPage = {rowsPerPage}
                                            ></TicketTypeList>
                                        </div>
                                        <div className="col-xs-12 box_pagination_info text-right">
                                            <p>
                                            {ticketTypes.length} ticketTypes | Trang {currentPage}/{totalPages}
                                            </p>
                                        </div>
                                        <Pagination
                                            totalRecords={ticketTypes.length}
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
        ticketTypes : state.ticketTypes.ticketTypes,
        loading: state.ticketTypes.loading
    }
}

const mapDispatchToProps = (dispatch, props) =>{
    return {
        fetchDataTicketTypes : () => {
            dispatch(ticketTypeActions.actFetchDataTicketTypesRequest())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketTypeManager);