import * as types from "../../constants/ActionType";
var initialState = false;

var myReducer = (state = initialState, action) => {
    switch(action.type){
        case types.TOGGLE_TRANSACTION_MODAL:
            return !state;                        
        default: return state;     
    }
    return state;
}


export default myReducer;