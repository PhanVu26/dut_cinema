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
        default: return state;     
    }
    return state;
}


export default userReducer;