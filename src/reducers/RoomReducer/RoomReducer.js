import * as types from "../../constants/ActionType";
var initialState = [
];

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
            var newState = action.rooms
            return newState;
        case types.SAVE_ROOM:
            return action.rooms  
        case types.DELETE_ROOM:
            index = findIndex(state, action.id)
            state.splice(index, 1);
            return [...state];  
        case types.UPDATE_ROOM:               
            index = findIndex(state, action.room.id);
            console.log("index", index, action.room, state)
            state[index] = action.room;
            return [...state];                          
        default: return state; 
            
    }
    return state;
}


export default myReducer;