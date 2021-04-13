import * as types from "../../constants/ActionType";
export const listAllMovies = () => {
    return {
        type: types.LIST_ALL_MOVIES
    }
}

export const listAllGenres = () => {
    return {
        type: types.LIST_ALL_GENRES
    }
}

export const listAllActors = () => {
    return {
        type: types.LIST_ALL_ACTORS
    }
}

export const saveMovie = (movie) => {
    return {
        type: types.SAVE_MOVIE,
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

export const getMovieInfo = (movie) => {
    return {
        type: types.GET_MOVIE_INFO,
        movie
    }
}

export const deleteMovie = (id) => {
    return {
        type: types.DELETE_MOVIE,
        id
    }
}
