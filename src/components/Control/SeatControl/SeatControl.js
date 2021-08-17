import React, { Component } from 'react';
import {Modal, Button, ThemeProvider} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as actions from "../../../actions/seatAction/index"
import SeatForm from '../../Modal/SeatModal/SeatForm';

class SeatControl extends Component {

    onHandleModal = () => {
       this.props.onToggleSeatForm();
    }
    onSubmit = (event) => {
        event.preventDefault();
    }

    onCloseForm = () => {
        //this.props.onCloseForm();
    }
    render() {
        return (
            <div className = "mb-2 float-left ml-3 mt-3">
                <button onClick={this.onHandleModal} type="button" className="btn btn-primary">
                    <span className="fas fa-plus mr-2"></span>Thêm ghế
                </button>
                <SeatForm></SeatForm>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        // isDisplayRoomForm : state.isDisplayRoomForm,
        roomEditing : state.roomEditing
    }

}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onToggleSeatForm: ()=>{
            dispatch(actions.toggleSeatModal())
        }
    }
} 

export default connect(mapStateToProps, mapDispatchToProps ) (SeatControl);
