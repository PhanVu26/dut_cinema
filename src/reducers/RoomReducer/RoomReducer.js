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
        case types.FETCH_DATA_ROOMS:
            var newState = action.rooms
            return newState;
        case types.SAVE_ROOM:
            return action.rooms                    
        default: return state;     
    }
    return state;
}


export default myReducer;