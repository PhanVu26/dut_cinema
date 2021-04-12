import { withStyles } from "@material-ui/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import ColumnBlock from "../../../components/client/ColumnBlock/ColumnBlock";
import styles from "./BuyTicketPageStyles";
import {
  actFetchDataMovieRequest,
  actReceiveMovieChoosing,
} from "../../../actions/index";
import { Box } from "@material-ui/core";
import history from "../../../commons/history";

class BuyTicketPage extends Component {
  constructor() {
    super();
    this.state = {
      timeOfMovie: [],
      isShow: false,
      active: "",
    };
  }

  componentDidMount() {
    this.props.fetchAllDataMovie();
  }

  handleOnChooseMovie = (mv) => {
    console.log("mv:", mv);
    this.setState({
      timeOfMovie: mv.date,
      isShow: true,
      active: mv,
    });
  };

  showMovieToChoose = (arr, classes) => {
    return arr.map((item, index) => {
      let active = this.state.active._id === item._id ? classes.active : "";
      return (
        <div
          key={index}
          className={`${classes.block}`}
          onClick={() => {
            this.handleOnChooseMovie(item);
          }}
        >
          <div className={`${classes.link} ${active} row no-gutters p-3`}>
            <span className="col-3">
              <img alt="" className={classes.img} src={item.image} />
            </span>
            <p className={`${classes.title} col-9 pl-4`}>{item.name}</p>
          </div>
        </div>
      );
    });
  };

  handleOnChooseSession = (item, session, account) => {
    if (account && Object.keys(account).length > 0) {
      const movie = this.state.active;
      this.props.receiveMovieChoosing(movie, item, session, account._id);
      const slug = movie.slug;
      history.push(`/buy-ticket-detail/${slug}`);
    } else {
      alert("Vui lòng đăng nhập!");
    }
  };

  showTimeOfMovie = (arr, classes, account) => {
    return arr.map((item, index) => {
      const listSession = item.frameTime.map((obj) => obj.time);
      return (
        <div key={index} className={`${classes.block} p-4`}>
          <div>{item.dateMovie}</div>
          <div className="d-flex flex-wrap">
            {listSession.map((session, index) => {
              return (
                <Box
                  key={index}
                  py={1}
                  px={2}
                  className={classes.session}
                  onClick={() =>
                    this.handleOnChooseSession(item, session, account)
                  }
                >
                  {session}
                </Box>
              );
            })}
          </div>
        </div>
      );
    });
  };

  isMovieShowing = (date) => {
    const now = new Date().setHours(0, 0, 0, 0);
    if (Date.parse(date) <= now) return true;
    else return false;
  };

  render() {
    const { classes, movies } = this.props;
    let account = JSON.parse(localStorage.getItem("account"));
    const { timeOfMovie, isShow } = this.state;
    let movieShowing = movies.filter((item) =>
      this.isMovieShowing(item.premiereDate)
    );
    return (
      <div className="container my-4">
        <div className="row">
          <ColumnBlock title="Chọn phim">
            {this.showMovieToChoose(movieShowing, classes)}
          </ColumnBlock>

          <ColumnBlock title="Chọn suất">
            {isShow && this.showTimeOfMovie(timeOfMovie, classes, account)}
          </ColumnBlock>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.MovieReducer.movie,
    showtimes: state.ShowTimesReducer.showtime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDataMovie: () => {
      dispatch(actFetchDataMovieRequest());
    },
    receiveMovieChoosing: (movie, date, time, idUser) => {
      dispatch(actReceiveMovieChoosing(movie, date, time, idUser));
    },
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withStyles(styles), withConnect)(BuyTicketPage);
