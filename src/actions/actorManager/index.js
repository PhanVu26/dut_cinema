import * as types from "../../constants/ActionType";
import callApi from "../../utils/ApiCallerServer";

export const actFetchDataActorsRequest = () => {
    return (dispatch) => {
      return callApi("actors", "GET", null).then((res) => {
        dispatch(actFetchDataActors(res.data.results));
      });
    };
};

export const actFetchDataActors = (actors) => {
    return {
        type: types.LIST_ALL_ACTORS,
        actors
    }
}

export const listAllActors = () => {
    return {
        type: types.LIST_ALL_ACTORS
    }
}

export const actSaveActorsRequest = (actor) => {
    return (dispatch) => {
        return callApi("actors", "POST", actor).then((res) => {
            console.log("post actor", res.data)
            dispatch(saveActor(res.data));
      });
    };
};

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
export const actDeleteActorsRequest = (id) => {
    return (dispatch) => {
        return callApi(`actors/${id}`, "DELETE", null).then((res) => {
            console.log("delete actor", res)
            dispatch(deleteActor(id));
      });
    };
};
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

export const actUpdateActorsRequest = (actor) => {
    return (dispatch) => {
        return callApi(`actors/${actor.id}`, "PATCH", actor).then((res) => {
            console.log("post actor", res.data)
            dispatch(actUpdateActor(res.data));
      });
    };
};

export const actUpdateActor = (actor) => {
    return {
        type: types.UPDATE_ACTOR,
        actor
    }
}