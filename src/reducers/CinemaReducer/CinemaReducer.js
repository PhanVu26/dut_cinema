import * as types from "../../constants/ActionType";
var initialState = [
];

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
        case types.FETCH_DATA_CINEMAS:
            var newState = action.cinemas
            return newState;
        case types.SAVE_CINEMA:
            var newCinema = action.cinema
            state.push(newCinema);
            return [...state];    
        case types.DELETE_CINEMA:
            index = findIndex(state, action.id)
            state.splice(index, 1);
            return [...state];     
            case types.UPDATE_CINEMA:               
                index = findIndex(state, action.cinema.id);
                console.log("index", index, action.cinema, state)
                state[index] = action.cinema;
                return [...state];                  
        default: return state;     
    }
    return state;
}


export default myReducer;