import * as types from "../../constants/ActionType";
import callApi from "../../utils/ApiCallerServer";



export const actFetchDataSeatsRequest = (romId) => {
    return (dispatch) => {
        dispatch(loadSeat())
      return callApi(`rooms/${romId}/seats?page=1&perPage=1000`, "GET", null).then((res) => {
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
        
        return callApi(`rooms/${id}/seats`, "POST", seat).then((res) => {
            if(res.statusCode !== 400){
                dispatch(saveSeat(res.data.seats));
                alert("Thêm ghế thành công.")
            }
        })
        .catch(err => {
            alert("Lỗi kết nối !!!")
        })
    };
};

export const saveSeat = (seats) => {
    return {
        type: types.ADD_SEATS,
        seats
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
