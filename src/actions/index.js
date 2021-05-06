import * as types from "../constants/ActionType";
import callApi from "../utils/ApiCallerServer";

export const listAllUsers = () => {
  return {
    type: types.LIST_ALL_USERS,
  };
};

export const saveUser = (user) => {
  return {
    type: types.SAVE_USER,
    user,
  };
};

export const toggleUserForm = () => {
  return {
    type: types.TOGGLE_USER_FORM,
  };
};

export const deleteUser = (id) => {
  return {
    type: types.DELETE_USER,
    id,
  };
};

export const updateUserStatus = (id) => {
  return {
    type: types.UPDATE_USER_STATUS,
    id,
  };
};

export const getUserEditing = (user) => {
  return {
    type: types.GET_USER_EDITING,
    user,
  };
};

export const filterUser = (filter) => {
  return {
    type: types.FILTER_USER,
    filter,
  };
};

export const actLoginAccountRequest = (account) => {
  return callApi("auth/login", "POST", account);
};
