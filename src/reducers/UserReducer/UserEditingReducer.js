import * as types from "../../constants/ActionType";
var initialState = {
    id: '',
    name :'',
    password: '',
    email: '',
    age: '',
    isActive: false
};

var myReducer = (state = initialState, action) => {
    switch(action.type){
        case types.GET_USER_EDITING:
            var userEditing = {
                id: action.user.id,
                name: action.user.name,
                password: action.user.password,
                email:action.user.email,
                age: action.user.age,
                isActive: action.user.isActive
            }        
            return userEditing
        default: return state;     
    }
    return state;
}


export default myReducer;