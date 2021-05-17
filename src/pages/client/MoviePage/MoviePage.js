import TabControl from "../../../components/client/TabControl/TabControl";
import { actFetchDataMovieRequest } from "../../../actions/index";
// import { data } from "../../../data";
import React, { Component } from "react";
import { connect } from "react-redux";

class MoviePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myProps: props,
    };
  }

  isMovieShowing = (date) => {
    const now = new Date().setHours(0, 0, 0, 0);
    if (Date.parse(date) <= now) return true;
    else return false;
  };

  render() {
    this.props.fetchAllDataMovie();
    let moviesShowing = this.props.movies.filter((item) =>
      this.isMovieShowing(item.releaseDate)
    );

    let moviesComingSoon = this.props.movies.filter(
      (item) => !this.isMovieShowing(item.releaseDate)
    );
    const { match } = this.state.myProps;
    const tabDefault = match.path === "/now-showing" ? 0 : 1;
    return (
      <div className="container p-0 mt-3 mb-5">
        <TabControl
          tab1="phim đang chiếu"
          tab2="phim sắp chiếu"
          data1={moviesShowing}
          data2={moviesComingSoon}
          tabDefault={tabDefault}
          path={match.path}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.MovieReducer.movie,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDataMovie: () => {
      dispatch(actFetchDataMovieRequest());
    },
  };
};

export default React.memo(
  connect(mapStateToProps, mapDispatchToProps)(MoviePage)
);
