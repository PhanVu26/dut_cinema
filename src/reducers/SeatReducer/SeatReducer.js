import * as types from "../../constants/ActionType";
var initialState = {
    seats:[],
    loading: false
};

var SeatReducer = (state = initialState, action) => {
    switch(action.type){
        case types.SEAT_LOADING:
            return {
                ...state,
                loading: true
            }; 
        case types.ADD_SEATS:
            var seats = [...state.seats];
            var newSeats = seats.concat(action.seats)
            return {
                ...state,
                seats: action.seats,
                loading: false
            }; 
        case types.GET_SEATS:
            return {
                ...state,
                seats: action.seats,
                loading: false
            };       
        default: return state;     
    }
    return state;
}


export default SeatReducer;