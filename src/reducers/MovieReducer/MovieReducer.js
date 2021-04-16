import * as types from "../../constants/ActionType";
var initialState = []

const findIndex = (users, id) => {
    var result = -1;
    users.forEach((user, index) => {
        if(user.id === id ){
            result = index;
        }
    });
    return result;
}

const randomId = () =>{
    return Math.floor(Math.random() * 100) + 1;
}

var myReducer = (state = initialState, action) => {
    var index = -1;
    switch(action.type){
        case types.LIST_ALL_MOVIES:
            var state = action.movies;
            return state;
        case types.SAVE_MOVIE:
            var movieInfo = {
                id: action.movie.id,
                name: action.movie.name,
                genreIds: action.movie.genreIds,
                director: action.movie.director,
                producer: action.movie.producer,
                description: action.movie.description,
                actorIds: action.movie.actorIds,
                thumbnail: action.movie.thumbnail,
                releaseDate: action.movie.releaseDate,
            } 
            console.log("movie info in save movie", movieInfo)
            if(!movieInfo.id){
                movieInfo.id = randomId();
                state.push(movieInfo);
            } else {
                console.log("ex")
                index = findIndex(state, movieInfo.id);
                let editMovie = {...state[index]};
                editMovie.name = movieInfo.name;
                editMovie.genreIds = movieInfo.genreIds;
                editMovie.director = movieInfo.director;
                editMovie.producer = movieInfo.producer;
                editMovie.description = movieInfo.description;
                editMovie.actorIds = movieInfo.actorIds;
                editMovie.thumbnail = movieInfo.thumbnail;
                editMovie.releaseDate = movieInfo.releaseDate;
                state[index] = editMovie;
            }
            return [...state];    
        case types.DELETE_MOVIE:
            index = findIndex(state, action.id)
            state.splice(index, 1);
            console.log(action);
            return [...state];       
        // case types.UPDATE_USER_STATUS:
        //     index = findIndex(state, action.id);
        //     state[index] = {
        //         ...state[index],
        //         status: !state[index].status
        //     }
        //     console.log(action);
        //     return [...state];            
        default: return state;     
    }
    return state;
}


export default myReducer;