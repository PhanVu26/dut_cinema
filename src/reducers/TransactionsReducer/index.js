import * as types from "../../constants/ActionType";
var initialState = {
    transactions: [],
    loading: false
};
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
            return {
                ...state,
                transactions: action.transactions,
                loading: false
            }
        case types.TRANSACTION_LOADING:
            return {
                ...state,
                loading: true
            }                            
        case types.DELETE_TRANSACTION:
            var transactions = [...state.transactions];
            index = findIndex(transactions, action.id)
            transactions.splice(index, 1);
            return {
                ...state,
                transactions: transactions,
                loading: false 
            };  
        default: return {...state};       
    }
}


export default myReducer;