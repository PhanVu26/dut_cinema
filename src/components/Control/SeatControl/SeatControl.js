import React, { Component } from 'react';
import {Modal, Button, ThemeProvider} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as actions from "../../../actions/seatAction/index"
import SeatForm from '../../Modal/SeatModal/SeatForm';

class SeatControl extends Component {

    onHandleModal = () => {
        // if(this.props.roomEditing.id === '' ){
        //     this.props.onToggleRoomForm();
        // }else {
        //     this.props.onClearRoom({
        //         id: '',
        //         name :'',
        //         roomNumber: ''

        //     })
        //     this.props.onToggleRoomForm();
        // }
    }
    onSubmit = (event) => {
        event.preventDefault();
    }

    onCloseForm = () => {
        //this.props.onCloseForm();
    }
    render() {
        return (
            <div className = "mb-2 float-left">
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
        // roomEditing : state.roomEditing
    }

}

const mapDispatchToProps = (dispatch, props) => {
    return {
        // onToggleRoomForm: ()=>{
        //     dispatch(actions.toggleModal())
        // },
        // onClearRoom: (room) => {
        //     dispatch(actions.getRoomInfo(room))
        // }
    }
} 

export default connect(mapStateToProps, mapDispatchToProps ) (SeatControl);
