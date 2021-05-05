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
            var movieInfo = {
                id: action.movie.id,
                name: action.movie.name,
                genres: action.movie.genres? action.movie.genres:[],
                duration: action.movie.duration,
                country: action.movie.country,
                director: action.movie.director,
                producer: action.movie.producer,
                description: action.movie.description,
                actors: action.movie.actors?action.movie.actors:[],
                image: action.movie.image,
                releaseDate: action.movie.releaseDate,
            }     
            console.log("movie edit ", movieInfo)
            return movieInfo
        default: return state;     
    }
    return state;
}


export default myReducer;