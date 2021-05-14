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
    return callApi("movies?relations=actors,genres", "GET", null).then((res) => {
      dispatch(actFetchDataMovie(res.data.results));
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

export const actUpdateUserRequest = (users) => {
  return (dispatch) => {
    console.log(users._id);
    return callApi(`api/users/${users._id}`, "PUT", users).then((res) => {
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
  axios.interceptors.request.use(function (config) {
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    return Promise.reject(error);
  });
  return axios.post('https://cinema-nestjs.herokuapp.com/auth/login',account,{headers:{'Content-Type':'application/json'}})
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

export const actFetchDataBookingMovieRequest = (showtimeId) => {
  return (dispatch) => {
    return callApi(`showtimes/${showtimeId}/tickets`, "GET", null).then((res) => {
      console.log(res.data)
        dispatch(actFetchDataBookingMovie(res.data));
    });
  };
};

export const actFetchDataBookingMovie = (bookingMovie) => {
  return {
    type: Types.FETCH_DATA_BOOKING_MOVIE,
    bookingMovie,
  };
};

export const actCreateBookingRequest = (data) => {
  return (dispatch) => {
    return callApi("api/bookings/add", "POST", data).then((res) => {
      if (res.status === 200 || res.status === 201) {
        alert(
          "Đặt vé thành công, chúng tôi đã gửi mã QR code qua điện thoại của bạn, vui lòng đem mã số này đến quầy để nhận vé!"
        );
        dispatch(actCreateBooking(res.data));
        setTimeout(() => {
          history.push("/");
        }, 0);
      } else alert("Không thể kết nối dữ liệu!");
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
      console.log(res);
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
      } else alert("Không thể kết nối đến dữ liệu!");
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
      } else alert("Không thể kết nối dữ liệu!");
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
      console.log(res.data.results);
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
      console.log(res.data.results);
        dispatch(actFetchMovieByTheater(res.data.results));
    });
  };
};

export const actFetchMovieByTheater = (tt) => {
  return (dispatch) => {
    let theater =[];
    tt.map((item,index,tt) => {
      callApi(`cinemas/${item.id}/showtimes`,"GET",null).then((res) => {
        console.log(res.data);
        theater.push(res.data);
      }); 
    });
    dispatch(actFetchDataTheater(theater));
  }
}
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
      } else alert("Không thể kết nối đến dữ liệu!");
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
      return callApi(`movies/${id}?relations=actors,genres`, 'GET', null).then((res) => {
          console.log("res", res.data)
          dispatch(getMovie(res.data));
      });
  };
}
export const getMovie = (movie) => {
  return {
      type: Types.FETCH_MOVIE,
      movie
  }
}