import * as types from "../../constants/ActionType";
var initialState = {
    movies: [],
    loading: false
}

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
            return {
                ...state,
                movies: action.movies,
                loading: false
            }
        case types.MOVIE_LOADING:
            
            return {
                ...state,
                loading: true
            
            };    
        case types.ADD_MOVIE:
            
            var movies = [...state.movies];
            var movieInfo = {
                id: action.movie.id,
                name: action.movie.name,
                genres: action.movie.genres,
                duration: action.movie.duration,
                director: action.movie.director,
                country: action.movie.country,
                producer: action.movie.producer,
                description: action.movie.description,
                actors: action.movie.actors,
                image: action.movie.image,
                releaseDate: action.movie.releaseDate,
                trailer: action.movie.trailer
            } 
            movies.unshift(movieInfo);
            return {
                ...state,
                movies: movies,
                loading: false
            }; 
        case types.UPDATE_MOVIE:
            var movies = [...state.movies];
            var movieEditting = {
                id: action.movie.id,
                name: action.movie.name,
                genres: action.movie.genres,
                duration: action.movie.duration,
                director: action.movie.director,
                country: action.movie.country,
                producer: action.movie.producer,
                description: action.movie.description,
                actors: action.movie.actors,
                image: action.movie.image,
                releaseDate: action.movie.releaseDate,
                trailer: action.movie.trailer
            } 
            index = findIndex(movies, movieEditting.id);
            movies[index] = movieEditting;
            return {
                ...state,
                movies: movies,
                loading: false
            };       
        case types.DELETE_MOVIE:
            var movies = [...state.movies];
            index = findIndex(movies, action.id)
            movies.splice(index, 1);
            return {
                ...state,
                movies: movies,
                loading: false
            };                  
        default: return {...state};     
    }
}


export default myReducer;