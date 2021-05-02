import * as Types from "../constants/ActionType";

const stateDefault = {
  movie: [],
  movieShowing: [],
  movieComingSoon: [],
  searchMovie: [],
  choosing: {},
  booking: [],
  showInfoMovie: [],
  theater: [],
  promotion: [],
  getBookingById: {},
  reviewMovie: [],
  bookingMovie: [],
};

const isMovieShowing = (date) => {
  const now = new Date().setHours(0, 0, 0, 0);
  if (Date.parse(date) <= now) return true;
  else return false;
};

function MovieReducer(state = stateDefault, action) {
  switch (action.type) {
    // receive movies data and assigned to movie array, filter movie to movieShowing and movieComingSoon
    case Types.FETCH_DATA_MOVIE: {
      return {
        ...state,
        movie: action.movie,
        movieShowing: action.movie.filter((item) =>
          isMovieShowing(item.releaseDate)
        ),
        movieComingSoon: action.movie.filter(
          (item) => !isMovieShowing(item.releaseDate)
        ),
      };
    }

    // choose movie
    case Types.RECEIVE_MOVIE_CHOOSING: {
      return {
        ...state,
        choosing: {
          movie: action.movie,
          date: action.date,
          time: action.time,
          idUser: action.idUser,
        },
      };
    }
    case Types.SHOW_INFORMATION_MOVIE: {
      let newState = { ...state };
      if (newState.showInfoMovie.length === 1) {
        newState.showInfoMovie.splice(0, 1);
        newState.showInfoMovie.push(action.movie);
      } else {
        newState.showInfoMovie.push(action.movie);
      }
      return newState;
    }
    case Types.RATING_ITEM_MOVIE: {
      let newState = { ...state };
      for (let i = 0; i < newState.movie.length; i++) {
        if (newState.movie[i]._id === action.movie._id) {
          newState.movie[i] = action.movie;
        }
      }

      return newState;
    }

    case Types.CREATE_BOOKING: {
      return {
        ...state,
        booking: [...state.booking, action.data],
      };
    }
    case Types.FETCH_DATA_THEATER: {
      let newState = { ...state };
      newState.theater = action.theater;
      return newState;
    }
    case Types.FETCH_DATA_PROMOTION: {
      let newState = { ...state };
      newState.promotion = action.promotion;
      return newState;
    }
    case Types.GET_BOOKING: {
      return {
        ...state,
        getBookingById: action.data,
      };
    }
    case Types.FETCH_DATA_REVIEW_MOVIE: {
      let newState = { ...state };
      newState.reviewMovie = action.reviewMovie;
      return newState;
    }
    case Types.RATING_ITEM_REVIEW_MOVIE: {
      let newState = { ...state };
      for (let i = 0; i < newState.reviewMovie.length; i++) {
        console.log(action.reviewMovie._id);
        if (newState.reviewMovie[i]._id === action.reviewMovie._id) {
          newState.reviewMovie[i] = action.reviewMovie;
        }
      }
      return newState;
    }
    case Types.ADD_MOVIE: {
      return {
        ...state,
        movie: [...state.movie, action.data],
      };
    }
    case Types.DELETE_MOVIE: {
      return {
        ...state,
        movie: state.movie.filter((item) => item.id !== action.id),
      };
    }
    case Types.UPDATE_MOVIE: {
      return {
        ...state,
        movie: state.movie.map((item) => {
          if (item._id === action.data._id) {
            return action.data;
          } else return item;
        }),
      };
    }

    case Types.SEARCH_MOVIE: {
      const { keyword } = action;
      state.searchMovie = [];
      let newState = { ...state };
      newState.movie.filter((data) => {
        if (keyword === "") {
          newState.searchMovie = [];
          console.log(newState.searchMovie);
        } else if (
          data.name.toLowerCase().includes(keyword.toLowerCase()) ||
          data.type.toLowerCase().includes(keyword.toLowerCase()) ||
          data.author.toLowerCase().includes(keyword.toLowerCase()) ||
          data.actor.toLowerCase().includes(keyword.toLowerCase()) ||
          data.nation.toLowerCase().includes(keyword.toLowerCase())
        ) {
          newState.searchMovie.push(data);
        }
      });
      return newState;
    }
    case Types.FETCH_DATA_BOOKING_MOVIE: {
      let newState = { ...state };
      newState.bookingMovie = action.bookingMovie;
      return newState;
    }
    default: {
      return state;
    }
  }
}

export default MovieReducer;
