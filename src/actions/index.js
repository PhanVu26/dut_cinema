import * as Types from "../constants/ActionType";
import history from "../commons/history";
import callApi from "../utils/ApiCallerServer";
import axios from "axios";

export const listAllUsers = () => {
  return {
    type: Types.LIST_ALL_USERS,
  };
};

export const addUser = (user) => {
  return {
    type: Types.ADD_USER,
    user,
  };
};

export const toggleUserForm = () => {
  return {
    type: Types.TOGGLE_USER_FORM,
  };
};

export const deleteUser = (id) => {
  return {
    type: Types.DELETE_USER,
    id,
  };
};

export const actFetchDataMovieRequest = () => {
  return (dispatch) => {
    return callApi("movies?page=1&perPage=1000&relations=actors,genres", "GET", null).then(
      (res) => {
        dispatch(actFetchDataMovie(res.data.results));
      }
    );
  };
};

export const actFetchDataMovie = (movie) => {
  return {
    type: Types.FETCH_DATA_MOVIE,
    movie,
  };
};

export const actSearchMovie = (keyword) => {
  return {
    type: Types.SEARCH_MOVIE,
    keyword,
  };
};

//get data users
export const actFetchDataUsersRequest = () => {
  return (dispatch) => {
    return callApi("api/users", "GET", null).then((res) => {
      dispatch(actFetchDataUsers(res.data));
    });
  };
};

export const actFetchDataUsers = (users) => {
  return {
    type: Types.FETCH_DATA_USERS,
    users,
  };
};

//---------------------------------------------------------------------

export const actUpdateUserRequest = (user) => {
  // 
  return (dispatch) => {
    return callApi("users/me", "PATCH", user).then((res) => {
      dispatch(actUpdateUser(res.data));
    });
  };
};

export const actUpdateUser = (user) => {
  return {
    type: Types.UPDATE_USER,
    user,
  };
};
//------------------------------------------------------------------

export const actDeleteUserRequest = (id) => {
  return (dispatch) => {
    return callApi(`api/users/${id}`, "DELETE", null).then((res) => {
      dispatch(actDeleteUser(id));
    });
  };
};

export const actDeleteUser = (id) => {
  return {
    type: Types.DELETE_USER,
    id,
  };
};

