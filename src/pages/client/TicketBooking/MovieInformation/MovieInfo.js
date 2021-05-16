import React, { useState } from "react";
import { Link } from "react-router-dom";
import Rating from "material-ui-rating";
import ShowTimesMovie from "../ShowTimesMovie/ShowTimesMovie";
import { actRatingItemMovieRequest } from "../../../../actions/index";
import { useDispatch } from "react-redux";
import moment from "moment";


function MovieInfo(props) {
  var rate = 8.1;
  var numberOfReviews = 107;
  const dispatch = useDispatch();
  const [showRating, setShowRating] = useState(false);
  const onRating = () => {
    if (showRating === false) {
      setShowRating(true);
    }
  };

  const onChangeRating = (value, rate_, numberOfReviews) => {
    console.log(`Rated with value ${value}`);
    let rate = parseFloat(rate_);
    let number = parseInt(numberOfReviews) + 1;
    let vote;
    rate = rate * numberOfReviews;
    vote = (rate + value) / number;
    vote = Math.round(vote * 100) / 100;
    console.log(vote);
    // rate = vote.toString();
    // numberOfReviews = number.toString();
    //dispatch(actRatingItemMovieRequest(movie));
    // localStorage.setItem("movie", JSON.stringify(movie));
    alert(`Bạn đã đánh giá ${value} sao`);
  };

  let color = {
    color: "#b9b9b9",
  };
  let colorIcon = {
    color: "rgb(255, 152, 0)",
  };
  let linksStyle = {
    color: "black",
    textTransform: "uppercase",
    fontSize: "18px",
  };
  let showRatingHide = {
    display: "none",
  };
  let showRatingUp = {
    display: "block",
  };

  let { itemMovieInfo, account } = props;
  console.log(props);
  console.log(itemMovieInfo);
  
  let dataDateMovie = itemMovieInfo.showtimes.map((date, index) => {
    return (
      <ShowTimesMovie
        key={`date ${index}`}
        date={date}
        itemMovieInfo={itemMovieInfo}
        account={account}
      />
    );
  });

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-12">
          <span>
            <Link to="/" title="trang chủ " className="links">
              Trang Chủ
            </Link>
            <span style={color}> {`>`} </span>
            <Link to="/" title="Đặt vé" className="links">
              Đặt vé
            </Link>
            <span style={color}> {`>`} </span>{" "}
            <span className="text-uppercase"> {itemMovieInfo.name} </span>
          </span>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-12 col-lg-5 img">
          <div className="default-img">
            <img
              alt=""
              src="https://www.galaxycine.vn/media/2020/10/29/300-anime_1603948612503.jpg"
              className="loading"
              data-was-processed="true"
            />
          </div>
        </div>
        <div className="col-md-12 col-lg-7 movie-information">
          <h4 className="detail-title text-uppercase">{itemMovieInfo.name}</h4>
          <div className="rating mt-3">
            <i
              className="fas fa-star align-self-center mr-1"
              style={colorIcon}
            ></i>
            <span className="align-self-center mr-2">
              {rate} /10
            </span>
            <span className="align-self-center mr-2">
              ( {numberOfReviews} )
            </span>
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
              onChange={(value) => onChangeRating(value, rate, numberOfReviews)}
            />
          </div>
          <div className="rating mt-3">
            <span>
              <i className="far fa-clock"></i> {itemMovieInfo.duration} minutes
            </span>
          </div> 
          <div className="detail-info mt-3">
            <div className="detail-info-row">
              <span className="font-weight-bold">Diễn viên:&nbsp;</span>
              <div className="detail-info-right">{itemMovieInfo.actor}</div>
            </div>
            <div className="detail-info-row">
              <span className="font-weight-bold">Thể loại:&nbsp;</span>
              <div className="detail-info-right">{itemMovieInfo.type}</div>
            </div>
            <div className="detail-info-row">
              <span className="font-weight-bold">Quốc gia:&nbsp;</span>
              <div className="detail-info-right">{itemMovieInfo.country}</div>
            </div>
            <div className="detail-info-row">
              <span className="font-weight-bold">Nhà sản xuất:&nbsp;</span>
              <div className="detail-info-right">{itemMovieInfo.producer}</div>
            </div>
            <div className="detail-info-row">
              <span className="font-weight-bold">Ngày:&nbsp;</span>
              <div className="detail-info-right">
                {moment(itemMovieInfo.releaseDate).format("LL")}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row pb-2">
        <div className="col-md-12">
          <div className="mt-3">
            <a
              className="link hover-2"
              href="#tab_default_1"
              data-toggle="tab"
              aria-expanded="true"
              style={linksStyle}
            >
              Nội dung phim
            </a>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 mt-5">
          <p className="text">{itemMovieInfo.description}</p>
        </div>
      </div>
      <div className="row pb-2">
        <div className="col-md-12">
          <div className="mt-3">
            <a
              className="link hover-2"
              href="#tab_default_1"
              data-toggle="tab"
              aria-expanded="true"
              style={linksStyle}
            >
              suất chiếu
            </a>
          </div>
        </div>
      </div>
      {dataDateMovie}
    </div>
  );
}

export default React.memo(MovieInfo);
