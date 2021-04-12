import * as Types from "../constants/ActionType";
import history from "../commons/history";
import callApi from "../utils/ApiCallerServer";

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

export const toggleForm = () => {
  return {
    type: Types.TOGGEL_FORM,
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
    return callApi("api/movies", "GET", null).then((res) => {
      dispatch(actFetchDataMovie(res.data));
    });
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
// export const actFetchDataUsersRequest = () => {
//   return (dispatch) => {
//     return callApi("api/users", "GET", null).then((res) => {
//       dispatch(actFetchDataUsers(res.data));
//     });
//   };
// };

export const actFetchDataUsers = (users) => {
  return {
    type: Types.FETCH_DATA_USERS,
    users,
  };
};

//---------------------------------------------------------------------

// export const actUpdateUserRequest = (users) => {
//   return (dispatch) => {
//     console.log(users._id);
//     return callApi(`api/users/${users._id}`, "PUT", users).then((res) => {
//       dispatch(actUpdateUser(res.data));
//     });
//   };
// };

export const actUpdateUser = (user) => {
  return {
    type: Types.UPDATE_USER,
    user,
  };
};
//------------------------------------------------------------------

// export const actDeleteUserRequest = (id) => {
//   return (dispatch) => {
//     return callApi(`api/users/${id}`, "DELETE", null).then((res) => {
//       dispatch(actDeleteUser(id));
//     });
//   };
// };

export const actDeleteUser = (id) => {
  return {
    type: Types.DELETE_USER,
    id,
  };
};

// export const actLoginAccountRequest = (account) => {
//   return callApi("api/users/login", "POST", account);
// };

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

// export const actUpdateMovieRequest = (data) => {
//   return (dispatch) => {
//     return callApi(`api/movies/${data._id}`, "PUT", data).then((res) => {
//       dispatch(actUpdateMovie(res.data));
//     });
//   };
// };

export const actUpdateMovie = (data) => {
  return {
    type: Types.UPDATE_MOVIE,
    data,
  };
};

// export const actAddMovieRequest = (data) => {
//   return callApi("api/movies/add", "POST", data);
// };

// export const actDeleteMovieRequest = (id) => {
//   return (dispatch) => {
//     return callApi(`api/movies/${id}`, "DELETE", null).then((res) => {
//       if (res.status === 200) {
//         dispatch(actDeleteMovie(id));
//       }
//     });
//   };
// };

export const actDeleteMovie = (id) => {
  return {
    type: Types.DELETE_MOVIE,
    id,
  };
};

// export const actFetchDataBookingMovieRequest = () => {
//   return (dispatch) => {
//     return callApi("api/bookings", "GET", null).then((res) => {
//       if (res.status === 200) {
//         dispatch(actFetchDataBookingMovie(res.data));
//       } else alert("Không thể kết nối đến dữ liệu!");
//     });
//   };
// };

export const actFetchDataBookingMovie = (bookingMovie) => {
  return {
    type: Types.FETCH_DATA_BOOKING_MOVIE,
    bookingMovie,
  };
};

// export const actCreateBookingRequest = (data) => {
//   return (dispatch) => {
//     return callApi("api/bookings/add", "POST", data).then((res) => {
//       if (res.status === 200 || res.status === 201) {
//         alert(
//           "Đặt vé thành công, chúng tôi đã gửi mã QR code qua điện thoại của bạn, vui lòng đem mã số này đến quầy để nhận vé!"
//         );
//         dispatch(actCreateBooking(res.data));
//         setTimeout(() => {
//           history.push("/");
//         }, 0);
//       } else alert("Không thể kết nối dữ liệu!");
//     });
//   };
// };

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

// fetch data supports
// export const actFetchDataSupportRequest = () => {
//   return (dispatch) => {
//     return callApi("api/supports", "GET", null).then((res) => {
//       console.log(res);
//       dispatch(actFetchDataSupport(res.data));
//     });
//   };
// };

export const actFetchDataSupport = (support) => {
  return {
    type: Types.FETCH_DATA_SUPPORT,
    support,
  };
};

//------------------------------------------------------------------------------

// export const actRatingItemMovieRequest = (movie) => {
//   return (dispatch) => {
//     return callApi(`api/movies/${movie._id}`, "PUT", movie).then((res) => {
//       dispatch(actRatingItemMovie(res.data));
//     });
//   };
// };

export const actRatingItemMovie = (movie) => {
  return {
    type: Types.RATING_ITEM_MOVIE,
    movie,
  };
};

//------------------------------------------------------------------------------

// export const actFetchDataReviewMovieRequest = () => {
//   return (dispatch) => {
//     return callApi("api/reviewMovie", "GET", null).then((res) => {
//       if (res.status === 200) {
//         dispatch(actFetchDataReviewMovie(res.data));
//       } else alert("Không thể kết nối đến dữ liệu!");
//     });
//   };
// };

export const actFetchDataReviewMovie = (reviewMovie) => {
  return {
    type: Types.FETCH_DATA_REVIEW_MOVIE,
    reviewMovie,
  };
};

//------------------------------------------------------------------------------

// export const actRatingItemReviewMovieRequest = (reviewMovie) => {
//   return (dispatch) => {
//     return callApi(
//       `api/reviewMovie/${reviewMovie._id}`,
//       "PUT",
//       reviewMovie
//     ).then((res) => {
//       dispatch(actRatingItemReviewMovie(res.data));
//     });
//   };
// };

export const actRatingItemReviewMovie = (reviewMovie) => {
  return {
    type: Types.RATING_ITEM_REVIEW_MOVIE,
    reviewMovie,
  };
};

//------------------------------------------------------------------------------

// export const actFetchDataFoodRequest = () => {
//   return (dispatch) => {
//     return callApi("api/foodCombo").then((res) => {
//       if (res.status === 200) {
//         dispatch(actFetchDataData(res.data));
//       } else alert("Không thể kết nối dữ liệu!");
//     });
//   };
// };

export const actFetchDataData = (data) => {
  return {
    type: Types.FETCH_DATA_FOOD,
    data,
  };
};

//------------------------------------------------------------------------------

// act receive data ticket
// export const actFetchDataTicketRequest = () => {
//   return (dispatch) => {
//     return callApi("api/tickets", "GET", null).then((res) => {
//       if (res.status === 200) {
//         dispatch(actFetchDataTicket(res.data));
//       } else alert("Không thể kết nối dữ liệu!");
//     });
//   };
// };

export const actFetchDataTicket = (data) => {
  return {
    type: Types.FETCH_DATA_TICKETS,
    data,
  };
};

//------------------------------------------------------------------------------

// export const actFetchDataTheaterRequest = () => {
//   return (dispatch) => {
//     return callApi("api/theaters", "GET", null).then((res) => {
//       if (res.status === 200) {
//         dispatch(actFetchDataTheater(res.data));
//       } else alert("Không thể kết nối đến dữ liệu!");
//     });
//   };
// };

export const actFetchDataTheater = (theater) => {
  return {
    type: Types.FETCH_DATA_THEATER,
    theater,
  };
};

//------------------------------------------------------------------------------

// export const actFetchDataPromotionRequest = () => {
//   return (dispatch) => {
//     return callApi("api/promotions", "GET", null).then((res) => {
//       if (res.status === 200) {
//         dispatch(actFetchDataPromotion(res.data));
//       } else alert("Không thể kết nối đến dữ liệu!");
//     });
//   };
// };

export const actFetchDataPromotion = (promotion) => {
  return {
    type: Types.FETCH_DATA_PROMOTION,
    promotion,
  };
};

//--------------------------------------------------------

// export const actRegisterUserRequest = (user) => {
//   return callApi("api/users/register", "POST", user);
// };

//-------------------------------------------------------
