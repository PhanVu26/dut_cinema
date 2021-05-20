import React, {Component} from 'react';
import {connect} from 'react-redux';
import MovieControl from '../../../components/Control/MovieControl/MovieControl';
import MovieList from '../../../components/Table/MovieTable/MovieList';
import Pagination from '../../../components/Pagination/Pagination';
import MovieForm from '../../../components/Modal/MovieModal/MovieForm';
import * as actions from '../../../actions/movieManager/index';
import * as actorActions from '../../../actions/actorManager/index';
import MovieDetail from '../../../components/Modal/MovieModal/MovieDetail';
class MovieManager extends Component{
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
        this.props.fetchDataMovies();  
        this.props.fetchDataActors();  
        this.props.fetchDataGenres(); 
        this.setState({
          totalRecords: this.props.movies.length
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
        const {movies} = this.props;
        var {
            totalPages,
            currentPage,
            pageLimit,
            startIndex,
            endIndex
          } = this.state;
        var rowsPerPage = movies.slice(startIndex, endIndex + 1);  
        console.log("render in movie manager page")
        return (    
            <section>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-10 col-lg-9 col-md-8 ml-auto">
                            <div className="container-fluid mt-5">
                                <MovieForm></MovieForm>
                                <MovieDetail></MovieDetail>
                                <div className="row">                   
                                    <div className="col-xl-12 col-12 mb-4 mb-xl-0">
                                        <h2 className="text-center mb-3 mt-2">Danh sách phim</h2>
                                        <div className="row">
                                            <div className="col-md-8 col-xl-8">
                                                <MovieControl></MovieControl>
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
                                                <span>Movies</span>
                                        </div>
                                        </div>
                                        <div className='table-wrapper-scroll-y my-custom-scrollbar'>
                                            <MovieList
                                                totalPages = {totalPages}
                                                currentPage = {currentPage}
                                                pageLimit = {pageLimit}
                                                startIndex = {startIndex}
                                                endIndex = {endIndex}
                                                rowsPerPage = {rowsPerPage}
                                            ></MovieList>
                                        </div>
                                        <div className="col-xs-12 box_pagination_info text-right">
                                            <p>
                                            {movies.length} Movies | Trang {currentPage}/{totalPages}
                                            </p>
                                        </div>
                                        <Pagination
                                            totalRecords={movies.length}
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
        movies : state.movies
    }
}

const mapDispatchToProps = (dispatch, props) =>{
    return {
        fetchDataMovies : () => {
            dispatch(actions.actFetchDataMoviesRequest())
        },
        fetchDataActors : () => {
            dispatch(actorActions.actFetchDataActorsRequest())
        },
        fetchDataGenres : () => {
            dispatch(actions.actFetchDataGenresRequest())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieManager);