import * as types from "../../constants/ActionType";
import callApi from "../../utils/ApiCallerServer";

export const actFetchDataTicketTypesRequest = () => {
    return (dispatch) => {
        dispatch(loadTicketType())
      return callApi("ticket-types?page=1&perPage=1000", "GET", null).then((res) => {
          console.log("ticketTypes", res.data.results)
        dispatch(actFetchDataTicketTypes(res.data.results));
      });
    };
};

export const actFetchDataTicketTypes = (ticketTypes) => {
    return {
        type: types.LIST_ALL_TICKET_TYPE,
        ticketTypes
    }
}

export const listAllTicketTypes = () => {
    return {
        type: types.LIST_ALL_TICKET_TYPE
    }
}

export const actSaveTicketTypesRequest = (ticketType) => {
    return (dispatch) => {
        dispatch(loadTicketType())
        return callApi("ticket-types", "POST", ticketType).then((res) => {
            dispatch(saveTicketType(res.data));
            alert("Thêm thành công.")
      })
      .catch(err => {
        alert("Lỗi kết nối !!!")
      })
    };
};

export const saveTicketType = (ticketType) => {
    return {
        type: types.SAVE_TICKET_TYPE,
        ticketType
    }
}

export const toggleModal = () => {
    return {
        type: types.TOGGLE_TICKET_TYPE_MODAL,
    }
}

export const toggleTicketTypeForm = () => {
    return {
        type: types.TOGGLE_TICKET_TYPE_FORM,
    }
}


export const getTicketTypeInfo = (ticketType) => {
    return {
        type: types.GET_TICKET_TYPE_INFO,
        ticketType
    }
}
export const actDeleteTicketTypesRequest = (id) => {
    return (dispatch) => {
        dispatch(loadTicketType())
        return callApi(`ticket-types/${id}`, "DELETE", null).then((res) => {
            dispatch(deleteTicketType(id));
            alert("Xóa thành công.")
        })
        .catch(err => {
            alert("Lỗi kết nối !!!")
        })
    };
};
export const deleteTicketType = (id) => {
    return {
        type: types.DELETE_TICKET_TYPE,
        id
    }
}

export const filterTicketType = (filter) => {
    return {
        type: types.FILTER_TICKET_TYPE,
        filter
    }
}

export const actUpdateTicketTypesRequest = (ticketType) => {
    return (dispatch) => {
        dispatch(loadTicketType())
        return callApi(`ticket-types/${ticketType.id}`, "PATCH", ticketType).then((res) => {
            dispatch(actUpdateTicketType(res.data));
            alert("Cập nhật thành công.")
        })
        .catch(err => {
            alert("Lỗi kết nối !!!")
        })
    };
};

export const actUpdateTicketType = (ticketType) => {
    return {
        type: types.UPDATE_TICKET_TYPE,
        ticketType
    }
}

export const loadTicketType = () => {
    return {
        type: types.TICKET_TYPE_LOADING,
    }
}
