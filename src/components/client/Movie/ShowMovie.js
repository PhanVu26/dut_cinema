import { Movie } from "@material-ui/icons";
import React, { Component } from "react";
import MovieItem from "./MovieItem";

class ShowMovie extends Component {
  showMovieContent = (movies = []) => {
    let data = movies.map((movie, index) => {
      return <MovieItem key={index} movie={movie} />;
    });
    return data;
  };

  render() {
    let { movies } = this.props;
    // 
    return <div className="row">{this.showMovieContent(movies)}</div>;
  }
}

export default ShowMovie;
