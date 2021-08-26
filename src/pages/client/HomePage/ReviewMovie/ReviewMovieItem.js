import React, { useState } from "react";
import "./ItemReviewMovie.css";
import Rating from "material-ui-rating";
import { useDispatch } from "react-redux";
import { actRatingItemReviewMovieRequest } from "../../../actions/action";
import { Link } from "react-router-dom";

function ItemReviewMovie(props) {
  const [showRating, setShowRating] = useState(false);
  const [rate, setRate] = useState(props.reviewMovie.vote.rate);
  const [number, setNumber] = useState(props.reviewMovie.vote.numberOfReviews);
  const dispatch = useDispatch();

  const onRating = () => {
    if (showRating === false) {
      setShowRating(true);
    }
  };

  const onChangeRating = (value, reviewMovie) => {
    
    let rate = parseFloat(reviewMovie.vote.rate);
    let number = parseInt(reviewMovie.vote.numberOfReviews) + 1;
    let vote;
    rate = rate * reviewMovie.vote.numberOfReviews;
    vote = (rate + value) / number;
    vote = Math.round(vote * 100) / 100;
    
    reviewMovie.vote.rate = vote.toString();
    reviewMovie.vote.numberOfReviews = number.toString();
    dispatch(actRatingItemReviewMovieRequest(reviewMovie));
    setRate(vote);
    setNumber(number);
    alert(`Bạn đã đánh giá ${value} sao`);
  };

  let size = {
    width: "100%",
  };
  let showRatingHide = {
    display: "none",
  };
  let showRatingUp = {
    display: "block",
  };
  let colorIcon = {
    color: "rgb(255, 152, 0)",
  };

  return (
    <div className="row mt-3 linkReivew">
      <div className=" col-4 col-md-5 col-lg-4 col-xl-3">
        <Link
          to={`reviews/${props.reviewMovie._id}`}
          className="linkReviewMovie"
        >
          <img
            style={size}
            className="imgMovie"
            src={props.reviewMovie.image}
            alt="anh"
          />
        </Link>
      </div>
      <div className="col-8 col-md-7 col-lg-8 col-xl-9">
        <div className="row">
          <div className="col-md-12">
            <Link
              to={`reviews/${props.reviewMovie._id}`}
              className="linkReviewMovie"
            >
              <h5 className="title">{props.reviewMovie.title}</h5>
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="rating mt-2">
              <i
                className="fas fa-star align-self-center mr-1"
                style={colorIcon}
              ></i>
              <span className="align-self-center mr-2">{rate} /10</span>
              <span className="align-self-center mr-2">( {number} )</span>
              <button
                type="button"
                className="btn btn-outline-info btn-sm"
                onClick={() => onRating()}
              >
                ĐÁNH GIÁ
              </button>
              <Rating
                style={showRating ? showRatingUp : showRatingHide}
                value={0}
                max={10}
                precision={0.5}
                onChange={(value) => onChangeRating(value, props.reviewMovie)}
              />
            </div>
          </div>
        </div>
        <div className="row content">
          <div className="col-md-12">
            <p className="mt-3 contentReviewMovie">
              {props.reviewMovie.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemReviewMovie;
