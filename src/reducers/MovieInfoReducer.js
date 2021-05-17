import * as types from "../constants/ActionType";
var initialState = {
    id: "",
    name: "",
    genres: [],
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
        case types.FETCH_MOVIE:
            // var genres = [...action.movie.genres]
            // var actors = [...action.movie.actors]
            // var movieInfo = {
            //     id: action.movie.id,
            //     name: action.movie.name,
            //     genres: [...action.movie.genres],
            //     duration: action.movie.duration,
            //     country: action.movie.country,
            //     producer: action.movie.producer,
            //     description: action.movie.description,
            //     actors: [...action.movie.actors],
            //     image: action.movie.image,
            //     releaseDate: action.movie.releaseDate,
            // }     
            console.log("movieInfo in action", action.movie)
            return action.movie
        default: return state;     
    }
    return state;
}


export default myReducer;