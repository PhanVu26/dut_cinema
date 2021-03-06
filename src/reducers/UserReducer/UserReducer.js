import * as types from "../../constants/ActionType";
var initialState = {
    users: [],
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

const randomId = () =>{
    return Math.floor(Math.random() * 100) + 1;
}

var userReducer = (state = initialState, action) => {
    var index = -1;
    switch(action.type){
        case types.LIST_ALL_USERS:
            return {
                ...state,
                users: action.users,
                loading: false
            };
        case types.USER_LOADING:
            
            return {
                ...state,
                loading: true
            }     
        case types.SAVE_USER:
            var users = [...state.users]
            var newUser = {
                id: action.user.user.id,
                name: action.user.user.name,
                email: action.user.user.email,
                userRoles: [{id: action.user.role.id, role: {name: action.user.role.name}}],
                isActive: action.user.status === 'true' ? true: false}
            users.unshift(newUser);
            
            return {
                ...state,
                users: users,
                loading: false
            }   
        case types.DELETE_USER:
            var users = [...state.users];
            index = findIndex(users, action.id)
            users.splice(index, 1);
            return {
                ...state,
                users: users,
                loading: false
            }       
        case types.UPDATE_USER_STATUS:
            var users = [...state.users]
            index = findIndex(users, action.id);
            users[index] = {
                ...users[index],
                isActive: !users[index].isActive
            }
            return {
                ...state,
                users: users,
                loading: false
            } 
        case types.UPDATE_USER:   
            var users = [...state.users]            
            index = findIndex(users, action.user.id);
            users[index] = action.user;
            return {
                ...state,
                users: users,
                loading: false
            } 
                          
        default: return state;     
    }
    return state;
}


export default userReducer;