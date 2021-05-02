import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions/movieManager/index";
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
          numOfRoom: "",
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
      showtime.cinema.numOfRoom === "" ||
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
      const temp = {
        movieId: this.state.movie.id,
        cinemaId: this.state.showtime.cinema.id,
        roomId: this.state.showtime.room,
        date: this.state.showtime.date,
      };
      console.log(temp);
      this.props.onLoadShowtime(temp);
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
    const regexp = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    const val = this.state.addedShowtime;
    const check = regexp.exec(val);
    if (check != null) {
      const arr = this.state.optionRoom;
      const temp = val.split(":");
      let hours = parseInt(temp[0]);
      let minutes = parseInt(temp[1]);
      hours += 1;
      if (hours == 24) hours = 0;
      let end =
        (hours < 10 ? "0" + hours.toString() : hours.toString()) +
        ":" +
        (minutes < 10 ? "0" + minutes.toString() : minutes.toString());
      const obj = {
        id: this.state.optionRoom.length + 1,
        startTime: val,
        endTime: end,
      };
      arr.push(obj);
      arr.sort(function (a, b) {
        var keyA = a.startTime,
          keyB = b.startTime;
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });
      this.setState({ optionRoom: arr, checkMessage: "" });
    } else {
      this.setState({ checkMessage: "error" });
    }
  };

  render() {
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
                    const temp = this.props.cinemaInfo.cinema[e.target.value];
                    const temp2 = [];
                    for (let i = 1; i <= temp.numOfRoom; i++) temp2.push(i);
                    const temp3 = [];
                    const temp4 = [];
                    for (let i = 0; i < 24; i++) temp3.push(i);
                    for (let i = 0; i < 60; i++) temp4.push(i);
                    this.setState((prevState) => ({
                      showtime: {
                        ...prevState.showtime,
                        cinema: {
                          ...temp,
                        },
                        room: "",
                        date: "",
                      },
                      showRoom: temp2,
                      hourPicker: temp3,
                      minutePicker: temp4,
                    }));
                  }}
                >
                  <option key={0}></option>
                  {this.props.cinemaInfo.cinema.map((item, index) => {
                    return (
                      <option key={index + 1} value={index}>
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
                        room: e.target.value,
                      },
                    }));
                  }}
                >
                  <option key={0}></option>
                  {this.state.showRoom.map((item, index) => {
                    return (
                      <option key={index + 1} value={item}>
                        {item}
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
                  minDate={new Date()}
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
                  value={this.state.addHour}
                  onChange={(e) => {
                    this.setState((prevState) => ({
                      addHour: e.target.value,
                    }));
                  }}
                >
                  <option key={-1}></option>

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
                  value={this.state.addMinute}
                  onChange={(e) => {
                    this.setState((prevState) => ({
                      addMinute: e.target.value,
                    }));
                  }}
                >
                  <option key={-1}></option>

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
                value={this.state.movie.name}
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
            {this.state.optionRoom.map((item) => {
              return (
                <article className="book">
                  <img src={item.movie.thumbnail} alt="" />
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
                    {item.startTime} - {item.endTime}
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
    onLoadShowtime: (showtime) => {
      console.log("dispatch");
      dispatch(actions.getShowtime(showtime));
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
