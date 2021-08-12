import * as types from "../../constants/ActionType";
import callApi from "../../utils/ApiCallerServer";

export const actFetchDataCinemasRequest = () => {
    return (dispatch) => {
        dispatch(loadCinema())
      return callApi("cinemas?page=1&perPage=1000&relations=rooms", "GET", null).then((res) => {
        dispatch(actFetchDataCinemas(res.data.results));
      });
    };
};

export const actFetchDataCinemas = (cinemas) => {
    return {
        type: types.FETCH_DATA_CINEMAS,
        cinemas
    }
}

export const loadCinema = () => {
    return {
        type: types.CINEMA_LOADING,
    }
}


export const actSaveCinemaRequest = (cinema) => {
    return (dispatch) => {
        dispatch(loadCinema())
        return callApi("cinemas", "POST", cinema).then((res) => {
            dispatch(saveCinema(res.data));
            alert("Thêm thành công.")
        })
        .catch(err => {
            alert("Lỗi kết nối !!!")
        })
    };
};

export const saveCinema = (cinema) => {
    return {
        type: types.SAVE_CINEMA,
        cinema
    }
}

export const toggleModal = () => {
    return {
        type: types.TOGGLE_CINEMAS_MODAL,
    }
}

// export const toggleActorForm = () => {
//     return {
//         type: types.TOGGLE_ACTOR_FORM,
//     }
// }

export const getCinemaInfo = (cinema) => {
    return {
        type: types.GET_CINEMA_INFO,
        cinema
    }
}
export const actDeleteCinemaRequest = (id) => {
    return (dispatch) => {
        dispatch(loadCinema())
        return callApi(`cinemas/${id}`, "DELETE", null).then((res) => {
            dispatch(deleteCinema(id));
            alert("Xóa thành công.")
        })
        .catch(err => {
            alert("Lỗi kết nối !!!")
        })
    };
};
export const deleteCinema = (id) => {
    return {
        type: types.DELETE_CINEMA,
        id
    }
}

// export const filterActor = (filter) => {
//     return {
//         type: types.FILTER_ACTOR,
//         filter
//     }
// }

export const actUpdateCinemaRequest = (cinema) => {
    return (dispatch) => {
        dispatch(loadCinema())
        return callApi(`cinemas/${cinema.id}`, "PATCH", cinema).then((res) => {
            dispatch(actUpdateCinema(res.data));
            alert("Cập nhật thành công.")
        })
        .catch(err => {
            alert("Lỗi kết nối !!!")
        })
    };
};

export const actUpdateCinema = (cinema) => {
    return {
        type: types.UPDATE_CINEMA,
        cinema
    }
}
