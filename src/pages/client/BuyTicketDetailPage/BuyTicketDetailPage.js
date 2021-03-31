import { withStyles } from "@material-ui/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
// import {
//   actFetchDataFoodRequest,
//   actFetchDataTicketRequest,
//   actCreateBookingRequest,
//   actFetchDataBookingMovieRequest,
// } from "../../actions/action";
import Table from "../../components/client/Table/Table";
import styles from "./BuyTicketDetailStyle";
import SeatPickers from "../../components/client/SeatPicker/SeatPickers";
import history from "../../commons/history";
class BuyTicketDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticketArr: [],
      foodArr: [],
      onNextPage: false,
      arrSeatChoosing: [],
      totalAllTicket: 0,
      totalAllFood: 0,
    };
  }

  componentDidMount() {
    this.props.fetchDataTicket();
    this.props.fetchDataFood();
    this.props.fetchDataBooking();
  }

  countAllTotalTicket = (obj, indexTicket) => {
    let newTicket = this.state.ticketArr;
    newTicket[indexTicket] = obj;
    this.setState({
      ticketArr: newTicket,
    });
  };

  countAllTotalFood = (obj, indexFood) => {
    let newFood = this.state.foodArr;
    newFood[indexFood] = obj;
    this.setState({
      foodArr: newFood,
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
      foodArr: [],
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

  seatsDisabled = (bookings, movie, time, dateMovie) => {
    let dataSeats = [];
    for (let i = 0; i < bookings.length; i++) {
      if (
        bookings[i].date === dateMovie &&
        bookings[i].time === time &&
        bookings[i].idMovie === movie._id
      ) {
        for (let j = 0; j < bookings[i].seats.length; j++) {
          dataSeats.push(bookings[i].seats[j]);
        }
      }
    }
    let seats = [];
    if (dataSeats.length > 0) {
      for (let z = 0; z < dataSeats.length; z++) {
        let checkFirst = dataSeats[z].substring(0, 1);
        let checkSecond = dataSeats[z].substring(1, 2);

        let checkSecondNumber = Number(checkSecond);
        if (checkFirst === "A") {
          if (checkSecondNumber === 0) {
            seats.push(10);
          } else {
            seats.push(checkSecondNumber);
          }
        } else if (checkFirst === "B") {
          if (checkSecondNumber === 0) {
            seats.push(20);
          } else {
            seats.push(10 + checkSecondNumber);
          }
        } else if (checkFirst === "C") {
          if (checkSecondNumber === 0) {
            seats.push(30);
          } else {
            seats.push(20 + checkSecondNumber);
          }
        } else if (checkFirst === "D") {
          if (checkSecondNumber === 0) {
            seats.push(40);
          } else {
            seats.push(30 + checkSecondNumber);
          }
        } else if (checkFirst === "E") {
          if (checkSecondNumber === 0) {
            seats.push(50);
          } else {
            seats.push(40 + checkSecondNumber);
          }
        } else if (checkFirst === "F") {
          if (checkSecondNumber === 0) {
            seats.push(60);
          } else {
            seats.push(50 + checkSecondNumber);
          }
        } else if (checkFirst === "G") {
          if (checkSecondNumber === 0) {
            seats.push(70);
          } else {
            seats.push(60 + checkSecondNumber);
          }
        } else if (checkFirst === "H") {
          if (checkSecondNumber === 0) {
            seats.push(80);
          } else {
            seats.push(70 + checkSecondNumber);
          }
        }
      }
	}
	return seats;
  };

  handleSubmit = (
    choosing,
    roomName,
    amountTicket,
    totalAllFood,
    totalAllTicket
  ) => {
    console.log("totalAllTicket", totalAllTicket);
    console.log("totalAllFood", totalAllFood);
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
        foodPrice: totalAllFood,
        tickCode,
      };
      console.log("data:", data);
      localStorage.setItem("booking", JSON.stringify(data));
      history.push(`/pay-movie`);
    } else if (this.state.arrSeatChoosing.length === 0) {
      alert("Vui lòng chọn ghế!");
    } else {
      alert("Vui lòng chọn đủ số ghế!");
    }
  };
  render() {
    let { bookings, choosing, classes, tickets, foodCombo } = this.props;
    const { movie, date, time } = choosing;
    console.log(bookings);	
    let room = {
      numberSeat: 80,
      seatReserved: this.seatsDisabled(bookings, movie, time, date.dateMovie),
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
    for (let i = 0; i < date.frameTime.length; i++) {
      if (date.frameTime[i].time === time) {
        dataDate = date.frameTime[i];
      }
    }
    
    //-----------------------------------------------------

    const { ticketArr, foodArr, onNextPage } = this.state;
    let totalAllTicket = this.countTotal(ticketArr);
    let totalAllFood = this.countTotal(foodArr);
    let totalBoth = totalAllFood + totalAllTicket;
    let title = onNextPage ? "Chọn ghế" : "Chọn vé/ thức ăn";
    let amountTicket = ticketArr
      .map((item) => item.total)
      .reduce((a, b) => a + b, 0);

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
                {
                  <Table
                    type="Combo"
                    arrData={foodCombo}
                    countAllTotal={(obj, index) =>
                      this.countAllTotalFood(obj, index)
                    }
                    totalAll={totalAllFood}
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
                src={movie.image}
              ></img>
              <div className="text-uppercase text-center font-weight-bold pt-1">
                {movie.name}
              </div>
              <div className="p-2">
                <strong>Room: </strong>
                {dataDate.room}
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
              <span>
                <hr className="m-0" />
                <div className="p-2">
                  <strong>Tổng giá combo: </strong>
                  <span>{totalAllFood.toLocaleString()}</span>
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
                      this.handleSubmit(
                        choosing,
                        dataDate.room,
                        amountTicket,
                        totalAllFood,
                        totalAllTicket
                      )
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
    choosing: state.reducerMovie.choosing,
    tickets: state.reducerTickets.tickets,
    foodCombo: state.reducerFoods.foodCombo,
    bookings: state.reducerMovie.bookingMovie,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDataBooking: () => dispatch(actFetchDataBookingMovieRequest()),
    fetchDataTicket: () => dispatch(actFetchDataTicketRequest()),
    fetchDataFood: () => dispatch(actFetchDataFoodRequest()),
    createBooking: (data) => dispatch(actCreateBookingRequest(data)),
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withStyles(styles), withConnect)(BuyTicketDetailPage);
