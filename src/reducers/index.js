import {combineReducers} from "redux";
import users from "./UserReducer/UserReducer";
import isDisplayUserForm from './UserReducer/DisplayUserFormReducer';
import userEditing from './UserReducer/UserEditingReducer';
import userFilter from './UserReducer/FilterUserReducer';
import movies from './MovieReducer/MovieReducer';
import isDisplayMovieModal from './MovieReducer/ShowModalReducer';
import movieInfo from './MovieReducer/MovieInfoReducer';
import isDisplayMovieForm from './MovieReducer/ShowMovieFormReducer'

const myReducer = combineReducers({
    users,
    isDisplayUserForm ,
    userEditing,
    userFilter,
    movies,
    isDisplayMovieModal,
    movieInfo,
    isDisplayMovieForm

})

export default myReducer;