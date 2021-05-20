import React from "react";
import "./MovieItem.css";
import { Link } from "react-router-dom";
import * as actions from "../../../actions/index";
import { useDispatch } from "react-redux";

function MovieItem(props) {
  let { movie } = props;
  const dispatch = useDispatch();
  const getMovie = (movie) => {
    dispatch(actions.getMovie(movie))
  }
  return (
    <div className="col-lg-4 col-md-6 col-sm-6 p-2 mt-2">
      <div className="box">
        <img alt=""  src="https://www.galaxycine.vn/media/2020/10/29/450-anime_1603948617423.jpg" />
        <div className="box-content">
          <h6 className="title">{movie.name}</h6>
          <span className="post">{movie.producer}</span>
          <ul className="icon">
            <li>
            <Link to={"/booking/" + movie.name}>
                  <i onClick={() => getMovie(movie)}className="fas fa-shopping-cart"></i>
                </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default React.memo(MovieItem);
