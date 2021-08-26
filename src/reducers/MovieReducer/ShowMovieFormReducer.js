import * as types from "../../constants/ActionType"
var initialState = false;

var DisplayModalReducer = (state = initialState, action) => {
    switch(action.type){
        case types.TOGGLE_MOVIE_FORM:
            return !state;   
        default: return state;     
    }
    return state;
}


export default DisplayModalReducer;