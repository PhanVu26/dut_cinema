import * as types from "../../constants/ActionType";
export const listAllActors = () => {
    return {
        type: types.LIST_ALL_ACTORS
    }
}


export const saveActor = (actor) => {
    return {
        type: types.SAVE_ACTOR,
        actor
    }
}

export const toggleModal = () => {
    return {
        type: types.TOGGLE_ACTOR_MODAL,
    }
}

export const toggleActorForm = () => {
    return {
        type: types.TOGGLE_ACTOR_FORM,
    }
}

export const getActorInfo = (actor) => {
    return {
        type: types.GET_ACTOR_INFO,
        actor
    }
}

export const deleteActor = (id) => {
    return {
        type: types.DELETE_ACTOR,
        id
    }
}

export const filterActor = (filter) => {
    return {
        type: types.FILTER_ACTOR,
        filter
    }
}
