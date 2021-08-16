import * as types from "../../constants/ActionType";
var initialState = {
    rooms: [],
    loading: false
}

const findIndex = (cinemas, id) => {
    var result = -1;
    cinemas.forEach((cinema, index) => {
        if(cinema.id === id ){
            result = index;
        }
    });
    return result;
}

var myReducer = (state = initialState, action) => {
    var index = -1;
    switch(action.type){
        case types.FETCH_DATA_ROOMS:
            return {
                ...state,
                rooms: action.rooms,
                loading: false
            }   
        case types.ROOM_LOADING:
            return {
                ...state,
                loading: true
            }   
        case types.SAVE_ROOM:
            return {
                ...state,
                rooms: action.rooms,
                loading: false
            }   
        case types.DELETE_ROOM:
            var rooms = [...state.rooms];
            index = findIndex(rooms, action.id)
            rooms.splice(index, 1);
            return {
                ...state,
                rooms: rooms,
                loading: false
            };      
        case types.UPDATE_ROOM:     
            var rooms = [...state.rooms];          
            index = findIndex(rooms, action.room.id);
            rooms[index] = action.room;
            return {
                ...state,
                rooms: rooms,
                loading: false
            };                          
        default: return state; 
            
    }
    return state;
}


export default myReducer;