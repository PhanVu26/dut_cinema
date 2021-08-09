import * as types from "../../constants/ActionType";
import callApi from "../../utils/ApiCallerServer";



export const actFetchDataSeatsRequest = (romId) => {
    return (dispatch) => {
        dispatch(loadSeat())
      return callApi(`rooms/${romId}/seats?page=1&perPage=1000`, "GET", null).then((res) => {
        console.log("seats", res.data)
        dispatch(actFetchDataSeats(res.data.seats));
      });
    };
};

export const actFetchDataSeats = (seats) => {
    return {
        type: types.GET_SEATS,
        seats
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
export const toggleSeatModal = () => {
    return {
        type: types.TOGGLE_SEAT_MODAL,
    }
}

export const loadSeat = () => {
    return {
        type: types.SEAT_LOADING,
    }
}
