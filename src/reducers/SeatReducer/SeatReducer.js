import * as types from "../../constants/ActionType";
var initialState = {};

var SeatReducer = (state = initialState, action) => {
    switch(action.type){
        case types.ADD_SEATS:

            state = action.room
            return {...state};   
        default: return state;     
    }
    return state;
}


export default SeatReducer;