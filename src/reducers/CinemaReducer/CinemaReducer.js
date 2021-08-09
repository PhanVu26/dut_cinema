import * as types from "../../constants/ActionType";
var initialState = {
    cinemas: [],
    loading: false
}

const findIndex = (cinemas, id) => {
    var result = -1;
    cinemas.forEach((cinema, index) => {
        if(cinema.id === id ){
            result = index;
        }
    });
    return result;
}

var myReducer = (state = initialState, action) => {
    var index = -1;
    switch(action.type){
        case types.CINEMA_LOADING:
            return {
                ...state,
                loading: true
            }
        case types.FETCH_DATA_CINEMAS:
            return {
                ...state,
                cinemas: action.cinemas,
                loading: false
            }

        case types.SAVE_CINEMA:
            var cinemas = [...state.cinemas];
            var newCinema = action.cinema
            cinemas.unshift(newCinema);
            return {
                ...state,
                cinemas: cinemas,
                loading: false
            }    
        case types.DELETE_CINEMA:
            var cinemas = [...state.cinemas];
            index = findIndex(cinemas, action.id)
            cinemas.splice(index, 1);
            return {
                ...state,
                cinemas: cinemas,
                loading: false
            }     
            case types.UPDATE_CINEMA:  
                var cinemas = [...state.cinemas];             
                index = findIndex(cinemas, action.cinema.id);
                cinemas[index] = action.cinema;
                return {
                    ...state,
                    cinemas: cinemas,
                    loading: false
                }                     
        default: return {...state};     
    }
    return state;
}


export default myReducer;