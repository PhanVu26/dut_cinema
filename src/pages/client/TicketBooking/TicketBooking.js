import React from "react";
import "./TicketBooking.css";
import { useSelector } from "react-redux";
import MovieInfo from "./MovieInformation/MovieInfo";

function TicketBooking() {
  var itemMovieInfo =
    useSelector((state) => state.MovieReducer.showInfoMovie) || [];
  
  if (Object.keys(itemMovieInfo).length !== 0) {
    localStorage.setItem("movie", JSON.stringify(itemMovieInfo));
  } else {
    itemMovieInfo = JSON.parse(localStorage.getItem("movie"));
  }
  let account = JSON.parse(localStorage.getItem("account"));
  if (Object.keys(account).length !== 0) {
    localStorage.setItem("account", JSON.stringify(account));
  } else {
    account = JSON.parse(localStorage.getItem("account"));
  }
  if (itemMovieInfo) {
    let ItemMovie = itemMovieInfo.map((itemMovieInfo, index) => {
      return (
        <MovieInfo
          key={`movie ${index}`}
          itemMovieInfo={itemMovieInfo}
          account={account}
        />
      );
    });
    return <div className="container my-4">{ItemMovie}</div>;
  }
}

export default React.memo(TicketBooking);
