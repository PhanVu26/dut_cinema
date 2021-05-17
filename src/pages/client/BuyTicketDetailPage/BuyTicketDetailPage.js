import { withStyles } from "@material-ui/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  actFetchDataTicketRequest,
  actCreateBookingRequest,
  actFetchDataBookingMovieRequest,
} from "../../../actions/index";
import Table from "../../../components/client/Table/Table";
import styles from "./BuyTicketDetailStyle";
import SeatPickers from "../../../components/client/SeatPicker/SeatPickers";
import history from "../../../commons/history";
import { isEmpty } from "lodash";

class BuyTicketDetailPage extends Component {
  constructor(props) {
    super(props);
    let {choosing,bookings} = this.props;
    const { movie, date, time } = choosing;
    var startTime = date.dateMovie+"T"+time+".000Z";
    var showtimeId = movie.showtimes.map((item)=>{
      if(item.startTime===startTime) return item.id
    });
    console.log(showtimeId[0]);
    console.log(this.props);
    this.state = {
      showtime_id: showtimeId[0],
      ticketArr: [],
      onNextPage: false,
      arrSeatChoosing: [],
      totalAllTicket: 0,
    };
  }

  componentDidMount() {
    this.props.fetchDataTicket();
    this.props.fetchDataBooking(this.state.showtime_id);
  }

  countAllTotalTicket = (obj, indexTicket) => {
    let newTicket = this.state.ticketArr;
    newTicket[indexTicket] = obj;
    this.setState({
      ticketArr: newTicket,
    });
  };

  countTotal = (arr) => {
    let totalArr = arr.map((item) => item.total * item.price);
    return totalArr.reduce((a, b) => a + b, 0);
  };

  handleOnNextPage = (totalAllTicket) => {
    if (totalAllTicket > 0) {
      this.setState((prevState) => ({
        onNextPage: !prevState.onNextPage,
      }));
    } else {
      alert("Vui long chon so luong ve!");
    }
  };

  handleOnPreviouPage = () => {
    this.setState((prevState) => ({
      onNextPage: !prevState.onNextPage,
      ticketArr: [],
    }));
  };

  showNameSeatArr = (arr) => {
    const nameSeat = arr.map((item) => {
      return `${String.fromCharCode(item / 10 + 65)}${item % 10}`;
    });
    console.log("nameSeat:", nameSeat);
    this.setState({
      arrSeatChoosing: nameSeat,
    });
  };

  makeid = (length) => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  seatsDisabled = (bookings) => {
    var num_seat = 30;
    let dataSeats = [];
    if(bookings.tickets!==undefined){
      for (let i = 0; i < num_seat; i++) {
        if ( bookings.tickets[i].status === "Booked") {
          dataSeats.push(bookings.tickets[i].seat);
        }
      }
    }
    let seats = [];
    if (dataSeats.length > 0) {
      for (let z = 0; z < dataSeats.length; z++) {
        let checkRow = dataSeats[z].row;
        let checkColumn = dataSeats[z].column;

        let checkColumnNumber = Number(checkColumn);
        if (checkRow === "A") {
          seats.push(checkColumnNumber);
        } else if (checkRow === "B") {
          seats.push(10 + checkColumnNumber);
        } else if (checkRow === "C") {
          seats.push(20 + checkColumnNumber);
        } else if (checkRow === "D") {
          seats.push(30 + checkColumnNumber);
        } else if (checkRow === "E") {
          seats.push(40 + checkColumnNumber);
        } else if (checkRow === "F") {
          seats.push(50 + checkColumnNumber);
        } else if (checkRow === "G") {
          seats.push(60 + checkColumnNumber);
        } else if (checkRow === "H") {
          seats.push(70 + checkColumnNumber);
        }
      }
	}
	return seats;
  };

