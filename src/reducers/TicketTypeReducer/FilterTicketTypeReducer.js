import * as types from "../../constants/ActionType";
var initialState = {
    name: '',
};

var myReducer = (state = initialState, action) => {
    switch(action.type){
        case types.FILTER_TICKET_TYPE: 
            var filter = {
                name : action.filter.name,
            }       
            return filter
        default: return state;     
    }
    return state;
}


export default myReducer;