import React, { Component } from 'react';
import {Modal, Button, ThemeProvider} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as actions from "../../../actions/roomAction/index"
import RoomForm from '../../Modal/RoomModal/RoomForm'
import SeatForm from '../../Modal/SeatModal/SeatForm';

class RoomControl extends Component {

    onHandleModal = () => {
        if(this.props.roomEditing.id === '' ){
            this.props.onToggleRoomForm();
        }else {
            this.props.onClearRoom({
                id: '',
                name :'',
                roomNumber: ''

            })
            this.props.onToggleRoomForm();
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
            <div className = "mb-2 float-left ml-3 mt-3">
                <button onClick={this.onHandleModal} type="button" className="btn btn-primary">
                    <span className="fas fa-plus mr-2"></span>Thêm phòng
                </button>
                <RoomForm></RoomForm>
                <SeatForm></SeatForm>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isDisplayRoomForm : state.isDisplayRoomForm,
        roomEditing : state.roomEditing
    }

}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onToggleRoomForm: ()=>{
            dispatch(actions.toggleModal())
        },
        onClearRoom: (room) => {
            dispatch(actions.getRoomInfo(room))
        }
    }
} 

export default connect(mapStateToProps, mapDispatchToProps ) (RoomControl);
