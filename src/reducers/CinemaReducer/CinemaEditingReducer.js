import * as types from "../../constants/ActionType";
var initialState = {
    id: '',
    name :'',
    address:''
};

var myReducer = (state = initialState, action) => {
    switch(action.type){
        case types.GET_CINEMA_INFO:
            var cinemaEditing = {
                id: action.cinema.id,
                name: action.cinema.name,
                address: action.cinema.address
            }        
            return cinemaEditing
        default: return state;     
    }
    return state;
}


export default myReducer;