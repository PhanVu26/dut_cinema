import { Button, Modal } from 'react-bootstrap';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions/movieManager/index';

import testThumbnail from '../../../assets/images/logo.png';
import style from '../MovieModal/MovieDetail.css'
class MovieModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            genreIds: [],
            author:"",
            producer:"",
            actorIds: [],
            releaseDate: "",
            thumbnail: "",
            description: ""
        }
    }
    toggleModal = () => {
        this.props.onToggleModal();
    }

    showGenres(genres){
        var results = [];
        genres.forEach(genre => {
            results.push(genre.name)
        }) 
        return results.toString();
    }
    showActors(actors){
        var results = [];
        actors.forEach(actor => {
            results.push(actor.name)
        }) 
        return results.toString();
    }
    
    // componentDidMount(){   
    //     this.setState({
    //         id: this.props.movieInfo.id,
    //         name: this.props.movieInfo.name,
    //         genreIds: this.props.movieInfo.genreIds,
    //         author: this.props.movieInfo.author,
    //         producer: this.props.movieInfo.producer,
    //         releaseDate: this.props.movieInfo.releaseDate,
    //         actors: this.props.movieInfo.actorIds,
    //         thumbnail: this.props.movieInfo.thumbnail
    //     })
        
    // }
    render() {
        const {isDisplayMovieModal} = this.props;
        const movie = this.props.movieInfo;
        return (
            <div>
                <form>
                    <Modal show={isDisplayMovieModal} size="lg" style={{maxWidth: '100%', width: '100%'}}>
                        <Modal.Header>Chi tiết phim</Modal.Header>
                        <Modal.Body>
                            <div className='row'>
                                <div className='col-md-8 col-lg-8 movie-details'>
                                    <table className='table'>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <span className="title-detail">ID phim:</span>
                                                </td>
                                                <td>
                                                    <span>{movie.id}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="title-detail">Tên phim:</span>
                                                </td>
                                                <td>
                                                    <span>{movie.name}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="title-detail">Thể loại:</span>
                                                </td>
                                                <td>
                                                    <span>{this.showGenres(movie.genreIds)}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="title-detail">Đạo diễn:</span>
                                                </td>
                                                <td>
                                                    <span>{movie.author}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="title-detail">Nhà sản xuất:</span>
                                                </td>
                                                <td>
                                                    <span>{movie.producer}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="title-detail">Ngày phát hành:</span>
                                                </td>
                                                <td>
                                                    <span>{movie.releaseDate}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="title-detail">Diễn viên:</span>
                                                </td>
                                                <td>
                                                    <span>{this.showActors(movie.actorIds)}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="title-detail">Mô tả phim:</span>
                                                </td>
                                                <td>
                                                    <span>{movie.description}</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                        
                                    </table>
                                </div>
                                <div className='col-md-4 col-lg-4'>
                                    <img src={testThumbnail}></img>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.toggleModal}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isDisplayMovieModal : state.isDisplayMovieModal,
        movieInfo: state.movieInfo
    }
}

const mapDispatchToProps = (dispatch, props) =>{
    return {
        onToggleModal: () => {
            dispatch(actions.toggleModal())
        },
        // // onDeleteUser: (id) => {
        // //     dispatch(actions.deleteUser(id))
        // // },
        // // onUpdateUserStatus: (id) => {
        // //     dispatch(actions.updateUserStatus(id))
        // // },
        // getMovieInfo : (movie) => {
        //     dispatch(actions.getMovieInfo(movie))
        // }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieModal);
