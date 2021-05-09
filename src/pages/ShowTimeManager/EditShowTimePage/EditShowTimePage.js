import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions/movieManager/index";
import * as actions2 from "../../../actions/showtimeManager/index";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { Button, Modal } from "react-bootstrap";
import "./EditShowTimePageStyles.css";

class EditShowTimePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {
        id: "",
        name: "",
      },
      invalidMessage: "",
      checkMessage: "",
      showtime: {
        cinema: {
          id: "",
          name: "",
          address: "",
        },
        room: "",
        date: "",
      },
      showRoom: [],
      optionRoom: [],
      addedShowtime: "",
      addHour: "",
      addMinute: "",
      hourPicker: [],
      minutePicker: [],
      showEdit: "hideMenu",
    };
  }

  validateDataShowtime = () => {
    const showtime = this.state.showtime;
    if (
      showtime.cinema.id === "" ||
      showtime.cinema.name === "" ||
      showtime.cinema.address === "" ||
      showtime.room === "" ||
      showtime.date === ""
    ) {
      return false;
    }
    return true;
  };

  saveMovie = (event) => {
    event.preventDefault();
    if (this.validateMovie() === true) {
      this.props.onSaveMovie(this.state.movie);
      console.log("save movie 1", this.state.movie);
      this.props.onToggleMovieForm();
    } else {
      this.setState({
        invalidMessage: "Vui lòng nhập đầy đủ thông tin",
      });
    }
  };

  loadShowtime = (event) => {
    if (this.validateDataShowtime() === true) {
      this.setState({
        optionRoom: [],
        showEdit: "hideMenu",
      });
      let month = this.state.showtime.date.getMonth() + 1;
      let day = this.state.showtime.date.getDay() + 1;
      if (month < 10) {
        month = "0" + month.toString();
      } else {
        month = month.toString();
      }
      if (day < 10) {
        day = "0" + day.toString();
      } else {
        day = day.toString();
      }
      // let d = new Date();
      // d.toISOString
      let dateString =
        this.state.showtime.date.getFullYear().toString() +
        "-" +
        month +
        "-" +
        day;
      console.log(this.state.showtime.room, dateString);
      this.props.onLoadShowtime(this.state.showtime.room, dateString);
      this.props.onLoadMovies();
      this.setState({
        optionRoom: this.props.cinemaInfo.showtime,
        showEdit: "showMenu",
      });
    } else {
      this.setState({
        invalidMessage: "Vui lòng nhập đầy đủ thông tin",
        optionRoom: [],
        showEdit: "hideMenu",
      });
    }
  };

  addShowtime = (event) => {
    if (
      this.state.addHour === -1 ||
      this.state.addMinute === -1 ||
      this.state.movie.id === ""
    ) {
      this.setState({ checkMessage: "error" });
    } else {
      let month = this.state.showtime.date.getMonth() + 1;
      let day = this.state.showtime.date.getDay() + 1;
      if (month < 10) {
        month = "0" + month.toString();
      } else {
        month = month.toString();
      }
      if (day < 10) {
        day = "0" + day.toString();
      } else {
        day = day.toString();
      }
      // let d = new Date();
      // d.toISOString
      let dateString =
        this.state.showtime.date.getFullYear().toString() +
        "-" +
        month +
        "-" +
        day;
      const temp = {
        date: dateString,
        hour: this.state.addHour,
        minute: this.state.addMinute,
        advertiseTime: 10,
        roomId: this.state.showtime.room,
        movieId: this.state.movie.id,
      };
      console.log("addshowtime: ", temp);
      actions2.actAddShowtimeRequest(temp).then((res) => console.log(res));
      this.setState({ checkMessage: "" });
    }
  };

  render() {
    console.log("abc: ", this.props.cinemaInfo.cinema);
    const movies = this.props.movies;
    return (
      <div>
        <h3>Chỉnh sửa lịch chiếu:</h3>
        <br />
        <br />
        <form onSubmit={this.saveMovie}>
          <div className="row justify-content-md-center">
            <div className="col-3">
              <div className="form-group">
                <label>Chọn rạp chiếu:</label>
                <select
                  className="mr-2 ml-2"
                  onChange={(e) => {
                    const temp3 = [];
                    const temp4 = [];
                    for (let i = 0; i < 24; i++) temp3.push(i);
                    for (let i = 0; i < 60; i++) temp4.push(i);
                    let temp = { id: "", name: "", address: "" };
                    if (e.target.value == 0) {
                      this.setState((prevState) => ({
                        showtime: {
                          ...prevState.showtime,
                          cinema: {
                            ...temp,
                          },
                          room: "",
                          date: "",
                        },
                        showRoom: [],
                        hourPicker: temp3,
                        minutePicker: temp4,
                      }));
                    } else {
                      temp = this.props.cinemaInfo.cinema.filter(
                        (item) => item.id === parseInt(e.target.value)
                      );
                      temp = temp[0];
                      this.props.onLoadCinemaRooms(parseInt(e.target.value));
                      console.log(this.props.cinemaInfo.rooms);
                      this.setState((prevState) => ({
                        showtime: {
                          ...prevState.showtime,
                          cinema: {
                            ...temp,
                          },
                          room: "",
                          date: "",
                        },
                        showRoom: this.props.cinemaInfo.rooms,
                        hourPicker: temp3,
                        minutePicker: temp4,
                      }));
                    }
                    // const temp2 = [];
                    // for (let i = 1; i <= temp.numOfRoom; i++) temp2.push(i);
                  }}
                >
                  <option key={0} value={0}></option>
                  {this.props.cinemaInfo.cinema.map((item, index) => {
                    return (
                      <option key={index + 1} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label>Chọn phòng chiếu:</label>
                <select
                  className="mr-2 ml-2"
                  value={this.state.showtime.room}
                  onChange={(e) => {
                    this.setState((prevState) => ({
                      showtime: {
                        ...prevState.showtime,
                        room: parseInt(e.target.value),
                      },
                    }));
                  }}
                >
                  <option key={0}></option>
                  {this.props.cinemaInfo.rooms.map((item, index) => {
                    return (
                      <option key={index + 1} value={item.id}>
                        {item.roomNumber}
                      </option>
                    );
                  })}
                </select>
                <p>{this.state.showtime.room}</p>
              </div>
            </div>
          </div>
          <div className="row justify-content-md-center">
            <div className="col-3">
              <div className="form-group">
                <label style={{ marginRight: "5px" }}>Chọn ngày: </label>
                <DatePicker
                  selected={this.state.showtime.date}
                  onChange={(selectedDate) =>
                    this.setState((prevState) => ({
                      showtime: {
                        ...prevState.showtime,
                        date: selectedDate,
                      },
                    }))
                  }
                  dateFormat="dd/MM/yyyy"
                  // minDate={new Date()}
                />
                <p>{this.state.showtime.date.toString()}</p>
              </div>
            </div>
            <div className="col-3">
              <Button onClick={this.loadShowtime}>Load</Button>
              {/* <label>Chọn phim: </label>
              <select
                className="mr-2 ml-2"
                value={this.state.movie}
                onChange={(e) => {
                  const movie_temp = movies.filter(
                    (item) => item.id === e.target.value
                  );
                  this.setState((prevState) => ({
                    movie: {
                      id: movie_temp.id,
                      name: movie_temp.name,
                    },
                  }));
                }}
              >
                <option key={0}></option>
                {movies.map((item, index) => {
                  return (
                    <option key={index + 1} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </select> */}
            </div>
          </div>
        </form>
        <h5 className="text-danger">
          {this.state.invalidMessage !== "" ? this.state.invalidMessage : ""}
        </h5>

        <form action="" className={`${this.state.showEdit}`}>
          <hr />
          <div className="row">
            <div className="col-6">
              <p style={{ color: "black", margin: "12px 5px auto auto" }}>
                Thêm lịch chiếu mới:
              </p>
              <br />
            </div>
          </div>
          <div className="row justify-content-md-center">
            <div className="col-1">
              <div className="form-group" style={{ display: "flex" }}>
                {/* <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Định dạng: hh:mm"
                      value={this.state.addedShowtime}
                      onChange={(e) =>
                        this.setState({ addedShowtime: e.target.value })
                      }
                    />
                 
                     */}
                <select
                  className="mr-2 ml-2"
                  onChange={(e) => {
                    this.setState((prevState) => ({
                      addHour: parseInt(e.target.value),
                    }));
                  }}
                >
                  <option key={-1} value={-1}></option>

                  {this.state.hourPicker.map((item, index) => {
                    return (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>
                <p>{this.state.addHour}</p>
                <select
                  className="mr-2 ml-2"
                  onChange={(e) => {
                    this.setState((prevState) => ({
                      addMinute: parseInt(e.target.value),
                    }));
                  }}
                >
                  <option key={-1} value={-1}></option>

                  {this.state.minutePicker.map((item, index) => {
                    return (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>
                <p>{this.state.addMinute}</p>
              </div>
            </div>
            <div className="col-3" style={{ marginTop: "7px" }}>
              <label>Chọn phim: </label>
              <select
                className="mr-2 ml-2"
                onChange={(e) => {
                  let val = parseInt(e.target.value);
                  if (val === 0) {
                    this.setState((prevState) => ({
                      movie: {
                        id: "",
                        name: "",
                      },
                    }));
                  } else {
                    let movie_temp = this.props.cinemaInfo.movie.filter(
                      (item) => item.id === val
                    );
                    movie_temp = movie_temp[0];
                    this.setState((prevState) => ({
                      movie: {
                        id: movie_temp.id,
                        name: movie_temp.name,
                      },
                    }));
                  }
                }}
              >
                <option key={0} value={0}></option>
                {this.props.cinemaInfo.movie.map((item, index) => {
                  return (
                    <option key={index + 1} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-1">
              <button
                type="button"
                className="btn btn-primary"
                style={{ marginLeft: "5px" }}
                onClick={this.addShowtime}
              >
                <span className="fa fa-plus"></span>
              </button>
            </div>
          </div>
          <h5 className="text-danger">
            {this.state.checkMessage !== "error"
              ? this.state.checkMessage
              : "Vui lòng nhập đúng định dạng"}
          </h5>
          <div className="booklist">
            {this.props.cinemaInfo.showtimes.map((item) => {
              return (
                <article className="book">
                  <img src={item.movie.image} alt="" />
                  <h4>{item.movie.name}</h4>
                  <button
                    type="button"
                    className="btn btn-danger"
                    style={{ marginRight: "10px" }}
                    onClick={this.deleteShowtimes}
                  >
                    <span className="far fa-trash-alt"></span>
                  </button>
                  <label>
                    {item.startTime.slice(11, 16)} -{" "}
                    {item.endTime.slice(11, 16)}
                  </label>
                </article>
              );
            })}
          </div>
          {/* <Button onClick={this.saveMovie}>Save</Button>
          <Button onClick={this.toggleModal}>Close</Button> */}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.movies,
    movieInfo: state.movieInfo,
    cinemaInfo: state.reducerShowTime,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onToggleMovieForm: () => {
      dispatch(actions.toggleMovieForm());
    },
    onSaveMovie: (movie) => {
      dispatch(actions.saveMovie(movie));
    },
    onGetMovieInfo: (movie) => {
      dispatch(actions.getMovieInfo(movie));
    },
    onLoadShowtime: (roomId, dateString) => {
      dispatch(actions2.actFetchShowtimesRequest(roomId, dateString));
    },
    onLoadCinemaRooms: (cinemaId) => {
      dispatch(actions2.actFetchRoomDataRequest(cinemaId));
    },
    onLoadMovies: () => {
      dispatch(actions2.actFetchMoviesRequest());
    },
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

export default connect(mapStateToProps, mapDispatchToProps)(EditShowTimePage);