export const actLoginAccountRequest = (account) => {
  //return callApi("auth/login", "POST", account);
  axios.interceptors.request.use(
    function (config) {
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  return axios.post("https://cinema-nestjs.herokuapp.com/auth/login", account, {
    headers: { "Content-Type": "application/json" },
  });
};

// act receive moving choosing
export const actReceiveMovieChoosing = (movie, date, time, idUser) => {
  return {
    type: Types.RECEIVE_MOVIE_CHOOSING,
    movie,
    date,
    time,
    idUser,
  };
};

export const actFetchDataBooking = (data) => {
  return {
    type: Types.GET_BOOKING,
    data,
  };
};

export const actUpdateMovieRequest = (data) => {
  return (dispatch) => {
    return callApi(`api/movies/${data._id}`, "PUT", data).then((res) => {
      dispatch(actUpdateMovie(res.data));
    });
  };
};

export const actUpdateMovie = (data) => {
  return {
    type: Types.UPDATE_MOVIE,
    data,
  };
};

export const actAddMovieRequest = (data) => {
  return callApi("api/movies/add", "POST", data);
};

export const actDeleteMovieRequest = (id) => {
  return (dispatch) => {
    return callApi(`api/movies/${id}`, "DELETE", null).then((res) => {
      if (res.status === 200) {
        dispatch(actDeleteMovie(id));
      }
    });
  };
};

export const actDeleteMovie = (id) => {
  return {
    type: Types.DELETE_MOVIE,
    id,
  };
};

export const actFetchDataTransactionRequest = (listType) => {
  return (dispatch) => {
    return callApi(
      `transactions/me?filter={"service":{"in": ${listType}}}&orderBy={"transaction_time": "DESC"}&perPage=100&relations=user,ticket,ticket.showtime,ticket.showtime.movie,ticket.seat,ticket.seat.room,ticket.seat.room.cinema`,
      "GET",
      null
    )
      .then((res) => {
        dispatch(actFetchTransaction(res.data));
      })
      .catch((error) => {
        
      });
  };
};

export const actDeleteBooking = (payload) => {
  return callApi(`tickets`, "POST", payload);
};

export const actFetchTransaction = (transaction) => {
  return {
    type: Types.FETCH_TRANSACTION,
    transaction,
  };
};

export const actFetchDataBookingMovieRequest = (showtimeId) => {
  return (dispatch) => {
    return callApi(`showtimes/${showtimeId}/tickets`, "GET", null).then(
      (res) => {
        
        dispatch(actFetchDataBookingMovie(res.data));
      }
    );
  };
};

export const actFetchDataBookingMovie = (bookingMovie) => {
  return {
    type: Types.FETCH_DATA_BOOKING_MOVIE,
    bookingMovie,
  };
};

export const actCreateBookingRequest = (data, type) => {
  axios.interceptors.request.use(
    function (config) {
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  var b = JSON.parse(localStorage.getItem("account")).accessToken;
  var a = String("Bearer " + b);
  
  let result = axios.post("https://cinema-nestjs.herokuapp.com/tickets", data, {
    headers: { Authorization: a },
  });
  return (dispatch) => {
    result
      .then((res) => {
        if (type === "Booked") {
          alert("?????t v?? th??nh c??ng, vui l??ng ?????n qu???y ????? nh???n v??!");
          dispatch(actCreateBooking(res.data));
        } else if (type === "Sold") {
          alert("Mua v?? th??nh c??ng, vui l??ng ?????n qu???y ????? nh???n v??!");
        } else {
          alert("H???y ?????t v?? th??nh c??ng!");
        }
        history.push("/");
        history.go();
      })
      .catch(function (error) {
        
        alert("L???i k???t n???i");
      });
  };
};
export const actHoldBooking = (data) => {
  axios.interceptors.request.use(
    function (config) {
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  var b = JSON.parse(localStorage.getItem("account")).accessToken;
  var a = String("Bearer " + b);
  
  let result = axios.post("https://cinema-nestjs.herokuapp.com/tickets", data, {
    headers: { Authorization: a },
  });
  return (dispatch) => {
    result
      .then((res) => {
        history.push(`/pay-movie`);
        history.go();
      })
      .catch(function (error) {
        
        alert("L???i k???t n???i");
      });
  };
};
export const actCancleHoldBooking = (data) => {
  axios.interceptors.request.use(
    function (config) {
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  var b = JSON.parse(localStorage.getItem("account")).accessToken;
  var a = String("Bearer " + b);
  
  let result = axios.post("https://cinema-nestjs.herokuapp.com/tickets", data, {
    headers: { Authorization: a },
  });
  return (dispatch) => {
    result
      .then((res) => {
        history.push(`/buy-ticket`);
        history.go();
      })
      .catch(function (error) {
        
        alert("L???i k???t n???i");
      });
  };
};
export const actCreateBooking = (data) => {
  return {
    type: Types.CREATE_BOOKING,
    data,
  };
};

export function addMovieInformation(movie) {
  return {
    type: Types.SHOW_INFORMATION_MOVIE,
    movie,
  };
}

//------------------------------------------------------------------------------

//fetch data supports
export const actFetchDataSupportRequest = () => {
  return (dispatch) => {
    return callApi("api/supports", "GET", null).then((res) => {
      
      dispatch(actFetchDataSupport(res.data));
    });
  };
};

export const actFetchDataSupport = (support) => {
  return {
    type: Types.FETCH_DATA_SUPPORT,
    support,
  };
};

//------------------------------------------------------------------------------

export const actRatingItemMovieRequest = (movie) => {
  return (dispatch) => {
    return callApi(`api/movies/${movie._id}`, "PUT", movie).then((res) => {
      dispatch(actRatingItemMovie(res.data));
    });
  };
};

export const actRatingItemMovie = (movie) => {
  return {
    type: Types.RATING_ITEM_MOVIE,
    movie,
  };
};

//------------------------------------------------------------------------------

export const actFetchDataReviewMovieRequest = () => {
  return (dispatch) => {
    return callApi("api/reviewMovie", "GET", null).then((res) => {
      if (res.status === 200) {
        dispatch(actFetchDataReviewMovie(res.data));
      } else alert("Kh??ng th??? k???t n???i ?????n d??? li???u!");
    });
  };
};

export const actFetchDataReviewMovie = (reviewMovie) => {
  return {
    type: Types.FETCH_DATA_REVIEW_MOVIE,
    reviewMovie,
  };
};

//------------------------------------------------------------------------------

export const actRatingItemReviewMovieRequest = (reviewMovie) => {
  return (dispatch) => {
    return callApi(
      `api/reviewMovie/${reviewMovie._id}`,
      "PUT",
      reviewMovie
    ).then((res) => {
      dispatch(actRatingItemReviewMovie(res.data));
    });
  };
};

export const actRatingItemReviewMovie = (reviewMovie) => {
  return {
    type: Types.RATING_ITEM_REVIEW_MOVIE,
    reviewMovie,
  };
};

//------------------------------------------------------------------------------

export const actFetchDataFoodRequest = () => {
  return (dispatch) => {
    return callApi("api/foodCombo").then((res) => {
      if (res.status === 200) {
        dispatch(actFetchDataData(res.data));
      } else alert("Kh??ng th??? k???t n???i d??? li???u!");
    });
  };
};

export const actFetchDataData = (data) => {
  return {
    type: Types.FETCH_DATA_FOOD,
    data,
  };
};

//------------------------------------------------------------------------------

//act receive data ticket
export const actFetchDataTicketRequest = () => {
  return (dispatch) => {
    return callApi("ticket-types", "GET", null).then((res) => {
      
      dispatch(actFetchDataTicket(res.data.results));
    });
  };
};

export const actFetchDataTicket = (data) => {
  return {
    type: Types.FETCH_DATA_TICKETS,
    data,
  };
};

//------------------------------------------------------------------------------

export const actFetchDataTheaterRequest = () => {
  return (dispatch) => {
    return callApi("cinemas", "GET", null).then((res) => {
      
      dispatch(actFetchMovieByTheater(res.data.results));
    });
  };
};

export const actFetchMovieByTheater = (tt) => {
  return (dispatch) => {
    let theater = [];
    tt.map((item, index, tt) => {
      callApi(`cinemas/${item.id}/showtimes`, "GET", null).then((res) => {
        
        theater.push(res.data);
      });
    });
    dispatch(actFetchDataTheater(theater));
  };
};
export const actFetchDataMoviesByTheater = (movie) => {
  return {
    type: Types.FETCH_DATA_MOVIE,
    movie,
  };
};
export const actFetchDataTheater = (theater) => {
  return {
    type: Types.FETCH_DATA_THEATER,
    theater,
  };
};

//------------------------------------------------------------------------------

export const actFetchDataPromotionRequest = () => {
  return (dispatch) => {
    return callApi("api/promotions", "GET", null).then((res) => {
      if (res.status === 200) {
        dispatch(actFetchDataPromotion(res.data));
      } else alert("Kh??ng th??? k???t n???i ?????n d??? li???u!");
    });
  };
};

export const actFetchDataPromotion = (promotion) => {
  return {
    type: Types.FETCH_DATA_PROMOTION,
    promotion,
  };
};

//--------------------------------------------------------

export const actRegisterUserRequest = (user) => {
  return callApi("auth/register", "POST", user);
};

//-------------------------------------------------------

// get movie
export const getMovieRequest = (id) => {
  return (dispatch) => {
    return callApi(`movies/${id}?relations=actors,genres`, "GET", null).then(
      (res) => {
        
        dispatch(getMovie(res.data));
      }
    );
  };
};
export const getMovie = (movie) => {
  return {
    type: Types.FETCH_MOVIE,
    movie,
  };
};
export const getUserEditing = (user) => {
  return {
    type: Types.GET_USER_EDITING,
    user,
  };
};

export const filterUser = (filter) => {
  return {
    type: Types.FILTER_USER,
    filter,
  };
};

// Test Login
export const actTestLoginAccountRequest = (account) => {
  //return callApi("auth/login", "POST", account);
  axios.interceptors.request.use(
    function (config) {
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
};

// export const actFetchDataTransactionRequest = () => {
//   return (dispatch) => {
//     return callApi(`transactions?relations=user,ticket,ticket.showtime,ticket.showtime.movie`, "GET", null).then(
//       (res) => {
//         
//         dispatch(fetchDataTransaction(res.data));
//       }
//     );
//   };
// };

// export const fetchDataTransaction = (transactions) => {
//   return {
//     type: Types.FETCH_DATA_TRANSACTION,
//     transactions
// }
// }
