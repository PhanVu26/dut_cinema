import * as types from "../../constants/ActionType";
var initialState = [
    
        
    {   
        id: 1,
        name: "Phan Văn Vũ",
        birthday: "10/10/1999",
        nationality: "Việt Nam",
        image: "",
        description: "Trấn Thành tên khai sinh Huỳnh Trấn Thành (sinh ngày 5 tháng 2 năm 1987) là một diễn viên hài, người dẫn chương trình, diễn viên lồng tiếng và diễn viên điện ảnh người Việt Nam. Xem thêm tại: https://www.galaxycine.vn/dien-vien/tran-thanh Xem thêm tại: https://www.galaxycine.vn/dien-vien/tran-thanh"
    },
    {   
        id: 2,
        name: "Phan Văn Anh",
        image: "",
        nationality: "Việt Nam",
        birthday: "10/10/1999",
        description: "Trấn Thành tên khai sinh Huỳnh Trấn Thành (sinh ngày 5 tháng 2 năm 1987) là một diễn viên hài, người dẫn chương trình, diễn viên lồng tiếng và diễn viên điện ảnh người Việt Nam. Xem thêm tại: https://www.galaxycine.vn/dien-vien/tran-thanh Xem thêm tại: https://www.galaxycine.vn/dien-vien/tran-thanh"
    },
    {   
        id: 3,
        name: "Phan Văn Nam",
        image: "",
        nationality: "Việt Nam",
        birthday: "10/10/1999",
        description: "Trấn Thành tên khai sinh Huỳnh Trấn Thành (sinh ngày 5 tháng 2 năm 1987) là một diễn viên hài, người dẫn chương trình, diễn viên lồng tiếng và diễn viên điện ảnh người Việt Nam. Xem thêm tại: https://www.galaxycine.vn/dien-vien/tran-thanh Xem thêm tại: https://www.galaxycine.vn/dien-vien/tran-thanh"
    },
    {   
        id: 4,
        name: "Phan Văn Tài",
        image: "",
        nationality: "Việt Nam",
        birthday: "10/10/1999",
        description: "Trấn Thành tên khai sinh Huỳnh Trấn Thành (sinh ngày 5 tháng 2 năm 1987) là một diễn viên hài, người dẫn chương trình, diễn viên lồng tiếng và diễn viên điện ảnh người Việt Nam. Xem thêm tại: https://www.galaxycine.vn/dien-vien/tran-thanh Xem thêm tại: https://www.galaxycine.vn/dien-vien/tran-thanh"
    },
    {   
        id: 5,
        name: "Phan Văn Thành",
        image: "",
        nationality: "Việt Nam",
        birthday: "10/10/1999",
        description: "Trấn Thành tên khai sinh Huỳnh Trấn Thành (sinh ngày 5 tháng 2 năm 1987) là một diễn viên hài, người dẫn chương trình, diễn viên lồng tiếng và diễn viên điện ảnh người Việt Nam. Xem thêm tại: https://www.galaxycine.vn/dien-vien/tran-thanh Xem thêm tại: https://www.galaxycine.vn/dien-vien/tran-thanh"
    },
    {   
        id: 6,
        name: "Phan Văn Tạo",
        image: "",
        nationality: "Việt Nam",
        birthday: "10/10/1999",
        description: "Trấn Thành tên khai sinh Huỳnh Trấn Thành (sinh ngày 5 tháng 2 năm 1987) là một diễn viên hài, người dẫn chương trình, diễn viên lồng tiếng và diễn viên điện ảnh người Việt Nam. Xem thêm tại: https://www.galaxycine.vn/dien-vien/tran-thanh Xem thêm tại: https://www.galaxycine.vn/dien-vien/tran-thanh"
    },
    {   
        id: 7,
        name: "Phan Văn Vũ",
        image: "",
        nationality: "Việt Nam",
        birthday: "10/10/1999",
        description: "Trấn Thành tên khai sinh Huỳnh Trấn Thành (sinh ngày 5 tháng 2 năm 1987) là một diễn viên hài, người dẫn chương trình, diễn viên lồng tiếng và diễn viên điện ảnh người Việt Nam. Xem thêm tại: https://www.galaxycine.vn/dien-vien/tran-thanh Xem thêm tại: https://www.galaxycine.vn/dien-vien/tran-thanh"
    },
    {   
        id: 8,
        name: "Phan Văn Anh Nam",
        image: "",
        nationality: "Việt Nam",
        birthday: "10/10/1999",
        description: "Trấn Thành tên khai sinh Huỳnh Trấn Thành (sinh ngày 5 tháng 2 năm 1987) là một diễn viên hài, người dẫn chương trình, diễn viên lồng tiếng và diễn viên điện ảnh người Việt Nam. Xem thêm tại: https://www.galaxycine.vn/dien-vien/tran-thanh Xem thêm tại: https://www.galaxycine.vn/dien-vien/tran-thanh"
    },
        
    
];

const findIndex = (actors, id) => {
    var result = -1;
    actors.forEach((actor, index) => {
        if(actor.id === id ){
            result = index;
        }
    });
    return result;
}

const randomId = () =>{
    return Math.floor(Math.random() * 100) + 1;
}

var myReducer = (state = initialState, action) => {
    var index = -1;
    switch(action.type){
        case types.LIST_ALL_ACTORS:
            return state;
        case types.SAVE_ACTOR:
            var newActor = {
                id: action.actor.id,
                name: action.actor.name,
                birthday: action.actor.birthday,
                nationality: action.actor.nationality,
                image: action.actor.image,
                description : action.actor.description,
            }
            if(!newActor.id){
                newActor.id = randomId();
                state.push(newActor);
            } else {
                index = findIndex(state, newActor.id);
                let editActor = {...state[index]};
                editActor.name = newActor.name;
                editActor.image = newActor.image;
                editActor.birthday = newActor.birthday;
                editActor.description = newActor.description;
                editActor.nationality = newActor.nationality;
                state[index] = editActor;
            }
            return [...state];    
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