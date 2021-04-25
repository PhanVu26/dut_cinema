import { Button, Modal } from "react-bootstrap";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../actions/movieManager/index";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import "./edit.css";
// import testThumbnail from "../../../assets/images/logo.png";
// import style from "../MovieModal/MovieModal.css";
class MovieForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {
        id: "",
        name: "",
        genreIds: [],
        author: "",
        producer: "",
        actorIds: [],
        releaseDate: "",
        thumbnail: "",
        description: "",
      },
      selectedActors: [],
      selectedGenres: [],
      invalidMessage: "",
      checkMessage: "",
      filterGenre: "",
      filterActor: "",
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
      showEdit: "hideMenu",
    };
  }

  findIndexActorById = (actorIds, id) => {
    console.log("actors:", actorIds);
    console.log("find id", id);
    var result = -1;
    actorIds.forEach((actorId, index) => {
      if (actorId.id === id) {
        result = index;
      }
    });
    console.log("result", result);
    return result;
  };

  findIndexGenreById = (genreIds, id) => {
    var result = -1;
    genreIds.forEach((genreId, index) => {
      if (genreId.id === id) {
        result = index;
      }
    });
    return result;
  };

  onHandleChange = (e) => {
    //console.log("e ,", e)
    var target = e.target;
    var name = target.name;
    var value = target.value;
    //console.log("value,", value)
    var id = e.target.id;

    //console.log(id)
    var thumbnail =
      e.target.files != null
        ? URL.createObjectURL(e.target.files[0])
        : this.state.movie.thumbnail;
    console.log("thumbnail", thumbnail);
    if (e.target.checked === true) {
      if (e.target.className === "actor-checkbox") {
        this.setState((prevState) => ({
          selectedActors: [...prevState.selectedActors, e.target.name],
          movie: {
            ...prevState.movie,
            actorIds: [
              ...prevState.movie.actorIds,
              {
                id: value,
                name: name,
              },
            ],
          },
        }));
      } else {
        this.setState((prevState) => ({
          selectedGenres: [...prevState.selectedGenres, e.target.name],
          movie: {
            ...prevState.movie,
            genreIds: [
              ...prevState.movie.genreIds,
              {
                id: value,
                name: name,
              },
            ],
          },
        }));
      }
    } else {
      if (e.target.className === "actor-checkbox") {
        if (value != "") {
          console.log("id: ", id);
          this.setState((prevState) => ({
            selectedActors: prevState.selectedActors.filter(
              (_, i) =>
                i !== this.findIndexActorById(this.state.movie.actorIds, value)
            ),
            movie: {
              ...prevState.movie,
              actorIds: prevState.movie.actorIds.filter(
                (_, i) =>
                  i !== this.findIndexActorById(prevState.movie.actorIds, value)
              ),
            },
          }));
        }
      } else {
        if (value != "") {
          console.log("id: ", id);
          this.setState((prevState) => ({
            selectedGenres: prevState.selectedGenres.filter(
              (_, i) =>
                i !== this.findIndexActorById(this.state.movie.genreIds, value)
            ),
            movie: {
              ...prevState.movie,
              genreIds: prevState.movie.genreIds.filter(
                (_, i) =>
                  i !== this.findIndexGenreById(prevState.movie.genreIds, value)
              ),
            },
          }));
        }
      }
    }
    this.setState((prevState) => ({
      movie: {
        ...prevState.movie,
        [name]: value,
        thumbnail: thumbnail,
      },
      //genreIds: genreIds
    }));
  };

  showActorCheckbox = (actors) => {
    var results = [];
    results = actors.map((actor) => {
      return (
        <div className="actor-item ml-3">
          <label htmlFor={"actor" + actor.id} className="mr-2">
            {actor.name}
          </label>
          <input
            defaultChecked={this.state.selectedActors.some(
              (actorName) => actorName === actor.name
            )}
            className="actor-checkbox"
            type="checkbox"
            id={"actor" + actor.id}
            name={actor.name}
            onChange={this.onHandleChange}
            value={actor.id}
          ></input>
          <br></br>
        </div>
      );
    });
    return results;
  };

  showChoosedActor = (actors) => {
    var choosedActors = [];
    choosedActors = actors.map((actor) => {
      return actor.name;
    });
    return choosedActors;
  };

  showGenreCheckbox = (genres) => {
    var results = [];
    results = genres.map((genre) => {
      console.log(
        "checked",
        this.state.selectedGenres.some((genreName) => genreName === genre.name)
      );
      return (
        <div className="genre-item ml-3">
          <label htmlFor={"genre" + genre.id} className="mr-2">
            {genre.name}
          </label>
          <input
            defaultChecked={this.state.selectedGenres.some(
              (genreName) => genreName === genre.name
            )}
            className="genre-checkbox"
            type="checkbox"
            id={"genre" + genre.id}
            name={genre.name}
            onChange={this.onHandleChange}
            value={genre.id}
          ></input>
          <br></br>
        </div>
      );
    });
    return results;
  };

  showChoosedGenres = (genres) => {
    var choosedGenres = [];
    choosedGenres = genres.map((genre) => {
      return genre.name;
    });
    return choosedGenres;
  };

  validateMovie = () => {
    const movie = this.state.movie;
    if (
      movie.name === "" ||
      movie.author === "" ||
      movie.description === "" ||
      movie.description === "" ||
      movie.genreIds.length == 0 ||
      movie.releaseDate === "" ||
      movie.thumbnail == "" ||
      movie.actorIds.length == 0
    ) {
      return false;
    }
    return true;
  };

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

  toggleModal = (event) => {
    this.setState((prevState) => ({
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
    }));
    this.props.onToggleMovieForm();
  };

  addShowtime = (event) => {
    const regexp = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    const val = this.state.addedShowtime;
    const check = regexp.exec(val);
    if (check != null) {
      const arr = this.state.optionRoom;
      arr.push(val);
      arr.sort();
      this.setState({ optionRoom: arr, checkMessage: "" });
    } else {
      this.setState({ checkMessage: "error" });
    }
  };

  onHandleSearchChange = (e) => {
    var { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentWillReceiveProps(nextProps) {
    console.log("nextprops", nextProps.movieInfo);
    if (nextProps.movieInfo) {
      this.setState({
        movie: nextProps.movieInfo,
        selectedGenres: nextProps.movieInfo.genreIds.map((genre) => {
          return genre.name;
        }),
        selectedActors: nextProps.movieInfo.actorIds.map((actor) => {
          return actor.name;
        }),
      });
    }
  }

  // optionRoom() {
  //   let arr = [];
  //   for (let i = 0; i < this.state.showtime.cinema.numOfRoom; i++) {
  //     arr.push(i + 1);
  //   }
  //   return arr;
  // }

  render() {
    const { isDisplayMovieForm } = this.props;
    const { movie } = this.state;
    const movieInfo = this.props.movieInfo;
    console.log("render");
    var { genres, actors } = this.props;

    console.log("state", this.state.selectedGenres);
    genres = genres.filter((genre) => {
      return (
        genre.name
          .toLowerCase()
          .indexOf(this.state.filterGenre.toLowerCase()) !== -1
      );
    });

    actors = actors.filter((actor) => {
      return (
        actor.name
          .toLowerCase()
          .indexOf(this.state.filterActor.toLowerCase()) !== -1
      );
    });

    return (
      <div>
        <Modal
          show={isDisplayMovieForm}
          size="lg"
          style={{ maxWidth: "100%", width: "100%" }}
        >
          <Modal.Header>
            Chỉnh sửa lịch chiếu: <b>{this.state.movie.name}</b>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.saveMovie}>
              <div className="row">
                <div className="col-md-6 col-lg-6">
                  <div className="form-group">
                    <label>Chọn rạp chiếu:</label>
                    <select
                      className="mr-2 ml-2"
                      onChange={(e) => {
                        const temp = this.props.cinemaInfo.cinema[
                          e.target.value
                        ];
                        const temp2 = [];
                        for (let i = 1; i <= temp.numOfRoom; i++) temp2.push(i);
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
                <div className="col-md-6 col-lg-6">
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
              <div className="row">
                <div className="col-md-6 col-lg-6">
                  <div className="form-group">
                    <label>Chọn ngày: </label>
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
                <div className="col-md-6 col-lg-6">
                  <Button onClick={this.loadShowtime}>Load</Button>
                </div>
              </div>
            </form>
            <h5 className="text-danger">
              {this.state.invalidMessage !== ""
                ? this.state.invalidMessage
                : ""}
            </h5>

            <form action="" className={`${this.state.showEdit}`}>
              <hr />

              <div className="row">
                <div className="col-md-6 col-lg-6">
                  <div className="form-group" style={{ display: "flex" }}>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Định dạng: hh:mm"
                      value={this.state.addedShowtime}
                      onChange={(e) =>
                        this.setState({ addedShowtime: e.target.value })
                      }
                    />
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
                <div className="col-md-6 col-lg-6">
                  <div className="form-group" style={{ display: "flex" }}>
                    <p style={{ color: "black", margin: "auto 5px auto auto" }}>
                      Xóa lịch chiếu đã chọn:
                    </p>
                    <button
                      type="button"
                      className="btn btn-danger"
                      style={{ marginLeft: "10px" }}
                      onClick={this.deleteShowtimes}
                    >
                      <span className="far fa-trash-alt"></span>
                    </button>
                  </div>
                </div>
              </div>
              <h5 className="text-danger">
                {this.state.checkMessage !== "error"
                  ? this.state.checkMessage
                  : "Vui lòng nhập đúng định dạng"}
              </h5>
              <p>Thông tin lịch chiếu:</p>
              <div className="booklist">
                {this.state.optionRoom.map((item, index) => {
                  return (
                    <div className="form-check" key={index}>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={index}
                        />
                        <label className="form-check-label" for={index}>
                          {item}
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.saveMovie}>Save</Button>
            <Button onClick={this.toggleModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    genres: state.genres,
    actors: state.actors,
    isDisplayMovieForm: state.isDisplayMovieForm,
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

export default connect(mapStateToProps, mapDispatchToProps)(MovieForm);
