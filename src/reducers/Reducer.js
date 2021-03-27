import { combineReducers } from "redux";
import UsersReducer from "./UsersReducer";
import DisplayFormReducer from "./DisplayFormReducer";
import MovieReducer from "./MovieReducer";
import ShowTimesReducer from "./ShowTimesReducer";

const Reducer = combineReducers({
  UsersReducer,
  DisplayFormReducer,
  MovieReducer,
  ShowTimesReducer,
});

export default Reducer;
