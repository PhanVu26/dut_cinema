import React from "react";
import "./MovieItem.css";

function MovieItem(props) {
  let { movie } = props;
  return (
    <div className="col-lg-4 col-md-6 col-sm-6 p-2 mt-2">
      <div className="box">
        <img alt=""  src="https://www.galaxycine.vn/media/2020/10/29/450-anime_1603948617423.jpg" />
        <div className="box-content">
          <h6 className="title">{movie.name}</h6>
          <span className="post">{movie.producer}</span>
          <ul className="icon">
            <li>
              <div className="mt-3">
                <i className="fas fa-shopping-cart"></i>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default React.memo(MovieItem);
