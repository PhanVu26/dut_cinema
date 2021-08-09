import * as Types from "../../constants/ActionType";
import callApi from "../../utils/ApiCallerServer";

export const actFetchDataTransactionsRequest = () => {
  return (dispatch) => {
    dispatch(loadTransaction);
    return callApi(`transactions?page=1&perPage=1000&relations=user,ticket,ticket.showtime,ticket.showtime.movie,ticket.seat,ticket.seat.room,ticket.seat.room.cinema`, "GET", null).then(
      (res) => {
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

export const loadTransaction = () => {
  return {
      type: Types.TRANSACTION_LOADING,
  }
}

export const onToggleModal = () => {
    return {
        type: Types.TOGGLE_TRANSACTION_MODAL,
    }
}

export const actGetTransactionRequest = (id) => {
  return (dispatch) => {
    dispatch(loadTransaction);
    return callApi(`transactions/${id}?relations=user,ticket,ticket.showtime,ticket.showtime.movie,ticket.seat,ticket.seat.room,ticket.seat.room.cinema`, "GET", null).then(
      (res) => {
        dispatch(getTransaction(res.data));
      }
    );
  };
};

export const getTransaction = (transaction) => {
    return {
        type: Types.GET_TRANSACTION,
        transaction
    }
}

export const actDeleteTransactionRequest = (id) => {
  return (dispatch) => {
    dispatch(loadTransaction);
    return callApi(`transactions/${id}`, "DELETE", null).then(
      (res) => {
        dispatch(deleteTransaction(id));
        alert("Xóa thành công");
      }
    );
  };
};

export const deleteTransaction = (id) => {
    return {
        type: Types.DELETE_TRANSACTION,
        id
    }
}