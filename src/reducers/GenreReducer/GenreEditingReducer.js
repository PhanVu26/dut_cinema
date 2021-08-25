import * as types from "../../constants/ActionType";
var initialState = {
    id: '',
    name :'',
};

var myReducer = (state = initialState, action) => {
    switch(action.type){
        case types.GET_GENRE_INFO:     
            return action.genre
        default: return state;     
    }
    return state;
}


export default myReducer;