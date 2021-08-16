import * as types from "../../constants/ActionType";
import callApi from "../../utils/ApiCallerServer";

export const actFetchDataActorsRequest = () => {
    return (dispatch) => {
        dispatch(loadActor())
      return callApi("actors?page=1&perPage=1000", "GET", null).then((res) => {
        dispatch(actFetchDataActors(res.data.results));
      });
    };
};

export const actFetchDataActorsFilterRequest = (query) => {
    return (dispatch) => {
        dispatch(loadActor())
      return callApi(`actors?${query}&page=1&perPage=1000`, "GET", null).then((res) => {
        dispatch(actFetchDataActors(res.data.results));
      });
    };
};


export const actGetActorRequest = (id) => {
    return (dispatch) => {
        dispatch(loadActor())
      return callApi(`actors/${id}`, "GET", null).then((res) => {
        dispatch(getActorInfo(res.data));
      })
      .catch(err => {
        alert("Lỗi kết nối");
      })
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
        dispatch(loadActor())
        return callApi("actors", "POST", actor).then((res) => {
            dispatch(saveActor(res.data));
            alert("Thêm thành công.")
      })
      .catch(err => {
        alert("Lỗi kết nối !!!")
      })
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
        dispatch(loadActor())
        return callApi(`actors/${id}`, "DELETE", null).then((res) => {
            dispatch(deleteActor(id));
            alert("Xóa thành công.")
        })
        .catch(err => {
            alert("Lỗi kết nối !!!")
        })
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
        dispatch(loadActor())
        return callApi(`actors/${actor.id}`, "PATCH", actor).then((res) => {
            dispatch(actUpdateActor(res.data));
            alert("Cập nhật thành công.")
        })
        .catch(err => {
            alert("Lỗi kết nối !!!")
        })
    };
};

export const actUpdateActor = (actor) => {
    return {
        type: types.UPDATE_ACTOR,
        actor
    }
}

export const loadActor = () => {
    return {
        type: types.ACTOR_LOADING,
    }
}
