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

export const actSaveSeatRequest = (seat, id) => {
    return (dispatch) => {
        console.log(id)
        return callApi(`rooms/${id}/seats`, "POST", seat).then((res) => {
            if(res.statusCode !== 400){
                alert("Thêm ghế thành công.")
                dispatch(saveSeat(res.data));
            }
        })
        .catch(err => {
            alert("Lỗi kết nối !!!")
        })
    };
};

export const saveSeat = (room) => {
    return {
        type: types.ADD_SEATS,
        room
    }
}

export const toggleModal = () => {
    return {
        type: types.TOGGLE_ROOM_MODAL,
    }
}

export const toggleSeatModal = () => {
    return {
        type: types.TOGGLE_SEAT_MODAL,
    }
}
// export const toggleActorForm = () => {
//     return {
//         type: types.TOGGLE_ACTOR_FORM,
//     }
// }

export const getRoomInfo = (room) => {
    return {
        type: types.GET_ROOM_INFO,
        room
    }
}
