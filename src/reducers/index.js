import {combineReducers} from "redux";
import users from "./UserReducer";
import isDisplayUserForm from './DisplayUserFormReducer';
import userEditing from './UserEditingReducer';

const myReducer = combineReducers({
    users,
    isDisplayUserForm ,
    userEditing
})

export default myReducer;