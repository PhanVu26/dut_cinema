import {combineReducers} from "redux";
import users from "./UserReducer/UserReducer";
import isDisplayUserForm from './UserReducer/DisplayUserFormReducer';
import userEditing from './UserReducer/UserEditingReducer';
import userFilter from './UserReducer/FilterUserReducer';
import movies from './MovieReducer/MovieReducer'

const myReducer = combineReducers({
    users,
    isDisplayUserForm ,
    userEditing,
    userFilter,
    movies

})

export default myReducer;