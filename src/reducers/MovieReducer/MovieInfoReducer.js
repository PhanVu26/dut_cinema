import * as types from "../../constants/ActionType";
var initialState = {
    id: "",
    name: "",
    genreIds: [],
    director:"",
    producer:"",
    actorIds: [],
    releaseDate: "",
    image: "",
    releaseDate: "",
    description: ""
};

var myReducer = (state = initialState, action) => {
    switch(action.type){
        case types.GET_MOVIE_INFO:
            var movieInfo = {
                id: action.movie.id,
                name: action.movie.name,
                genreIds: action.movie.genreIds,
                country: action.movie.country,
                director: action.movie.director,
                producer: action.movie.producer,
                description: action.movie.description,
                actorIds: action.movie.actorIds,
                image: action.movie.image,
                releaseDate: action.movie.releaseDate,
            }     
            return movieInfo
        default: return state;     
    }
    return state;
}


export default myReducer;