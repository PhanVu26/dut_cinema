import { Button, Modal } from 'react-bootstrap';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions/movieManager/index';


import OpenVideo from '../../../pages/client/TicketBooking/OpenVideoMovie/OpenVideo'
class MovieDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            genres: [],
            director:"",
            producer:"",
            actors: [],
            releaseDate: "",
            image: "",
            description: ""
        }
    }
    toggleModal = () => {
        this.props.onToggleModal();
    }

    showGenres(genres){
        var results = [];
        genres?.forEach(genre => {
            results.push(genre.name)
        }) 
        return results.toString();
    }
    showActors(actors){
        
        var results = [];
        actors?.forEach(actor => {
            results.push(actor.name)
        }) 
        return results.toString();
    }

    render() {
        const {isDisplayMovieModal} = this.props;
        const movie = this.props.movieInfo;
        return (
            <div>
                <form>
                    <Modal 
                        onHide = {this.props.onToggleModal}
                        show={isDisplayMovieModal} 
                        size="lg" 
                        style={{maxWidth: '100%', width: '100%'}}>
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
                                                    <span className="title-detail">Thời lượng:</span>
                                                </td>
                                                
                                                <td>
                                                    <span>{movie.duration + ' phút'}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="title-detail">Thể loại:</span>
                                                </td>
                                                <td>
                                                    <span>{this.showGenres(movie.genres)}</span>
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
                                                    <span>{this.showActors(movie.actors)}</span>
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
                                    <img 
                                        width="100%"                                        
                                        src={movie.image.thumbnailUrl}></img>
                                    <div className="play-bt" style={{left:"15%", top:"35%"}}>
                                        <OpenVideo info={movie} />
                                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);
