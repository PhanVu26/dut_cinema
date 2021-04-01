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
            console.log("action.user ", action.user.status)
            var userEditing = {
                id: action.user.id,
                username: action.user.username,
                password: action.user.password,
                role:action.user.role,
                createdAt: action.user.createdAt,
                status: action.user.status
            }        
            return userEditing
        default: return state;     
    }
    return state;
}


export default myReducer;