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
            console.log("post cinema", res.data)
            dispatch(saveCinema(res.data.rooms));
      });
    };
};

export const saveCinema = (rooms) => {
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
