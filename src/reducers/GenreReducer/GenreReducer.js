import * as types from "../../constants/ActionType";
var initialState = {
    genres: [],
    loading: false
};

const findIndex = (users, id) => {
    var result = -1;
    users.forEach((user, index) => {
        if(user.id === id ){
            result = index;
        }
    });
    return result;
}

var myReducer = (state = initialState, action) => {
    var index = -1;
    switch(action.type){
        case types.GENRE_LOADING:
            return {
                ...state,
                loading: true
            }
        case types.LIST_ALL_GENRES:
            return {
                ...state,
                genres: action.genres,
                loading: false
            }
            case types.SAVE_GENRE:
                var genres = [...state.genres];
                genres.unshift(action.genre);
                return {
                    ...state,
                    genres: genres,
                    loading: false
                }    
            case types.DELETE_GENRE:
                var genres = [...state.genres];
                index = findIndex(genres, action.id)
                genres.splice(index, 1);
                return {
                    ...state,
                    genres: genres,
                    loading: false
                } 
                case types.UPDATE_GENRE:  
                    var genres = [...state.genres];             
                    index = findIndex(genres, action.genre.id);
                    genres[index] = action.genre;
                    return {
                        ...state,
                        genres: genres,
                        loading: false
                    }               
        default: return {...state};     
    }
    return state;
}


export default myReducer;