import * as types from "../../constants/ActionType";
var initialState = [];
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
        case types.FETCH_DATA_TRANSACTION:
            console.log("trnasaction", action.transactions)
            return action.transactions;                        
        case types.DELETE_TRANSACTION:
            index = findIndex(state, action.id)
            state.splice(index, 1);
            return [...state];  
        default: return state;       
    }
    return state;
}


export default myReducer;