import * as types from "../constants/ActionType";
var initialState = {
    id: '',
    username :'',
    password: '',
    status: false,
    role: ''
};

var myReducer = (state = initialState, action) => {
    switch(action.type){
        case types.GET_USER_EDITING:        
            return action.user
        default: return state;     
    }
    return state;
}


export default myReducer;