import {combineReducers} from "redux";
import users from "./users";
import isDisplayForm from './isDisplayForm'

const myReducer = combineReducers({
    users,
    isDisplayForm 
})

export default myReducer;