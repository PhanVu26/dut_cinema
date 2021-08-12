import * as types from "../../constants/ActionType";
var initialState = {
    ticketTypes: [],
    loading: false
};

const findIndex = (users, id) => {
    var result = -1;
    users.forEach((user, index) => {
        if(user.id === id ){
            result = index;
        }
    });
    return result;
}

var myReducer = (state = initialState, action) => {
    var index = -1;
    switch(action.type){
        case types.TICKET_TYPE_LOADING:
            return {
                ...state,
                loading: true
            }
        case types.LIST_ALL_TICKET_TYPE:
            return {
                ...state,
                ticketTypes: action.ticketTypes,
                loading: false
            }
            case types.SAVE_TICKET_TYPE:
                var ticketTypes = [...state.ticketTypes];
                ticketTypes.unshift(action.ticketType);
                return {
                    ...state,
                    ticketTypes: ticketTypes,
                    loading: false
                }    
            case types.DELETE_TICKET_TYPE:
                var ticketTypes = [...state.ticketTypes];
                index = findIndex(ticketTypes, action.id)
                ticketTypes.splice(index, 1);
                return {
                    ...state,
                    ticketTypes: ticketTypes,
                    loading: false
                } 
                case types.UPDATE_TICKET_TYPE:  
                    var ticketTypes = [...state.ticketTypes];             
                    index = findIndex(ticketTypes, action.ticketType.id);
                    ticketTypes[index] = action.ticketType;
                    return {
                        ...state,
                        ticketTypes: ticketTypes,
                        loading: false
                    }               
        default: return {...state};     
    }
    return state;
}


export default myReducer;