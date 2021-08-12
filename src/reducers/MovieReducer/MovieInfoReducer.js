import * as types from "../../constants/ActionType";
var initialState = {
    id: "",
    name: "",
    genres: [],
    director:"",
    producer:"",
    actors: [],
    duration: 0,
    releaseDate: "",
    image: "",
    releaseDate: "",
    description: ""
};

var myReducer = (state = initialState, action) => {
    switch(action.type){
        case types.EDIT_MOVIE:
            var genres = []
            var actors = []
            if (action.movie.genres != undefined){
                genres = action.movie.genres
            }
            if (action.movie.actors != undefined){
                actors = action.movie.actors
            }
            var movieInfo = {
                id: action.movie.id,
                name: action.movie.name,
                genres: genres,
                duration: action.movie.duration,
                country: action.movie.country,
                director: action.movie.director,
                producer: action.movie.producer,
                description: action.movie.description,
                actors: actors,
                image: action.movie.image,
                releaseDate: action.movie.releaseDate,
            }     
            console.log("movie edit ", movieInfo)
            return movieInfo
        case types.FETCH_MOVIE:
            console.log("movie info ", action.movie)
            return action.movie
        default: return state;     
    }
    return state;
}


export default myReducer;