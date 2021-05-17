import * as types from "../../constants/ActionType";
var initialState = {
    name: '',
    nationality: '',
};

var myReducer = (state = initialState, action) => {
    switch(action.type){
        case types.FILTER_ACTOR: 
            var filter = {
                name : action.filter.name,
                nationality: action.filter.nationality,
            }       
            return filter
        default: return state;     
    }
    return state;
}


export default myReducer;