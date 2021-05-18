import * as Types from "../../constants/ActionType";
import callApi from "../../utils/ApiCallerServer";

export const actFetchDataTransactionsRequest = () => {
  return (dispatch) => {
    return callApi(`transactions?relations=user,ticket,ticket.showtime,ticket.showtime.movie,ticket.seat,ticket.seat.room,ticket.seat.room.cinema`, "GET", null).then(
      (res) => {
        console.log("res", res.data.results);
        dispatch(fetchDataTransaction(res.data.results));
      }
    );
  };
};

export const fetchDataTransaction = (transactions) => {
    return {
        type: Types.FETCH_DATA_TRANSACTION,
        transactions
    }
}

export const onToggleModal = () => {
    return {
        type: Types.TOGGLE_TRANSACTION_MODAL,
    }
}

export const getTransaction = (transaction) => {
    return {
        type: Types.GET_TRANSACTION,
        transaction
    }
}