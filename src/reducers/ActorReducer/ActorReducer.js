import * as types from "../../constants/ActionType";
var initialState = [
    
        
    {   
        id: 1,
        name: "Phan Văn Vũ",
        birthday: "10/10/1999",
        description: "Trấn Thành tên khai sinh Huỳnh Trấn Thành (sinh ngày 5 tháng 2 năm 1987) là một diễn viên hài, người dẫn chương trình, diễn viên lồng tiếng và diễn viên điện ảnh người Việt Nam. Xem thêm tại: https://www.galaxycine.vn/dien-vien/tran-thanh Xem thêm tại: https://www.galaxycine.vn/dien-vien/tran-thanh"
    },
    {   
        id: 2,
        name: "Phan Văn Anh",
        birthday: "10/10/1999",
        description: "Trấn Thành tên khai sinh Huỳnh Trấn Thành (sinh ngày 5 tháng 2 năm 1987) là một diễn viên hài, người dẫn chương trình, diễn viên lồng tiếng và diễn viên điện ảnh người Việt Nam. Xem thêm tại: https://www.galaxycine.vn/dien-vien/tran-thanh Xem thêm tại: https://www.galaxycine.vn/dien-vien/tran-thanh"
    },
    {   
        id: 3,
        name: "Phan Văn Nam",
        birthday: "10/10/1999",
        description: "Trấn Thành tên khai sinh Huỳnh Trấn Thành (sinh ngày 5 tháng 2 năm 1987) là một diễn viên hài, người dẫn chương trình, diễn viên lồng tiếng và diễn viên điện ảnh người Việt Nam. Xem thêm tại: https://www.galaxycine.vn/dien-vien/tran-thanh Xem thêm tại: https://www.galaxycine.vn/dien-vien/tran-thanh"
    },
    {   
        id: 4,
        name: "Phan Văn Tài",
        birthday: "10/10/1999",
        description: "Trấn Thành tên khai sinh Huỳnh Trấn Thành (sinh ngày 5 tháng 2 năm 1987) là một diễn viên hài, người dẫn chương trình, diễn viên lồng tiếng và diễn viên điện ảnh người Việt Nam. Xem thêm tại: https://www.galaxycine.vn/dien-vien/tran-thanh Xem thêm tại: https://www.galaxycine.vn/dien-vien/tran-thanh"
    },
    {   
        id: 5,
        name: "Phan Văn Thành",
        birthday: "10/10/1999",
        description: "Trấn Thành tên khai sinh Huỳnh Trấn Thành (sinh ngày 5 tháng 2 năm 1987) là một diễn viên hài, người dẫn chương trình, diễn viên lồng tiếng và diễn viên điện ảnh người Việt Nam. Xem thêm tại: https://www.galaxycine.vn/dien-vien/tran-thanh Xem thêm tại: https://www.galaxycine.vn/dien-vien/tran-thanh"
    },
    {   
        id: 6,
        name: "Phan Văn Tạo",
        birthday: "10/10/1999",
        description: "Trấn Thành tên khai sinh Huỳnh Trấn Thành (sinh ngày 5 tháng 2 năm 1987) là một diễn viên hài, người dẫn chương trình, diễn viên lồng tiếng và diễn viên điện ảnh người Việt Nam. Xem thêm tại: https://www.galaxycine.vn/dien-vien/tran-thanh Xem thêm tại: https://www.galaxycine.vn/dien-vien/tran-thanh"
    },
    {   
        id: 7,
        name: "Phan Văn Vũ",
        birthday: "10/10/1999",
        description: "Trấn Thành tên khai sinh Huỳnh Trấn Thành (sinh ngày 5 tháng 2 năm 1987) là một diễn viên hài, người dẫn chương trình, diễn viên lồng tiếng và diễn viên điện ảnh người Việt Nam. Xem thêm tại: https://www.galaxycine.vn/dien-vien/tran-thanh Xem thêm tại: https://www.galaxycine.vn/dien-vien/tran-thanh"
    },
    {   
        id: 8,
        name: "Phan Văn Anh Nam",
        birthday: "10/10/1999",
        description: "Trấn Thành tên khai sinh Huỳnh Trấn Thành (sinh ngày 5 tháng 2 năm 1987) là một diễn viên hài, người dẫn chương trình, diễn viên lồng tiếng và diễn viên điện ảnh người Việt Nam. Xem thêm tại: https://www.galaxycine.vn/dien-vien/tran-thanh Xem thêm tại: https://www.galaxycine.vn/dien-vien/tran-thanh"
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
        case types.LIST_ALL_ACTORS:
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