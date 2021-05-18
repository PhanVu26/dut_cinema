import * as Types from "../../constants/ActionType";
import callApi from "../../utils/ApiCallerServer";

export const actFetchDataTransactionsRequest = () => {
  return (dispatch) => {
    return callApi(`transactions?relations=user,ticket,ticket.showtime,ticket.showtime.movie`, "GET", null).then(
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