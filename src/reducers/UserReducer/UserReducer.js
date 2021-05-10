import * as types from "../../constants/ActionType";
var initialState = [
    {
        id: 1,
        username: "Anh",
        role: 1,
        status: true,
        createdAt: "26/01/2018"
    },

    {
        id: 2,
        username: "Nam",
        role: 1,
        status: true,
        createdAt: "26/01/2018"
    },
    {
        id: 3,
        username: "PhanVu",
        role: 1,
        status: true,
        createdAt: "26/01/2018"
    },
    {
        id: 4,
        username: "PhanVu",
        role: 2,
        status: true,
        createdAt: "26/01/2018"
    },

    {
        id: 5,
        username: "PhanVu",
        role: 3,
        status: false,
        createdAt: "26/01/2018"
    },
    {
        id: 6,
        username: "PhanVu",
        role: 2,
        status: false,
        createdAt: "26/01/2018"
    },
    {
        id: 8,
        username: "PhanVu",
        role: 2,
        status: false,
        createdAt: "26/01/2018"
    },

    {
        id: 9,
        username: "PhanVu",
        role: 3,
        status: false,
        createdAt: "26/01/2018"
    },
    {
        id: 10,
        username: "PhanVu",
        role: 1,
        status: false,
        createdAt: "26/01/2018"
    },
    {
        id: 1,
        username: "Anh",
        role: 1,
        status: true,
        createdAt: "26/01/2018"
    },

    {
        id: 2,
        username: "Nam",
        role: 1,
        status: true,
        createdAt: "26/01/2018"
    },
    {
        id: 3,
        username: "PhanVu",
        role: 1,
        status: true,
        createdAt: "26/01/2018"
    },
    {
        id: 4,
        username: "PhanVu",
        role: 2,
        status: true,
        createdAt: "26/01/2018"
    },

    {
        id: 5,
        username: "PhanVu",
        role: 3,
        status: false,
        createdAt: "26/01/2018"
    },
    {
        id: 6,
        username: "PhanVu",
        role: 2,
        status: false,
        createdAt: "26/01/2018"
    },
    {
        id: 8,
        username: "PhanVu",
        role: 2,
        status: false,
        createdAt: "26/01/2018"
    },

    {
        id: 9,
        username: "PhanVu",
        role: 3,
        status: false,
        createdAt: "26/01/2018"
    },
    {
        id: 10,
        username: "PhanVu",
        role: 1,
        status: false,
        createdAt: "26/01/2018"
    }
];

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
            var today = new Date();
            var role = parseInt(action.user.role);
            var newUser = {
                id: action.user.id,
                username: action.user.username,
                password: action.user.password,
                role: role,
                createdAt : + today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear(),
                status: action.user.status === 'true' ? true: false
            }
            if(!newUser.id){
                newUser.id = randomId();
                state.push(newUser);
            } else {
                index = findIndex(state, newUser.id);
                let editUser = {...state[index]};
                editUser.username = newUser.username;
                editUser.role = newUser.role;
                editUser.status = newUser.status;
                state[index] = editUser;
                //return state;
            }
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
        default: return state;     
    }
    return state;
}


export default userReducer;