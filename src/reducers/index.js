import {combineReducers} from "redux";
import users from "./UserReducer";
import isDisplayUserForm from './DisplayUserFormReducer';
import userEditing from './UserEditingReducer';
import userFilter from './FilterUserReducer';

const myReducer = combineReducers({
    users,
    isDisplayUserForm ,
    userEditing,
    userFilter

})

export default myReducer;