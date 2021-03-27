import * as Types from "../constants/ActionTypes";

const stateDefault = {
  showtime: [],
};

function ShowTimesReducer(state = stateDefault, action) {
  switch (action.type) {
    case Types.FETCH_SHOWTIMES: {
      return {
        ...state,
        showtime: action.data,
      };
    }
    default: {
      return state;
    }
  }
}

export default ShowTimesReducer;
