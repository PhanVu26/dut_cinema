import * as types from "../../constants/ActionType";
import callApi from "../../utils/ApiCallerServer";



export const actFetchDataRoomsRequest = (id) => {
    return (dispatch) => {
      return callApi(`cinemas/${id}/rooms?page=1&perPage=1000`, "GET", null).then((res) => {
        console.log("cinemas", res.data)
        dispatch(actFetchDataRooms(res.data.rooms));
      });
    };
};

export const actFetchDataRooms = (rooms) => {
    return {
        type: types.FETCH_DATA_ROOMS,
        rooms
    }
}


export const actSaveRoomRequest = (room, id) => {
    return (dispatch) => {
        return callApi(`cinemas/${id}/rooms`, "POST", room).then((res) => {
            alert("Thêm phòng thành công")
            dispatch(saveRoom(res.data.rooms));
        })
        .catch(err => {
            alert("Lỗi kết nối !!!")
        })
    };
};

export const saveRoom = (rooms) => {
    return {
        type: types.SAVE_ROOM,
        rooms
    }
}

export const toggleModal = () => {
    return {
        type: types.TOGGLE_ROOM_MODAL,
    }
}


export const getRoomInfo = (room) => {
    return {
        type: types.GET_ROOM_INFO,
        room
    }
}


export const actDeleteRoomRequest = (id) => {
    return (dispatch) => {
        return callApi(`rooms/${id}`, "DELETE", null).then((res) => {
            alert("Xóa phòng thành công")
            dispatch(deleteRoom(id));
        })
        .catch(err => {
            alert("Lỗi kết nối !!!")
        })
    };
};

export const deleteRoom = (id) => {
    return {
        type: types.DELETE_ROOM,
        id
    }
}

export const actUpdateRoomRequest = (room) => {
    return (dispatch) => {
        return callApi(`rooms/${room.id}`, "PATCH", room).then((res) => {
            alert("Cập nhật thành công.")
            dispatch(actUpdateRoom(res.data));
        })
        .catch(err => {
            alert("Lỗi kết nối !!!")
        })
    };
};

export const actUpdateRoom = (room) => {
    return {
        type: types.UPDATE_ROOM,
        room
    }
}