import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../../actions/index';
import {Link} from 'react-router-dom'


class MovieDetail extends Component {

    constructor(props){
        super(props);
        this.state = {
            movie: {}
        }
        
    }
    showGenres(genres){
        var results = [];
        genres?.forEach(genre => {
            results.push(genre.name)
        }) 
        console.log("result", results)
        return results.toString();
    }
    showActors(actors){
        console.log("actors", actors)
        var results = [];
        actors?.forEach(actor => {
            results.push(actor.name)
        }) 
        return results.toString();
    }
    render() {
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

        const movie = this.props.MovieInfo;

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
                        <span className="text-uppercase"> {movie.name} </span>
                    </span>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12 col-lg-5 img">
                    <div className="default-img">
                        <img
                        alt=""
                        width="100%"
                        src={movie.image.mainImage? movie.image.mainImage : "https://static.mservice.io/blogscontents/momo-upload-api-210312150001-637511580015634364.jpg"}
                        className="loading"
                        data-was-processed="true"
                        />
                    </div>
                    <div className="play-bt">
                        {/* <OpenVideo info={itemmovieInfo} /> */}
                    </div>
                    </div>
                    <div className="col-md-12 col-lg-7 movie-information">
                    <h4 className="detail-title text-uppercase">{movie.name}</h4>
                    <div className="rating mt-3">
                        <i
                        className="fas fa-star align-self-center mr-1"
                        style={colorIcon}
                        ></i>
                        <span className="align-self-center mr-2">
                        {/* {itemMovieInfo.vote.rate} /10 */}
                        8/10
                        </span>
                        <span className="align-self-center mr-2">
                        {/* ( {itemMovieInfo.vote.numberOfReviews} ) */}
                        51 người đã đánh giá
                        </span>
                        <button
                        type="button"
                        className="btn btn-outline-info btn-sm"
                        // onClick={() => onRating()}
                        >
                        ĐÁNH GIÁ
                        </button>
                        {/* <Rating
                        style={showRating ? showRatingUp : showRatingHide}
                        value={0}
                        max={10}
                        precision={0.5}
                        onChange={(value) => onChangeRating(value, itemMovieInfo)}
                        /> */}
                    </div>
                    <div className="rating mt-3">
                        <span>
                        <i className="far fa-clock"></i> {movie.duration + " phút"}
                        </span>
                    </div>
                    <div className="detail-info mt-3">
                        <div className="detail-info-row mb-3">
                            <span className="font-weight-bold h5">Diễn viên:&nbsp;</span>
                            <span className="h6">{this.showActors(movie.actors)}</span>
                        </div>
                        <div className="detail-info-row mb-3">
                            <span className="font-weight-bold h5">Thể loại:&nbsp;</span>
                            <span className="h6">{this.showGenres(movie.genres)}</span>
                        </div>
                        <div className="detail-info-row mb-3">
                            <span className="font-weight-bold h5">Quốc gia:&nbsp;</span>
                            <span className="h6">{movie.country}</span>
                        </div>
                        <div className="detail-info-row mb-3">
                            <span className="font-weight-bold h5">Nhà sản xuất:&nbsp;</span>
                            <span className="h6">{movie.producer}</span>
                        </div>
                        <div className="detail-info-row mb-3">
                            <span className="font-weight-bold h5">Ngày:&nbsp;</span>
                            <span className="h6">
                                {movie.releaseDate}
                            </span>
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
                        {movie.description}
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
                {/* {dataDateMovie} */}
                {/* <ShowTimesMovie></ShowTimesMovie> */}
                </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        MovieInfo: state.MovieInfo
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        getMovieInfo : async (id) => {
            await dispatch(actions.getMovieRequest(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);
