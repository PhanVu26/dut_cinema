import * as types from "../../constants/ActionType";
var initialState = [
    {
        id: 1,
        name: "Bố già",
        author: "Phan Vũ",
        producer: "Phan Vũ",
        description: "không có mô tả",
        releaseDate: "26/01/2021",
        genreIds: [
            {   
                id: 1,
                name: "Phim tình cảm"
            },
            {   
                id: 2,
                name: "Phim hành động"
            },
        ],
        actorIds: [
            {
                id: 1,
                name: "Phan Văn Vũ"
            },
            {
                id: 2,
                name: "Phan Văn Nhân"
            }
        ],
        thumbnail:  " "

    },
    {
        id: 2,
        name: "Hai Phượng",
        author: "Phan Vũ",
        producer: "Phan Vũ",
        description: "không có mô tả",
        releaseDate: "26/01/2021",
        genreIds: [
            {   
                id: 1,
                name: "Phim tình cảm"
            },
            {   
                id: 2,
                name: "Phim hành động"
            },
        ],
        actorIds: [
            {
                id: 1,
                name: "Phan Văn Vũ"
            },
            {
                id: 2,
                name: "Phan Văn Nhân"
            }
        ],
        thumbnail:  " "

    },
    {
        id: 3,
        name: "End Game",
        author: "Phan Vũ",
        producer: "Phan Vũ",
        description: "không có mô tả",
        releaseDate: "26/01/2021",
        genreIds: [
            {   
                id: 1,
                name: "Phim tình cảm"
            },
            {   
                id: 2,
                name: "Phim hành động"
            },
        ],
        actorIds: [
            {
                id: 1,
                name: "Phan Văn Vũ"
            },
            {
                id: 2,
                name: "Phan Văn Nhân"
            }
        ],
        thumbnail:  " "

    },
    {
        id: 4,
        name: "Spider Man",
        author: "Phan Vũ",
        producer: "Phan Vũ",
        description: "không có mô tả",
        releaseDate: "26/01/2021",
        genreIds: [
            {   
                id: 1,
                name: "Phim tình cảm"
            },
            {   
                id: 2,
                name: "Phim hành động"
            },
        ],
        actorIds: [
            {
                id: 1,
                name: "Phan Văn Vũ"
            },
            {
                id: 2,
                name: "Phan Văn Nhân"
            }
        ],
        thumbnail:  " "

    },

    {
        id: 5,
        name: "VanHensing",
        author: "Phan Vũ",
        producer: "Phan Vũ",
        description: "không có mô tả",
        releaseDate: "26/01/2021",
        genreIds: [
            {   
                id: 1,
                name: "Phim tình cảm"
            },
            {   
                id: 2,
                name: "Phim hành động"
            },
        ],
        actorIds: [
            {
                id: 1,
                name: "Phan Văn Vũ"
            },
            {
                id: 2,
                name: "Phan Văn Nhân"
            }
        ],
        thumbnail:  " "

    },

    {
        id: 6,
        name: "Tom and Jerry",
        author: "Phan Vũ",
        producer: "Phan Vũ",
        description: "không có mô tả",
        releaseDate: "26/01/2021",
        genreIds: [
            {   
                id: 1,
                name: "Phim tình cảm"
            },
            {   
                id: 2,
                name: "Phim hành động"
            },
        ],
        actorIds: [
            {
                id: 1,
                name: "Phan Văn Vũ"
            },
            {
                id: 2,
                name: "Phan Văn Nhân"
            }
        ],
        thumbnail:  " "

    },

    {
        id: 7,
        name: "Hai Lúa",
        author: "Phan Vũ",
        producer: "Phan Vũ",
        description: "không có mô tả",
        releaseDate: "26/01/2021",
        genreIds: [
            {   
                id: 1,
                name: "Phim tình cảm"
            },
            {   
                id: 2,
                name: "Phim hành động"
            },
        ],
        actorIds: [
            {
                id: 1,
                name: "Phan Văn Vũ"
            },
            {
                id: 2,
                name: "Phan Văn Nhân"
            }
        ],
        thumbnail:  " "

    },
    
];

// const findIndex = (users, id) => {
//     var result = -1;
//     users.forEach((user, index) => {
//         if(user.id === id ){
//             result = index;
//         }
//     });
//     return result;
// }

// const randomId = () =>{
//     return Math.floor(Math.random() * 100) + 1;
// }

var myReducer = (state = initialState, action) => {
    var index = -1;
    switch(action.type){
        case types.LIST_ALL_MOVIES:
            return state;
        // case types.SAVE_USER:
        //     var today = new Date();
        //     var role = parseInt(action.user.role);
        //     var newUser = {
        //         id: action.user.id,
        //         username: action.user.username,
        //         password: action.user.password,
        //         role: role,
        //         createdAt : + today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear(),
        //         status: action.user.status === 'true' ? true: false
        //     }
        //     if(!newUser.id){
        //         newUser.id = randomId();
        //         state.push(newUser);
        //     } else {
        //         index = findIndex(state, newUser.id);
        //         let editUser = {...state[index]};
        //         editUser.username = newUser.username;
        //         editUser.role = newUser.role;
        //         editUser.status = newUser.status;
        //         state[index] = editUser;
        //         //return state;
        //     }
        //     return [...state];    
        // case types.DELETE_USER:
        //     index = findIndex(state, action.id)
        //     state.splice(index, 1);
        //     console.log(action);
        //     return [...state];       
        // case types.UPDATE_USER_STATUS:
        //     index = findIndex(state, action.id);
        //     state[index] = {
        //         ...state[index],
        //         status: !state[index].status
        //     }
        //     console.log(action);
        //     return [...state];            
        default: return state;     
    }
    return state;
}


export default myReducer;