import { withStyles } from "@material-ui/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import ColumnBlock from "../../../components/client/ColumnBlock/ColumnBlock";
import styles from "./BuyTicketPageStyles";
import {
  actFetchDataMovieRequest,
  actReceiveMovieChoosing,
  actFetchDataBookingMovieRequest,
} from "../../../actions/index";
import { Box } from "@material-ui/core";
import history from "../../../commons/history";

class BuyTicketPage extends React.Component {
  constructor() {
    super();
    this.state = {
      timeOfMovie: [],
      mv: [],
      isShow: false,
      isMovieShow: false,
      active: "",
    };
  }

  componentDidMount() {
    // this.props.fetchAllDataMovie();
  }

  showTheaterToChoose = (arr, classes) => {
    
    return arr.map((item, index) => {
      
      let active = this.state.active.id === item.cinema.id ? classes.active : "";
      return (
        <div
          key={index}
          className={`${classes.block}`}
          onClick={() => {
            this.handleOnChooseTheater(item);
          }}
        >
          <div className={`${classes.link} ${active} row no-gutters p-3`}>
            <p className={`${classes.title} col-9 pl-4`}>{item.cinema.name}</p>
          </div>
        </div>
      );
    });
  };

  handleOnChooseTheater = (tt) => {
    let movieShowing = tt.movies.filter((item) =>
      this.isMovieShowing(item.releaseDate)
    );
    this.setState({
      timeOfMovie: [],
      isShow: false,
      mv: movieShowing,
      isMovieShow:true,
      active: "",
    });
  };

  showMovieToChoose = (arr, classes) => {
    return arr.map((item, index) => {
      
      let active = this.state.active.id === item.id ? classes.active : "";
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
              <img alt="" className={classes.img} src={item.image?.mainUrl}  />
            </span>
            <p className={`${classes.title} col-9 pl-4`}>{item.name}</p>
          </div>
        </div>
      );
    });
  };

  handleOnChooseMovie = (mv) => {
    var TOS = [];
    var dates =[];
    // mv.showtimes.map((item,index) => {
    //   TOS.push(item.startTime.split("T")[0]);
    // });
    let showing = mv.showtimes.filter((item) =>
      this.isShowing(item.startTime.split("T")[0])
    );
    showing.map((item,index) => {
      TOS.push(item.startTime.split("T")[0]);
    });
    var TiOfS =[];
    TOS.map((item,index)=>{
      var ShowTimes =[];
      mv.showtimes.map((i,index) => {
        if(i.startTime.split("T")[0]==item){
          var O={
            id: i.id,
            time: i.startTime.split("T")[1].split(".")[0],
          }
          ShowTimes.push(O);
        }
      });
      var obj = {
        dateMovie: item,
        showtimes: ShowTimes,
      }
      if(!dates.includes(item)){
        
        TiOfS.push(obj)
        dates.push(item)
      }
    });
    let TimeOfShowtime = Array.from(new Set(TiOfS));
    
    this.setState({
      timeOfMovie: TimeOfShowtime,
      isShow: true,
      active: mv,
    });
    
  };
  
  showTimeOfMovie = (arr, classes, account) => {
    return arr.map((item, index) => {
      const listSession = item.showtimes.map((obj) => obj.time);
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

  handleOnChooseSession = (item, session, account) => {
    if (account && Object.keys(account).length > 0) {
      const movie = this.state.active;
      this.props.receiveMovieChoosing(movie, item, session, account.user.id);
      const slug = movie.name;
      this.props.history.push(`/buy-ticket-detail/${slug}`);
    } else {

      alert("Vui lòng đăng nhập!");
      window.location.href = "/login"
    }
  };

  isMovieShowing = (date) => {
    const now = new Date().setHours(0, 0, 0, 0);
    if (Date.parse(date) < now) return true;
    else return false;
  };
  isShowing = (date) => {
    const now = new Date().setHours(0, 0, 0, 0);
    if (Date.parse(date) >= now) return true;
    else return false;
  };

  render() {
    
    const { classes, theater } = this.props;
    
    let account = JSON.parse(localStorage.getItem("account"));
    const { timeOfMovie,mv, isShow,isMovieShow } = this.state;
    return (
      <div className="container my-4">
        <div className="row">
          <ColumnBlock title="Chọn rạp">
            {this.showTheaterToChoose(theater, classes)}
          </ColumnBlock>
          <ColumnBlock title="Chọn phim">
            {isMovieShow && this.showMovieToChoose(mv, classes)}
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
    theater: state.MovieReducer.theater,
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
    fetchDataBooking: (showtimeId) => {
      dispatch(actFetchDataBookingMovieRequest(showtimeId));
    },
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withStyles(styles), withConnect)(BuyTicketPage);
