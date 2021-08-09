import React, { Component } from 'react';
import {Modal, Button} from "react-bootstrap";
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../../../actions/roomAction/index'



class RoomItem extends Component {

    constructor(props){
        super(props);
    }
    // onHandleModal = () => {
    //     this.props.onToggleUserForm()
    // }
    onDeleteRoom = () => {
        this.props.onDeleteRoom(this.props.room.id);
    }
   
    editRoom = () => {
        this.props.onToggleRoomForm();
        this.props.getRoomInfo(this.props.room)
    }
    addSeats = () => {
        this.props.onToggleSeatModal();
        this.props.getRoomInfo(this.props.room)
    }
    
    render() {
        const {index, room} = this.props;
 
        return (
            <tr>
                <td className="text-center">{room.id}</td>
                <td className="text-center">{"Phòng " + room.roomNumber}</td>       
                <td className="text-center">{room.roomNumber}</td>
                <td className="text-center">
                    <button 
                        onClick={this.editRoom}
                        type="button" 
                        className="btn btn-warning">
                        <span className="fa fa-pencil"></span>
                    </button>
                    {/* <roomForm></roomForm> */}
                    <button
                        onClick={() => {if(window.confirm('Bạn có muốn xóa room này?')){this.onDeleteRoom()};}} 
                        type="button" 
                        className="btn btn-danger ml-2 mr-2">
                        <span className="far fa-trash-alt"></span>
                    </button>
                    <button 
                        type="button" 
                        className="btn btn-primary"
                        onClick={this.addSeats}
                        >
                        <span className="fas fa-plus">Thêm ghế</span>
                    </button>
                    <NavLink to={"/admin/rooms/" + room.id + "/seats"}>
                        <button 
                            type="button" 
                            className="btn btn-danger"
                            >
                            <span className="fas fa-eye">Danh sách ghế</span>
                        </button>
                    </NavLink>
                </td>
            </tr>
        );
    }
}

const mapStateToProps = (state) => {

}

const mapDispatchToProps = (dispatch, props) =>{
    return {
        onToggleSeatModal: () => {
            dispatch(actions.toggleSeatModal())
        },
        onToggleRoomForm: () => {
            dispatch(actions.toggleModal())
        },
        getRoomInfo : (room) => {
            dispatch(actions.getRoomInfo(room))
        },
        onDeleteRoom: (id) => {
            dispatch(actions.actDeleteRoomRequest(id))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomItem);
