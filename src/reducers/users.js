import * as types from "../constants/ActionType";
var initialState = [
    {
        id: 1,
        username: "PhanVu",
        role: "Movie-Manager",
        status: "actived",
        createdAt: "26/01/2018"
    },

    {
        id: 1,
        username: "PhanVu",
        role: "Movie-Manager",
        status: "actived",
        createdAt: "26/01/2018"
    },
    {
        id: 1,
        username: "PhanVu",
        role: "Movie-Manager",
        status: "actived",
        createdAt: "26/01/2018"
    }
];



var userReducer = (state = initialState, action) => {
    switch(action.type){
        case types.LIST_ALL_USERS:
            return state;
        case types.ADD_USER:

            var today = new Date();
            var newUser = {
                id: 1,
                username: action.user.username,
                role: action.user.role,
                createdAt : + today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear(),
                status: action.user.status === true ? 'actived' : 'InActived'
            }
            state.push(newUser);
            console.log(action);
            return [...state];    
        default: return state;     
    }
    return state;
}


export default userReducer;