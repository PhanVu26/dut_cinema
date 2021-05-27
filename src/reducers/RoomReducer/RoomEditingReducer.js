import * as types from "../../constants/ActionType";
var initialState = {
    id: '',
    name :'',
    roomNumber:''
};

var myReducer = (state = initialState, action) => {
    switch(action.type){
        case types.GET_ROOM_INFO:
            var roomEditing = {
                id: action.room.id,
                name: action.room.name,
                roomNumber: action.room.roomNumber
            }        
            return roomEditing
        default: return state;     
    }
    return state;
}


export default myReducer;