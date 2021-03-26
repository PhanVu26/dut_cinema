import React, { useEffect } from "react";
import ItemReviewMovie from "./ItemReviewMovie";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { actFetchDataReviewMovieRequest } from "../../../actions/action";
import "./ReviewMovie.css";

function ReviewMovie() {
  const dispatch = useDispatch();

  const reviewMovie =
    useSelector((state) => state.reducerMovie.reviewMovie, []) || [];

  useEffect(() => {
    dispatch(actFetchDataReviewMovieRequest());
  }, [dispatch]);

  let linksStyle = {
    color: "black",
    textTransform: "uppercase",
    fontSize: "18px",
  };

  let dataItemReviewMovie = reviewMovie.map((reviewMovie, index) => {
    return (
      <ItemReviewMovie key={`reviewMovie ${index}`} reviewMovie={reviewMovie} />
    );
  });
  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-md-12">
          <Link to="/review-film">
            <p
              className="link hover-2"
              href="#tab_default_1"
              data-toggle="tab"
              aria-expanded="true"
              style={linksStyle}
            >
              Bình Luận Phim
            </p>
          </Link>
        </div>
      </div>
      {dataItemReviewMovie}
    </div>
  );
}

export default React.memo(ReviewMovie);
