import * as types from "../constants/ActionType";
var initialState = [
  {
    id: 1,
    username: "PhanVu",
    role: "Movie-Manager",
    status: "actived",
    createdAt: "26/01/2018",
  },

  {
    id: 2,
    username: "PhanVu",
    role: "Movie-Manager",
    status: "actived",
    createdAt: "26/01/2018",
  },
  {
    id: 3,
    username: "PhanVu",
    role: "Movie-Manager",
    status: "actived",
    createdAt: "26/01/2018",
  },
];

const findIndex = (users, id) => {
  var result = -1;
  users.forEach((user, index) => {
    if (user.id === id) {
      result = index;
    }
  });
  return result;
};

var userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LIST_ALL_USERS:
      return state;
    case types.ADD_USER:
      var today = new Date();
      var newUser = {
        id: 1,
        username: action.user.username,
        role: action.user.role,
        createdAt:
          +today.getDate() +
          "/" +
          (today.getMonth() + 1) +
          "/" +
          today.getFullYear(),
        status: action.user.status === true ? "actived" : "InActived",
      };
      state.push(newUser);
      console.log(action);
      return [...state];
    case types.DELETE_USER:
      const index = findIndex(state, action.id);
      state.splice(index, 1);
      console.log(action);
      return [...state];
    case types.UPDATE_USER:
      return state;
    default:
      return state;
  }
  return state;
};

export default userReducer;
