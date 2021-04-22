import * as types from "../../constants/ActionType";

var initialState = {
  cinema: [
    {
      id: 1,
      name: "cinema Da Nang 1",
      address: "Hung Vuong 1",
      numOfRoom: 4,
    },
    {
      id: 2,
      name: "cinema Da Nang 2",
      address: "Hung Vuong 2",
      numOfRoom: 4,
    },
    {
      id: 3,
      name: "cinema Da Nang 3",
      address: "Hung Vuong 3",
      numOfRoom: 4,
    },
    {
      id: 4,
      name: "cinema Da Nang 4",
      address: "Hung Vuong 4",
      numOfRoom: 4,
    },
  ],
  showtime: ["08:00", "13:00", "15:00", "17:00", "20:00"],
};

function reducerShowTime(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_DATA_CINEMA: {
      return {
        ...state,
        cinema: action.cinema,
      };
    }

    case types.FETCH_DATA_SHOWTIME: {
      return {
        ...state,
        showtime: action.showtime,
      };
    }

    default:
      return state;
  }
}

export default reducerShowTime;
