import {combineReducers} from "redux";
import users from "./UserReducer";
import isDisplayUserForm from './DisplayUserFormReducer'

const myReducer = combineReducers({
    users,
    isDisplayUserForm 
})

export default myReducer;