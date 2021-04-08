import * as types from "../../constants/ActionType";
var initialState = {
    id: "",
    name: "",
    genreIds: [],
    author:"",
    producer:"",
    actorIds: [],
    releaseDate: "",
    thumbnail: "",
    releaseDate: "",
    description: ""
};

var myReducer = (state = initialState, action) => {
    switch(action.type){
        case types.GET_MOVIE_INFO:
            console.log("action.movie", action)
            var movieInfo = {
                id: action.movie.id,
                name: action.movie.name,
                genreIds: action.movie.genreIds,
                author: action.movie.author,
                producer: action.movie.producer,
                description: action.movie.description,
                actorIds: action.movie.actorIds,
                thumbnail: action.movie.thumbnail,
                releaseDate: action.movie.releaseDate,
            }     
            console.log("in action, movieInfo", movieInfo)   
            return movieInfo
        default: return state;     
    }
    return state;
}


export default myReducer;