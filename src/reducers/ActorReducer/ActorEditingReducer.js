import * as types from "../../constants/ActionType";
var initialState = {
    id: '',
    name :'',
    birthday: '',
    image: '',
    nationality: '',
    description: '',
};

var myReducer = (state = initialState, action) => {
    switch(action.type){
        case types.GET_ACTOR_INFO:
            var actorEditing = {
                id: action.actor.id,
                name: action.actor.name,
                image: action.actor.image,
                nationality: action.actor.nationality,
                birthday: action.actor.birthday,
                description:action.actor.description,
            }        
            return actorEditing
        default: return state;     
    }
    return state;
}


export default myReducer;