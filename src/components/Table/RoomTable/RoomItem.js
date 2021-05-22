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
    // onDeleteroom = () => {
    //     this.props.onDeleteroom(this.props.room.id);
    // }
   
    // editroom = () => {
    //     this.props.onToggleroomForm();
    //     this.props.getroomInfo(this.props.room)
    // }
    
    render() {
        const {index, room} = this.props;
 
        return (
            <tr>
                <td className="text-center">{room.id}</td>
                <td className="text-center">{room.name}</td>       
                <td className="text-center">{room.roomNumber}</td>
                <td className="text-center">
                    <button 
                        // onClick={this.editroom}
                        type="button" 
                        className="btn btn-warning">
                        <span className="fa fa-pencil"></span>
                    </button>
                    {/* <roomForm></roomForm> */}
                    <button
                        // onClick={() => {if(window.confirm('Bạn có muốn xóa room này?')){this.onDeleteroom()};}} 
                        type="button" 
                        className="btn btn-danger ml-2 mr-2">
                        <span className="far fa-trash-alt"></span>
                    </button>
                    <NavLink to={"/admin/rooms/" + room.id}>
                        <button 
                            type="button" 
                            className="btn btn-danger"
                            // onClick={this.getroomInfo}
                            >
                            <span className="fas fa-eye"></span>
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
        // onToggleModal: () => {
        //     dispatch(actions.toggleModal())
        // },
        onToggleRoomForm: () => {
            dispatch(actions.toggleModal())
        },
        getRoomInfo : (room) => {
            dispatch(actions.getRoomInfo(room))
        },
        // onDeleteroom: (id) => {
        //     dispatch(actions.actDeleteroomRequest(id))
        // },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomItem);
