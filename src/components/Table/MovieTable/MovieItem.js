import React, { Component } from 'react';
import {Modal, Button} from "react-bootstrap";
import {connect} from 'react-redux';
import * as actions from '../../../actions/movieManager/index'

import testImage from '../../../assets/images/logo.png'
import MovieForm from '../../Modal/MovieModal/MovieForm'
import MovieModal from '../../Modal/MovieModal/MovieDetail'

class MovieItem extends Component {

    constructor(props){
        super(props);
    }
    // onHandleModal = () => {
    //     this.props.onToggleUserForm()
    // }
    // onDeleteUser = () => {
    //     this.props.onDeleteUser(this.props.user.id);
    // }
    // toggleUserStatus = () => {
    //     this.props.onUpdateUserStatus(this.props.user.id)
    // }
    // getUserEditing = () => {
    //     console.log("get user editing", this.props.user)
    //     this.props.onToggleUserForm();
    //     this.props.getUserEditing(this.props.user)
    // }
    getMovieInfo = () => {
        this.props.onToggleModal();
        this.props.getMovieInfo(this.props.movie)
        console.log("xem movie:", this.props.movie)
    }
    showGenres(genres){
        var result = null;
        result = genres.map(genre => {
            return <li key={genre.id}>{genre.name}</li>
        }) 
        return result;
    }
    showActors(actors){
        var result = null;
        result = actors.map(actor => {
            return <li key={actor.id}>{actor.name}</li>
        }) 
        return result;
    }
    render() {
        const {index, movie} = this.props;
        const genres = [] ;
        movie.genreIds.forEach(genre => {
            genres.push(genre.name)
        });
        const actors = [] ;
        movie.actorIds.forEach(actor => {
            actors.push(actor.name)
        });
        // const {isDisplayUserForm} = this.props;
        // const status = user.status ? ' ẩn ' : ' kích hoạt ';  
        // var role = user.role === 1 ? 'Quản lý phim' : user.role === 2 ? 'Quản lý lịch chiếu' : 'Người dùng';
        return (
            <tr>
                <td className="text-center">{index}</td>
                <td className="text-center">{movie.id}</td>
                <td className="text-center">{movie.name}</td>
                <td className="text-center">
                    <img src={movie.thumbnail} height="80px" width="80px"></img>
                </td>
                <td className="text-center">
                    <ul className='list-unstyled'>
                        {
                            this.showGenres(movie.genreIds)
                        }
                    </ul>
                </td>
                <td className="text-center">{movie.author}</td>
                <td className="text-center">{movie.producer}</td>
                <td className="text-center">{movie.releaseDate}</td>
                {/* <td className="text-center">
                    <i 
                        className= {user.status ? 'fas fa-toggle-on': 'fas fa-toggle-off' }
                        onClick={() => {if(window.confirm('Bạn có muốn'+ status +'user này?')){this.toggleUserStatus()};}}>
                            
                    </i>
                </td> */}
                <td className="text-center">
                    <button 
                        type="button" 
                        className="btn btn-warning">
                        <span className="fa fa-pencil"></span>
                    </button>
                    {/* <MovieForm movie={movie}></MovieForm> */}
                    &nbsp;
                    <button type="button" className="btn btn-danger">
                        <span className="far fa-trash-alt"></span>
                    </button>
                    &nbsp;
                    <button 
                        type="button" 
                        className="btn btn-danger"
                        onClick={this.getMovieInfo}>
                        <span className="fas fa-eye"></span>
                    </button>
                </td>
                <MovieModal ></MovieModal>
            </tr>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isDisplayMovieModal : state.isDisplayMovieModal
    }
}

const mapDispatchToProps = (dispatch, props) =>{
    return {
        onToggleModal: () => {
            dispatch(actions.toggleModal())
        },
        getMovieInfo : (movie) => {
            dispatch(actions.getMovieInfo(movie))
        }
        // onDeleteUser: (id) => {
        //     dispatch(actions.deleteUser(id))
        // },
        // onUpdateUserStatus: (id) => {
        //     dispatch(actions.updateUserStatus(id))
        // },
        // getUserEditing : (user) => {
        //     dispatch(actions.getUserEditing(user))
        // }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieItem);
