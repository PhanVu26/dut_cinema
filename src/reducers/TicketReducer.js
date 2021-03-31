import * as Types from "../constants/ActionType";

const stateDefault = {
    tickets: []
}

function reducerTickets(state = stateDefault, action) {
  switch (action.type) {
    case Types.FETCH_DATA_TICKETS: {
      return {
          ...state,
          tickets: action.data
      }
    }
    default: {
      return state;
    }
  }
}

export default reducerTickets;