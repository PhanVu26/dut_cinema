import React, { Component } from 'react';
import {Modal, Button, ThemeProvider} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as actions from "../../../actions/genreAction/index"
import GenreForm from '../../Modal/GenreModal/GenreForm';

class GenreControl extends Component {

    onHandleModal = () => {
        if(this.props.genreEditing.id === '' ){
            this.props.onToggleGenreForm();
        }else {
            this.props.onClearGenre({
                id: '',
                name :'',

            })
            this.props.onToggleGenreForm();
        }
    }
    onSubmit = (event) => {
        event.preventDefault();
    }

    onCloseForm = () => {
        this.props.onCloseForm();
    }
    render() {
        return (
            <div className = "mb-2 float-left ml-2 mt-2">
                <button onClick={this.onHandleModal} type="button" className="btn btn-primary">
                    <span className="fas fa-plus mr-2"></span>Thêm thể loại
                </button>
                <GenreForm></GenreForm>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isDisplayGenreForm : state.isDisplayGenreForm,
        genreEditing : state.genreEditing
    }

}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onToggleGenreForm: ()=>{
            dispatch(actions.toggleGenreForm())
        },
        onClearGenre: (genre) => {
            dispatch(actions.getGenreInfo(genre))
        }
    }
} 

export default connect(mapStateToProps, mapDispatchToProps ) (GenreControl);
