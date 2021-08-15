import React, { Component } from 'react';
// import {Modal, Button, ThemeProvider} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as actions from "../../../actions/movieManager/index"
import MovieForm from '../../Modal/MovieModal/MovieForm';

class MovieControl extends Component {

    onHandleModal = () => {
        if(this.props.movieInfo.id === "" ){
            this.props.onToggleMovieForm();
        }else {
            this.props.onClearMovie({
                id: "",
                name :"",
                director: "",
                producer: "",
                genres: [],
                actors: [],
                releaseDate: "",
                description: "",
                image: ""

            })
            this.props.onToggleMovieForm();
        }
    }
    // onSubmit = (event) => {
    //     event.preventDefault();
    // }

    // onCloseForm = () => {
    //     this.props.onCloseForm();
    // }
    render() {
        // const {isDisplayUserForm} = this.props;
        return (
            <div className = "mb-2 float-left ml-2 mt-2">
                <button onClick={this.onHandleModal} type="button" className="btn btn-primary">
                    <span className="fas fa-plus mr-2"></span>Thêm phim
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isDisplayMovieForm : state.isDisplayMovieForm,
        movieInfo : state.movieInfo
    }

}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onToggleMovieForm: ()=>{
            dispatch(actions.toggleMovieForm())
        },
        onClearMovie: (movie) => {
            dispatch(actions.getMovie(movie))
        }
    }
} 

export default connect(mapStateToProps, mapDispatchToProps ) (MovieControl);
