import * as types from "../../constants/ActionType";
var initialState = {
};

var myReducer = (state = initialState, action) => {
    switch(action.type){       
        case types.GET_TRANSACTION:
            
            return action.transaction
        default: return state;     
    }
    return state;
}


export default myReducer;