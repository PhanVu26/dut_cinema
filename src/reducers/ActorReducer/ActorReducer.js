import * as types from "../../constants/ActionType";
var initialState = {
    actors: [],
    loading: false
}

const findIndex = (actors, id) => {
    var result = -1;
    actors.forEach((actor, index) => {
        if(actor.id === id ){
            result = index;
        }
    });
    return result;
}

const randomId = () =>{
    return Math.floor(Math.random() * 100) + 1;
}

var myReducer = (state = initialState, action) => {
    var index = -1;
    switch(action.type){
        case types.ACTOR_LOADING:
           return {
               ...state,
               loading: true
           }
        case types.LIST_ALL_ACTORS:
            return {
                ...state,
                actors: action.actors,
                loading: false
            }
        case types.SAVE_ACTOR:
            var actors = [...state.actors];
            var newActor = {
                id: action.actor.id,
                name: action.actor.name,
                // birthday: action.actor.birthday,
                // nationality: action.actor.nationality,
                // image: action.actor.image,
                description : action.actor.description,
            }
            actors.unshift(newActor);
            // } else {
            //     index = findIndex(state, newActor.id);
            //     let editActor = {...state[index]};
            //     editActor.name = newActor.name;
            //     editActor.image = newActor.image;
            //     editActor.birthday = newActor.birthday;
            //     editActor.description = newActor.description;
            //     editActor.nationality = newActor.nationality;
            //     state[index] = editActor;
            // }
            return {
                ...state,
                actors: actors,
                loading: false
            }    
        case types.DELETE_ACTOR:
            var actors = [...state.actors];
            index = findIndex(actors, action.id)
            actors.splice(index, 1);
            return {
                ...state,
                actors: actors,
                loading: false
            } 
            case types.UPDATE_ACTOR:  
                var actors = [...state.actors];             
                index = findIndex(actors, action.actor.id);
                actors[index] = action.actor;
                return {
                    ...state,
                    actors: actors,
                    loading: false
                }                   
        default: return {...state};     
    }
    return state;
}


export default myReducer;