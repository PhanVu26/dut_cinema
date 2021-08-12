import * as types from "../../constants/ActionType";
var initialState = {
    id: '',
    name :'',
    price: 0
};

var myReducer = (state = initialState, action) => {
    switch(action.type){
        case types.GET_TICKET_TYPE_INFO:     
            return action.ticketType
        default: return state;     
    }
    return state;
}


export default myReducer;