import { combineReducers } from "redux";
import users from "./UserReducer/UserReducer";
import isDisplayUserForm from "./UserReducer/DisplayUserFormReducer";
import userEditing from "./UserReducer/UserEditingReducer";
import userFilter from "./UserReducer/FilterUserReducer";

import movies from "./MovieReducer/MovieReducer";
import isDisplayMovieModal from "./MovieReducer/ShowModalReducer";
import movieInfo from "./MovieReducer/MovieInfoReducer";
import isDisplayMovieForm from "./MovieReducer/ShowMovieFormReducer";
import genres from "./GenreReducer/GenreReducer";
import actors from "./ActorReducer/ActorReducer";
import filterMovie from "./MovieReducer/FilterMovieReducer";

import isDisplayActorForm from "./ActorReducer/DisplayActorFormReducer";
import actorEditing from "./ActorReducer/ActorEditingReducer";
import filterActor from "./ActorReducer/FilterActorReducer";

import reducerShowTime from "./ShowTimeReducer/ShowTimeReducer";

import roles from "./UserRoleReducer/UserRoleReducer"

import MovieReducer from "./MovieReducer";
import ShowTimesReducer from "./ShowTimesReducer";
import FoodReducer from "./FoodReducer";
import TicketReducer from "./TicketReducer";

const myReducer = combineReducers({
  users,
  genres,
  actors,
  isDisplayUserForm,
  userEditing,
  userFilter,
  movies,
  isDisplayMovieModal,
  movieInfo,
  isDisplayMovieForm,
  filterMovie,
  isDisplayActorForm,
  actorEditing,
  filterActor,
  reducerShowTime,
  roles,
  MovieReducer,
  ShowTimesReducer,
  FoodReducer,
  TicketReducer,
});

export default myReducer;
