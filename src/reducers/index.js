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

import transactions from "./TransactionsReducer/index";
import transactionInfo from "./TransactionsReducer/transactionInfo";
import isDisplayTransactionModal from "./TransactionsReducer/displayTransactionModal";

import cinemas from "./CinemaReducer/CinemaReducer";
import isDisplayCinemaModal from "./CinemaReducer/DisplayCinemaFormReducer";
import cinemaEditing from "./CinemaReducer/CinemaEditingReducer"

import rooms from "./RoomReducer/RoomReducer";
import isDisplayRoomModal from "./RoomReducer/DisplayRoomFormReducer";
import roomEditing from "./RoomReducer/RoomEditingReducer";

import isDisplaySeatModal from './SeatReducer/DisplaySeatFormReducer'
import seatRoom from './SeatReducer/SeatReducer';

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
  transactions,
  transactionInfo,
  isDisplayTransactionModal,
  cinemas,
  isDisplayCinemaModal,
  cinemaEditing,
  rooms,
  isDisplayRoomModal,
  roomEditing,
  isDisplaySeatModal,
  seatRoom

});

export default myReducer;
