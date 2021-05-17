import * as types from "../../constants/ActionType";

var initialState = {
  cinema: [
    {
      id: 1,
      name: "cinema Da Nang 1",
      address: "Hung Vuong 1",
      // numOfRoom: 4,
    },
    {
      id: 2,
      name: "cinema Da Nang 2",
      address: "Hung Vuong 2",
      // numOfRoom: 4,
    },
    {
      id: 3,
      name: "cinema Da Nang 3",
      address: "Hung Vuong 3",
      // numOfRoom: 4,
    },
    {
      id: 4,
      name: "cinema Da Nang 4",
      address: "Hung Vuong 4",
      // numOfRoom: 4,
    },
  ],
  rooms: [],
  showtimes: [
    {
      movie: {
        id: 1,
        name: "Bố già",
        thumbnail:
          "https://images-na.ssl-images-amazon.com/images/I/81eB%2B7%2BCkUL._AC_UL200_SR200,200_.jpg",
      },
      startTime: "08:00",
      endTime: "09:00",
    },
    {
      movie: {
        id: 1,
        name: "Bố già",
        thumbnail:
          "https://images-na.ssl-images-amazon.com/images/I/81eB%2B7%2BCkUL._AC_UL200_SR200,200_.jpg",
      },
      id: 2,
      startTime: "13:00",
      endTime: "14:00",
    },
    {
      movie: {
        id: 2,
        name: "Hai Phượng",
        thumbnail:
          "https://images-na.ssl-images-amazon.com/images/I/81eB%2B7%2BCkUL._AC_UL200_SR200,200_.jpg",
      },
      id: 3,
      startTime: "15:00",
      endTime: "16:00",
    },
    {
      movie: {
        id: 2,
        name: "Hai Phượng",
        thumbnail:
          "https://images-na.ssl-images-amazon.com/images/I/81eB%2B7%2BCkUL._AC_UL200_SR200,200_.jpg",
      },
      id: 4,
      startTime: "17:00",
      endTime: "18:00",
    },
    {
      movie: {
        id: 3,
        name: "End Game",
        thumbnail:
          "https://images-na.ssl-images-amazon.com/images/I/81eB%2B7%2BCkUL._AC_UL200_SR200,200_.jpg",
      },
      id: 5,
      startTime: "20:00",
      endTime: "21:00",
    },
  ],
  movie: [],
};

function reducerShowTime(
  state = JSON.parse(JSON.stringify(initialState)),
  action
) {
  switch (action.type) {
    case types.FETCH_DATA_CINEMA: {
      return {
        ...state,
        cinema: JSON.parse(JSON.stringify(action.cinema)),
      };
    }

    case types.FETCH_DATA_SHOWTIME: {
      return {
        ...state,
        showtime: action.showtime,
      };
    }

    case types.GET_CINEMA_ROOMS: {
      return {
        ...state,
        rooms: action.rooms,
      };
    }
    case types.GET_SHOWTIME: {
      return {
        ...state,
        showtimes: action.showtimes,
      };
    }
    case types.GET_ALL_MOVIES_SHOWTIMES: {
      return {
        ...state,
        movie: action.movie,
      };
    }
    default:
      return state;
  }
}

export default reducerShowTime;
