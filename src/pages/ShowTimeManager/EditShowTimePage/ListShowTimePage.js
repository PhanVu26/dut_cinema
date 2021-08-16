import React, { Component } from "react";
import { connect } from "react-redux";
import {
  actFetchCinemaRequest,
  actFetchAllShowtimesRequest,
} from "../../../actions/showtimeManager/index";
import Pagination from "../../../components/Pagination/Pagination";
import ShowtimeList from "../../../components/Table/ShowtimeTable/ShowtimeList";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import Loader from "react-loader-advanced";
import RefreshIcon from "@material-ui/icons/Refresh";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  searchBar: {
    border: 1,
  },
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

class ListShowTimePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalRecords: "",
      totalPages: "",
      pageLimit: 10,
      currentPage: "",
      startIndex: "",
      endIndex: "",
    };
  }

  componentDidMount() {
    this.props.fetchCinema();
    this.props.fetchShowtimes();
    console.log("test nefffff");
    this.setState({
      totalRecords: this.props.reducerShowTime.totalShowtimes,
    });
  }

  onChangePage = (data) => {
    this.setState({
      pageLimit: data.pageLimit,
      totalPages: data.totalPages,
      currentPage: data.page,
      startIndex: data.startIndex,
      endIndex: data.endIndex,
    });
    this.props.fetchShowtimes();
  };

  render() {
    const showtimes = this.props.reducerShowTime.allShowtimes;
    var { totalPages, currentPage, pageLimit, startIndex, endIndex } =
      this.state;
    var rowsPerPage = showtimes.slice(startIndex, endIndex + 1);
    return (
      <section style={{ backgroundColor: "#f3f3f4" }}>
        <div class="container-fluid">
          <div class="row">
            <div class="col-xl-10 col-lg-9 col-md-8 ml-auto">
              <div class="row ">
                <div class="col-xl-12 col-12 mb-4 mb-xl-0">
                  <h2 class="text-center mb-5 mt-3">Danh sách lịch chiếu</h2>
                  <div className="row">
                    <div className="col-xs-4 col-md-4">
                      <span>Hiển thị</span>
                      <select
                        className="mr-2 ml-2"
                        value={pageLimit}
                        onChange={(e) =>
                          this.setState({
                            pageLimit: parseInt(e.target.value),
                          })
                        }
                      >
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                      </select>
                      <span>Lịch chiếu</span>
                    </div>
                  </div>
                  <div className="table-wrapper-scroll-y my-custom-scrollbar">
                    <ShowtimeList
                      totalPages={totalPages}
                      currentPage={currentPage}
                      pageLimit={pageLimit}
                      startIndex={startIndex}
                      endIndex={endIndex}
                      rowsPerPage={rowsPerPage}
                    ></ShowtimeList>
                  </div>
                  <div className="col-xs-12 box_pagination_info text-right">
                    <p>
                      {showtimes.length} Lịch chiếu | Trang {currentPage}/
                      {totalPages}
                    </p>
                  </div>
                  <Pagination
                    totalRecords={showtimes.length}
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
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.movies,
    movieInfo: state.movieInfo,
    reducerShowTime: state.reducerShowTime,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchCinema: () => {
      dispatch(actFetchCinemaRequest());
    },
    fetchShowtimes: () => {
      dispatch(actFetchAllShowtimesRequest());
    },
    // onAddShowtime: (showtime, roomId, dateString) => {
    //   dispatch(actions2.actAddShowtimeRequest(showtime, roomId, dateString));
    // },
    // onDeleteShowtime: (showtimeId, roomId, dateString) => {
    //   dispatch(actions2.actDeleteShowtimeRequest(showtimeId, roomId, dateString));
    // }
    // // onDeleteUser: (id) => {
    // //     dispatch(actions.deleteUser(id))
    // // },
    // // onUpdateUserStatus: (id) => {
    // //     dispatch(actions.updateUserStatus(id))
    // // },
    // getMovieInfo : (movie) => {
    //     dispatch(actions.getMovieInfo(movie))
    // }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListShowTimePage);
