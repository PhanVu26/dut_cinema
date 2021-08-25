import * as types from "../../constants/ActionType";
import callApi from "../../utils/ApiCallerServer";

export const actFetchDataGenresRequest = () => {
    return (dispatch) => {
        dispatch(loadGenre())
      return callApi("genres?page=1&perPage=1000", "GET", null).then((res) => {
          
        dispatch(actFetchDataGenres(res.data.results));
      });
    };
};

export const actFetchDataGenresFilterRequest = (query) => {
    return (dispatch) => {
        dispatch(loadGenre())
      return callApi(`genres?${query}&page=1&perPage=1000`, "GET", null).then((res) => {
          
        dispatch(actFetchDataGenres(res.data.results));
      });
    };
};

export const actFetchDataGenres = (genres) => {
    return {
        type: types.LIST_ALL_GENRES,
        genres
    }
}

export const listAllGenres = () => {
    return {
        type: types.LIST_ALL_GENRES
    }
}

export const actSaveGenresRequest = (genre) => {
    return (dispatch) => {
        dispatch(loadGenre())
        return callApi("genres", "POST", genre).then((res) => {
            dispatch(saveGenre(res.data));
            alert("Thêm thành công.")
      })
      .catch(err => {
        alert("Lỗi kết nối !!!")
      })
    };
};

export const saveGenre = (genre) => {
    return {
        type: types.SAVE_GENRE,
        genre
    }
}

export const toggleModal = () => {
    return {
        type: types.TOGGLE_GENRE_MODAL,
    }
}

export const toggleGenreForm = () => {
    return {
        type: types.TOGGLE_GENRE_MODAL,
    }
}

export const actGetGenreRequest = (id) => {
    return (dispatch) => {
        dispatch(loadGenre())
      return callApi(`genres/${id}`, "GET", null).then((res) => {
          
        dispatch(getGenreInfo(res.data));
      });
    };
};


export const getGenreInfo = (genre) => {
    return {
        type: types.GET_GENRE_INFO,
        genre
    }
}
export const actDeleteGenresRequest = (id) => {
    return (dispatch) => {
        dispatch(loadGenre())
        return callApi(`genres/${id}`, "DELETE", null).then((res) => {
            dispatch(deleteGenre(id));
            alert("Xóa thành công.")
        })
        .catch(err => {
            alert("Lỗi kết nối !!!")
        })
    };
};
export const deleteGenre = (id) => {
    return {
        type: types.DELETE_GENRE,
        id
    }
}

export const filterGenre = (filter) => {
    return {
        type: types.FILTER_GENRE,
        filter
    }
}

export const actUpdateGenresRequest = (genre) => {
    return (dispatch) => {
        dispatch(loadGenre())
        return callApi(`genres/${genre.id}`, "PATCH", genre).then((res) => {
            dispatch(actUpdateGenre(res.data));
            alert("Cập nhật thành công.")
        })
        .catch(err => {
            alert("Lỗi kết nối !!!")
        })
    };
};

export const actUpdateGenre = (genre) => {
    return {
        type: types.UPDATE_GENRE,
        genre
    }
}

export const loadGenre = () => {
    return {
        type: types.GENRE_LOADING,
    }
}
