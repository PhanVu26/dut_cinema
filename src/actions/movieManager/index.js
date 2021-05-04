import * as types from "../../constants/ActionType";
import callApi from "../../utils/ApiCallerServer";

export const listAllMovies = () => {
    return {
        type: types.LIST_ALL_MOVIES
    }
}

export const actFetchDataGenresRequest = () => {
    return (dispatch) => {
      return callApi("genres", "GET", null).then((res) => {
        console.log("data", res.data.results)
        dispatch(actFetchDataGenres(res.data.results));
      });
    };
};
export const actFetchDataGenres = (genres) => {
    return {
        type: types.LIST_ALL_GENRES,
        genres
    }
}

export const listAllActors = () => {
    return {
        type: types.LIST_ALL_ACTORS
    }
}

export const actAddMovieRequest = (movie) => {
    return (dispatch) => {
        return callApi("movies", "POST", movie).then((res) => {
          console.log("post movie", res)  
          //dispatch(addMovie(res.data));
        });
    };
}

export const addMovie = (movie) => {
    return {
        type: types.ADD_MOVIE,
        movie
    }
}

export const toggleModal = () => {
    return {
        type: types.TOGGLE_MOVIE_MODAL,
    }
}

export const toggleMovieForm = () => {
    return {
        type: types.TOGGLE_MOVIE_FORM,
    }
}

export const getMovieRequest = (id) => {
    return (dispatch) => {
        return callApi(`movies/${id}`, 'GET', null).then((res) => {
            console.log("res", res.data)
            dispatch(getMovie(res.data));
        });
    };
}
export const getMovie = (movie) => {
    return {
        type: types.EDIT_MOVIE,
        movie
    }
}

export const deleteMovie = (id) => {
    return {
        type: types.DELETE_MOVIE,
        id
    }
}

export const actUpdateMovieRequest = (movie) => {
    return (dispatch) => {
        return callApi(`movies/${movie.id}`, 'PUT', movie).then((res) => {
          dispatch(updateMovie(res.data));
          console.log("res update", res.data)
        });
      };
}

export const updateMovie = (movie) => {
    return {
        type: types.UPDATE_MOVIE,
        movie
    }
}

export const filterMovie = (filter) => {
    return {
        type: types.FILTER_MOVIE,
        filter
    }
}

export const actFetchDataMoviesRequest = () => {
    return (dispatch) => {
      return callApi("movies", "GET", null).then((res) => {
        console.log("data", res.data.results)
        dispatch(actFetchDataMovies(res.data.results));
      });
    };
  };
  
  export const actFetchDataMovies = (movies) => {
    return {
      type: types.LIST_ALL_MOVIES,
      movies,
    };
  };
