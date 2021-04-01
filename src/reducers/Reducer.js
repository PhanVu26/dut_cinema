import { combineReducers } from "redux";
import UsersReducer from "./UsersReducer";
import DisplayFormReducer from "./DisplayFormReducer";
import MovieReducer from "./MovieReducer";
import ShowTimesReducer from "./ShowTimesReducer";
import FoodReducer from "./FoodReducer";
import TicketReducer from "./TicketReducer";

const Reducer = combineReducers({
  UsersReducer,
  DisplayFormReducer,
  MovieReducer,
  ShowTimesReducer,
  FoodReducer,
  TicketReducer,
});

export default Reducer;
