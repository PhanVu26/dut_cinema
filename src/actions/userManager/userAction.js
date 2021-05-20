import axios from "axios";
import * as types from "../../constants/ActionType";
import callApi from "../../utils/ApiCallerServer";


export const actFetchDataUsersRequest = () => {
    return (dispatch) => {
      return callApi("users?relations=userRoles,userRoles.role&page=1&perPage=1000", "GET", null).then((res) => {
        console.log("res", res)
        dispatch(listAllUsers(res.data.results));
      });
    };
};
export const listAllUsers = (users) => {
  return {
    type: types.LIST_ALL_USERS,
    users
  };
};

export const actFetchDataRolesRequest = () => {
  return (dispatch) => {
    return callApi("roles", "GET", null).then((res) => {
      console.log("res", res)
      dispatch(listAllRoles(res.data));
    });
  };
};
export const listAllRoles = (roles) => {
  return {
    type: types.FETCH_ALL_ROLES,
    roles
  };
};

export const actUpdateUserRequest = (user) => {
  return (dispatch) => {
    return callApi(`users/${user.id}`, "PATCH", user).then((res) => {
      console.log("res", res)
      dispatch(updateUser(res.data));
    });
  };
};

export const updateUser = (user) => {
  return {
    type: types.UPDATE_USER,
    user,
  };
};

export const actGetProfileRequest = (user) => {
  return (dispatch) => {
    return callApi(`users/me`, "GET", user).then((res) => {
      console.log("res get me", res)
      dispatch(getProfile(res.data));
    });
  };
};

export const getProfile = (user) => {
  return {
    type: types.GET_USER_EDITING,
    user,
  };
};

export const actUpdateProfileRequest = (user) => {
  return (dispatch) => {
    return callApi(`users/me`, "PATCH", user).then((res) => {
      console.log("res", res)
      dispatch(updateProfile(res.data));
    });
  };
};

export const updateProfile = (user) => {
  return {
    type: types.GET_USER_EDITING,
    user,
  };
};

export const actSaveUserRequest = (user) => {
  return (dispatch) => {
    return callApi(`users`, "POST", user).then((res) => {
      console.log("res", res)
      dispatch(saveUser(res.data));
    });
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
export const actDeleteUserRequest = (id) => {
  return (dispatch) => {
    return callApi(`users/${id}`, "DELETE", null).then((res) => {
      console.log("delete: res", res)
      if(res.status === 200){
        dispatch(deleteUser(id));
      }
    });
  };
};
export const deleteUser = (id) => {
  return {
    type: types.DELETE_USER,
    id,
  };
};

export const actUpdateUserStatusRequest = (user) => {
  return (dispatch) => {
    return callApi(`users/${user.id}`, "PATCH", user).then((res) => {
      console.log("res", res)
      dispatch(updateUserStatus(res.data.id));
    });
  };
};
export const updateUserStatus = (id) => {
  return {
    type: types.UPDATE_USER_STATUS,
    id,
  };
};

export const actGetUserRequest = (id) => {
  return (dispatch) => {
    return callApi(`users/${id}`, "GET", null).then((res) => {
      console.log("res", res)
      dispatch(getUserEditing(res.data));
    });
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
        filter
    }
}


// Test Login
export const actLoginAccountRequest = (account) => {
    //return callApi("auth/login", "POST", account);
    axios.interceptors.request.use(function (config) {
      return config;
    }, function (error) {
      return Promise.reject(error);
    });
}
