import * as types from "../../constants/ActionType";
var initialState = {
    name: '',
    genre: -1,
    author: '',
    producer: ''
};

var myReducer = (state = initialState, action) => {
    switch(action.type){
        case types.FILTER_MOVIE: 
            var filter = {
                name : action.filter.name,
                genre: parseInt(action.filter.genre),
                author: action.filter.author,
                producer: action.filter.producer
            }       
            return filter
        default: return state;     
    }
    return state;
}


export default myReducer;