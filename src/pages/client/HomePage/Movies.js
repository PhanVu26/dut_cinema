import React, { Component } from "react";
import "./styles/MoviesStyles.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import TabControl from "../../../components/client/TabControl/TabControl";
import { actFetchDataMovieRequest,actFetchDataTheaterRequest } from "./../../../actions/index";
import { data } from "../../../data";
class Movies extends Component {
  constructor(props) {
    super(props);
    this.href = "/now-showing";
  }
  componentDidMount() {
    this.props.fetchAllDataMovie();
    this.props.fetchAllDataTheater();
  }
  isMovieShowing = (date) => {
    const now = new Date().setHours(0, 0, 0, 0);
    if (Date.parse(date) <= now) return true;
    else return false;
  };

  render() {
    let { movies } = this.props;
    //let movies = data.movie;
    console.log(movies);
    let movieShowing = movies.filter((item) =>
      this.isMovieShowing(item.releaseDate)
    );

    let movieComingSoon = movies.filter(
      (item) => !this.isMovieShowing(item.releaseDate)
    );
    return (
      <div className="container mb-5">
        <div className="wrap">
          <TabControl
            tab1="phim đang chiếu"
            tab2="phim sắp chiếu"
            data1={movieShowing.slice(0, 6)}
            data2={movieComingSoon.slice(0, 6)}
            tabDefault={0}
            path={"/"}
          />
          <div className="row mt-3">
            <div className="col-md-12 col-sm-12 col-xs-12 pull-right">
              <Link
                to="/now-showing"
                className="btn secondary btn-outline-orange"
              >
                Xem thêm
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movieShowing: state.MovieReducer.movieShowing,
    movieComingSoon: state.MovieReducer.movieComingSoon,
    movies: state.MovieReducer.movie,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDataMovie: () => {
      dispatch(actFetchDataMovieRequest());
    },
    fetchAllDataTheater:()=>{
      dispatch(actFetchDataTheaterRequest());
    },
  };
};

//export default Movies;
export default connect(mapStateToProps, mapDispatchToProps)(Movies);
