import * as types from "../../constants/ActionType";
var initialState = [   
];


var myReducer = (state = initialState, action) => {
    var index = -1;
    switch(action.type){
        case types.FETCH_ALL_ROLES:
            var state = action.roles;
            return state;          
        default: return state;     
    }
}


export default myReducer;