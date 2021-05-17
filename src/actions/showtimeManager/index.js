import * as types from "../../constants/ActionType";
import callApi from "../../utils/ApiCallerServer";

export const getShowtime = (showtimes) => {
  return {
    type: types.GET_SHOWTIME,
    showtimes,
  };
};

export const actFetchShowtimesRequest = (roomId, dateString) => {
  return (dispatch) => {
    return callApi(
      `rooms/${roomId}/showtimes?date=${dateString}`,
      "GET",
      null
    ).then((res) => {
      console.log("res: ", res);
      dispatch(getShowtime(res.data.showtimes));
    });
  };
};

export const actFetchDataCinema = (cinema) => {
  return {
    type: types.FETCH_DATA_CINEMA,
    cinema,
  };
};

export const actFetchCinemaRequest = () => {
  return (dispatch) => {
    return callApi("cinemas", "GET", null).then((res) => {
      dispatch(actFetchDataCinema(res.data.results));
    });
  };
};

export const actFetchRoomData = (rooms) => {
  return {
    type: types.GET_CINEMA_ROOMS,
    rooms,
  };
};

export const actFetchRoomDataRequest = (cinemaId) => {
  return (dispatch) => {
    return callApi(`cinemas/${cinemaId}/rooms`, "GET", null).then((res) => {
      dispatch(actFetchRoomData(res.data.rooms));
    });
  };
};

export const actFetchMovies = (movie) => {
  return {
    type: types.GET_ALL_MOVIES_SHOWTIMES,
    movie,
  };
};

export const actFetchMoviesRequest = () => {
  return (dispatch) => {
    return callApi("movies", "GET", null).then((res) => {
      console.log("test: ", res.data.results);
      dispatch(actFetchMovies(res.data.results));
    });
  };
};

export const actAddShowtimeRequest = (showtime) => {
  return callApi("showtimes", "POST", showtime);
};

export const actDeleteShowtimeRequest = (showtimeID) => {
  return callApi(`showtimes/${showtimeID}`, "DELETE", null);
};
