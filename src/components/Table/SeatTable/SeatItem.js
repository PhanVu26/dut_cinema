import React, { Component } from 'react';
import {Modal, Button} from "react-bootstrap";
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../../../actions/seatAction/index'



class SeatItem extends Component {

    constructor(props){
        super(props);
    }
    // onHandleModal = () => {
    //     this.props.onToggleUserForm()
    // }
    // onDeleteSeat = () => {
    //     this.props.onDeleteSeat(this.props.room.id);
    // }
   
    // editSeat = () => {
    //     this.props.onToggleSeatForm();
    //     this.props.getSeatInfo(this.props.room)
    // }
    // addSeats = () => {
    //     this.props.onToggleSeatModal();
    //     this.props.getSeatInfo(this.props.room)
    // }
    
    render() {
        const {index, seat} = this.props;
 
        return (
            <tr>
                <td className="text-center">{"Hàng ghế " + seat.row}</td>       
                <td className="text-center">{seat.quantity}</td>
                <td className="text-center">
                    {/* <button 
                        onClick={this.editSeat}
                        type="button" 
                        className="btn btn-warning">
                        <span className="fa fa-pencil"></span>
                    </button>
                    {/* <roomForm></roomForm> */}
                    {/*
                    <button
                        onClick={() => {if(window.confirm('Bạn có muốn xóa room này?')){this.onDeleteSeat()};}} 
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
                    </button> */}
                </td>
            </tr>
        );
    }
}

const mapStateToProps = (state) => {

}

const mapDispatchToProps = (dispatch, props) =>{
    return {
        // onToggleSeatModal: () => {
        //     dispatch(actions.toggleSeatModal())
        // },
        // onToggleSeatForm: () => {
        //     dispatch(actions.toggleModal())
        // },
        // getSeatInfo : (room) => {
        //     dispatch(actions.getSeatInfo(room))
        // },
        // onDeleteSeat: (id) => {
        //     dispatch(actions.actDeleteSeatRequest(id))
        // },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeatItem);
