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

const randomId = () =>{
    return Math.floor(Math.random() * 100) + 1;
}

var userReducer = (state = initialState, action) => {
    var index = -1;
    switch(action.type){
        case types.LIST_ALL_USERS:
            state = action.users;
            return state;
        case types.SAVE_USER:
            state.push(action.user);
            return [...state];    
        case types.DELETE_USER:
            index = findIndex(state, action.id)
            state.splice(index, 1);
            return [...state];       
        case types.UPDATE_USER_STATUS:
            index = findIndex(state, action.id);
            state[index] = {
                ...state[index],
                isActive: !state[index].isActive
            }
            return [...state]; 
        case types.UPDATE_USER:               
            index = findIndex(state, action.user.id);
            state[index] = action.user;
            return [...state];  
                          
        default: return state;     
    }
    return state;
}


export default userReducer;