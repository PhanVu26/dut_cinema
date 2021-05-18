import * as types from "../../constants/ActionType";
var initialState = [];

var myReducer = (state = initialState, action) => {
    switch(action.type){
        case types.FETCH_DATA_TRANSACTION:
            console.log("trnasaction", action.transactions)
            return action.transactions;                        
        default: return state;     
    }
    return state;
}


export default myReducer;