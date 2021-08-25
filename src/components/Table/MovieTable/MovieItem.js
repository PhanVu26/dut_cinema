import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import * as actions from "../../../actions/movieManager/index";

import testImage from '../../../assets/images/logo.png'
import MovieForm from '../../Modal/MovieModal/MovieForm'
import MovieDetail from '../../Modal/MovieModal/MovieDetail'
import { NavLink } from 'react-router-dom';

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
    //     
    //     this.props.onToggleUserForm();
    //     this.props.getUserEditing(this.props.user)
    // }
    getMovie = () => {
        this.props.onToggleModal();
        this.props.onGetMovie(this.props.movie.id)

    }
    editMovie = () => {
        this.props.onToggleMovieForm();
        this.props.onGetMovie(this.props.movie.id)
    }
    showGenres(genres){
        var result = null;
        result = genres?.map(genre => {
            return <li key={genre.id}>{genre.name}</li>
        }) 
        return result;
    }
    showActors(actors){
        var result = null;
        result = actors?.map(actor => {
            return <li key={actor.id}>{actor.name}</li>
        }) 
        return result;
    }
    onDeleteMovie = () => {
        this.props.onDeleteMovie(this.props.movie.id);
    }
    render() {
        const {index, movie} = this.props;
        const genres = [] ;
        movie.genres?.forEach(genre => {
            genres.push(genre.name)
        });
        const actors = [] ;
        movie.actors?.forEach(actor => {
            actors.push(actor.name)
        });
        // const {isDisplayUserForm} = this.props;
        // const status = user.status ? ' ẩn ' : ' kích hoạt ';  
        // var role = user.role === 1 ? 'Quản lý phim' : user.role === 2 ? 'Quản lý lịch chiếu' : 'Người dùng';
        return (
            <tr>
                <td className="text-center">{movie.id}</td>
                <td className="text-center">{movie.name}</td>
                <td className="text-center">
                    <img src={movie.image.thumbnailUrl} height="80px" width="80px"></img>
                </td>
                
                <td className="text-center">
                    <ul className='list-unstyled'>
                        {
                            this.showGenres(movie.genres)
                        }
                    </ul>
                </td>
                <td className="text-center">{movie.country}</td>
                {/* <td className="text-center">{movie.director}</td> */}
                <td className="text-center">{movie.producer}</td>
                <td className="text-center">{movie.releaseDate}</td>
                {/* <td className="text-center">
                    <i 
                        className= {user.status ? 'fas fa-toggle-on': 'fas fa-toggle-off' }
                        onClick={() => {if(window.confirm('Bạn có muốn'+ status +'user này?')){this.toggleUserStatus()};}}>
                            
                    </i>
                </td> */}
                <td className="text-center">
                    <NavLink to = {"movies?id=" + movie.id}>
                        <button 
                            onClick={this.editMovie}
                            type="button" 
                            className="btn btn-warning mr-1 px-1">
                            <i className="fa fa-pencil"></i>
                        </button>
                    </NavLink>    
                    <button
                        onClick={() => {if(window.confirm('Bạn có muốn xóa Phim này?')){this.onDeleteMovie()};}} 
                        type="button" 
                        className="btn btn-danger mr-1 px-1">
                        <i className="far fa-trash-alt"></i>
                    </button>
                    <NavLink to = {"movies?id=" + movie.id}>
                        <button 
                            type="button" 
                            className="btn btn-primary mr-1 px-1"
                            onClick={this.getMovie}>
                            <i className="fas fa-eye"></i>
                        </button>
                    </NavLink>    
                </td>
                {/* <MovieForm></MovieForm> */}
            </tr>
        );
    }
}

// const mapStateToProps = (state) => {
//     return null;
// }

const mapDispatchToProps = (dispatch, props) =>{
    return {
        onToggleModal: () => {
            dispatch(actions.toggleModal())
        },
        onToggleMovieForm: () => {
            dispatch(actions.toggleMovieForm())
        },
        onGetMovie : (id) => {
            dispatch(actions.getMovieRequest(id))
        },
        onDeleteMovie: (id) => {
            dispatch(actions.actDeleteMovieRequest(id))
        },
        // onUpdateUserStatus: (id) => {
        //     dispatch(actions.updateUserStatus(id))
        // },
        // getUserEditing : (user) => {
        //     dispatch(actions.getUserEditing(user))
        // }
    }
}

export default connect(null, mapDispatchToProps)(MovieItem);
