import React, { Component } from 'react';
import {Modal, Button, ThemeProvider} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as actions from "../../../actions/cinemaAction/index"
import CinemaForm from "../../Modal/CinemaModal/CinemaForm"

class CinemaControl extends Component {

    onHandleModal = () => {
        if(this.props.cinemaEditing.id === '' ){
            this.props.onToggleCinemaForm();
        }else {
            this.props.onClearCinema({
                id: '',
                name :'',
                address: ''

            })
            this.props.onToggleCinemaForm();
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
            <div className = "mb-2 float-left">
                <button onClick={this.onHandleModal} type="button" className="btn btn-primary">
                    <span className="fas fa-plus mr-2"></span>Thêm cienma
                </button>
                <CinemaForm></CinemaForm>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isDisplayCinemaForm : state.isDisplayCinemaForm,
        cinemaEditing : state.cinemaEditing
    }

}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onToggleCinemaForm: ()=>{
            dispatch(actions.toggleModal())
        },
        onClearCinema: (cinema) => {
            dispatch(actions.getCinemaInfo(cinema))
        }
    }
} 

export default connect(mapStateToProps, mapDispatchToProps ) (CinemaControl);
