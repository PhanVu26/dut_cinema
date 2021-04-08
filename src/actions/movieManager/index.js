import * as types from "../../constants/ActionType";
export const listAllMovies = () => {
    return {
        type: types.LIST_ALL_MOVIES
    }
}

export const saveMovie = (movie) => {
    return {
        type: types.SAVE_MOVIE,
        movie
    }
}