  handleSubmit = (
    choosing,
    roomName,
    amountTicket,
    totalAllTicket
  ) => {
    console.log("totalAllTicket", totalAllTicket);
    if (this.state.arrSeatChoosing.length === amountTicket) {
      let tickCode = this.makeid(8);
      console.log(this.state.arrSeatChoosing);
      let data = {
        idUser: choosing.idUser,
        idMovie: choosing.movie._id,
        room: roomName,
        nameMovie: choosing.movie.name,
        date: choosing.date.dateMovie,
        time: choosing.time,
        seats: this.state.arrSeatChoosing,
        ticketPrice: totalAllTicket,
        tickCode,
      };
      console.log("data:", data);
      localStorage.setItem("booking", JSON.stringify(data));
      history.push(`/pay-movie`);
      history.go();
    } else if (this.state.arrSeatChoosing.length === 0) {
      alert("Vui lòng chọn ghế!");
    } else {
      alert("Vui lòng chọn đủ số ghế!");
    }
  };
  render() {
    console.log(this.props);
    let { bookings, choosing, classes, tickets} = this.props;
    const { movie, date, time } = choosing;
    console.log(bookings);
    console.log(tickets);
    let room = {
      numberSeat: 30,
      seatReserved: this.seatsDisabled(bookings),
    };
    console.log("choosing:", choosing);

    if (Object.keys(choosing).length !== 0) {
      localStorage.setItem("choosing", JSON.stringify(choosing));
    } else {
      choosing = JSON.parse(localStorage.getItem("choosing"));
    }

    //----------------------------------------------------
    //find room, date, time in movie bookings
    let dataDate;
    for (let i = 0; i < date.showtimes.length; i++) {
      if (date.showtimes[i].time === time) {
        dataDate = date.showtimes[i];
      }
    }
    
    //-----------------------------------------------------

    const { ticketArr, onNextPage } = this.state;
    let totalAllTicket = this.countTotal(ticketArr);
    let totalBoth = totalAllTicket;
    let title = onNextPage ? "Chọn ghế" : "Chọn vé";
    let amountTicket = ticketArr.map((item) => item.total).reduce((a, b) => a + b, 0);
    let roomid ="";
    if(bookings.room!==undefined){
      roomid=bookings.room.id;
    }
    return (
      <div className="container-fluid my-4">
        <div className="row no-gutters">
          <div className={`${classes.chooseMovie} col-md-8 p-2`}>
            <div className={`text-uppercase ${classes.header}`}>{title}</div>
            {!onNextPage && (
              <div className={classes.body}>
                {
                  <Table
                    type="Loại vé"
                    arrData={tickets}
                    countAllTotal={(obj, index) =>
                      this.countAllTotalTicket(obj, index)
                    }
                    totalAll={totalAllTicket}
                  />
                }
              </div>
            )}
            {onNextPage && (
              <div className={classes.body}>
                <div className={`bg-white ${classes.wrap}`}>
                  <div className={classes.wrapScreen}>
                    <div className={classes.screen}>Screen show</div>
                  </div>
                  <SeatPickers
                    roomDetail={room}
                    amountTicket={amountTicket}
                    showNameSeat={(arr) => this.showNameSeatArr(arr)}
                    className="w-100"
                  />
                  <div className="py-4 w-25 m-auto">
                    <div className="d-flex align-items-center">
                      <span
                        className={`${classes.cell} ${classes.reversed}`}
                      ></span>
                      <span className="mr-4">Ghế đã được đặt</span>
                    </div>
                    <div className="mt-3 d-flex align-items-center">
                      <span
                        className={`${classes.cell} ${classes.canChoose}`}
                      ></span>
                      <span className="mr-4">Ghế có thể chọn</span>
                    </div>
                    <div className="mt-3 d-flex align-items-center">
                      <span
                        className={`${classes.cell} ${classes.choosing}`}
                      ></span>
                      <span className="mr-4">Ghế đang chọn</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className={`col-md-4`}>
            <div className={`${classes.movie} ml-3`}>
              <img
                alt=""
                className={classes.imageMovie}
                src="https://www.galaxycine.vn/media/2020/10/29/450-anime_1603948617423.jpg"
              ></img>
              <div className="text-uppercase text-center font-weight-bold pt-1">
                {movie.name}
              </div>
              <div className="p-2">
                <strong>Room: </strong>
                {roomid}
              </div>{" "}
              <hr className="m-0" />
              <div className="p-2">
                <strong>Suất chiếu: </strong>
                {time} | {date.datemovie}
              </div>
              <hr className="m-0" />
              <div className="p-2">
                <strong>Ghế: </strong>
                {this.state.arrSeatChoosing.map((item) => (
                  <span>{`${item} `}</span>
                ))}
              </div>
              <span>
                <hr className="m-0" />
                <div className="p-2">
                  <strong>Tổng giá vé: </strong>
                  <span>{totalAllTicket.toLocaleString()}</span>
                </div>
              </span>
              <hr className="m-0" />
              <h5 className={`${classes.total} p-2`}>
                Tổng: {totalBoth.toLocaleString()} VNĐ
              </h5>
              {!onNextPage && (
                <button
                  onClick={() => this.handleOnNextPage(totalAllTicket)}
                  className={classes.button}
                >
                  Tiếp tục <i className="pl-2 fas fa-arrow-right"></i>
                </button>
              )}
              {onNextPage && (
                <span className="d-flex justify-content-center">
                  <button
                    onClick={() => this.handleOnPreviouPage()}
                    className={`${classes.button} ${classes.buttonNomargin}`}
                  >
                    Quay Lại <i className="pl-2 fas fa-arrow-left"></i>
                  </button>
                  <button
                    onClick={() =>
                      this.handleSubmit(choosing, roomid, amountTicket,totalAllTicket)
                    }
                    className={`${classes.button} ${classes.buttonNomargin} ml-2`}
                  >
                    Đặt vé <i className="pl-2 fas fa-arrow-right"></i>
                  </button>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    choosing: state.MovieReducer.choosing,
    tickets: state.TicketReducer.tickets,
    bookings: state.MovieReducer.bookingMovie,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDataBooking: (showtimeId) => dispatch(actFetchDataBookingMovieRequest(showtimeId)),
    fetchDataTicket: () => dispatch(actFetchDataTicketRequest()),
    createBooking: (data) => dispatch(actCreateBookingRequest(data)),
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withStyles(styles), withConnect)(BuyTicketDetailPage);
