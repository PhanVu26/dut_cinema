import * as types from "../../constants/ActionType";
var initialState = false;

var DisplayFormReducer = (state = initialState, action) => {
    switch(action.type){
        case types.TOGGLE_USER_FORM:
            return !state;   
        default: return state;     
    }
    return state;
}


export default DisplayFormReducer;