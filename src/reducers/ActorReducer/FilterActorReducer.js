import * as types from "../../constants/ActionType";
var initialState = {
    username: '',
    role: -1,
    status: -1
};

var myReducer = (state = initialState, action) => {
    switch(action.type){
        case types.FILTER_USER: 
            var filter = {
                username : action.filter.username,
                role: parseInt(action.filter.role),
                status: parseInt(action.filter.status)
            }       
            return filter
        default: return state;     
    }
    return state;
}


export default myReducer;