import { Button, Modal } from 'react-bootstrap';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions/roomAction/index';

class RoomForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
           room: {
                id: "",
                roomNumber:""
            },
            invalidMessage: ""
        }
    }
    
    

    componentWillReceiveProps(nextProps) {
        if(nextProps.roomEditing) {
            this.setState({
                room: nextProps.roomEditing,
            })
        }
    }
   
    onHandleChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState(prevState => ({
            room: {
                ...prevState.room,
                    [name]: value           
            }
        }))
        
    }

    

    validateRoom = () => {
        const room = this.state.room;
        if(room.roomNumber === ""){
                return false
            }
        return true;    
    }
    saveRoom = (event) => {
        event.preventDefault();
        if(this.validateRoom() === true) {
            if(this.props.roomEditing.id){
                
                this.props.onUpdateRoom(this.state.room)
                this.props.onToggleRoomForm()
            }else {
                const saveRoom = {
                    roomNumber: this.state.room.roomNumber,
                } 
                const id = window.location.pathname.split('/')[3];
                this.props.onSaveRoom(saveRoom, id)
                this.props.onToggleRoomForm()
            }
            
        }else {
            this.setState({
                invalidMessage : "Vui lòng nhập đầy đủ thông tin"
            })
        }
    }

    onHandleSearchChange = (e) => {
        // var {name, value} = e.target;
        // this.setState({
        //     [name]: value
        // })
    }
   
   

   

    render() {

        const {isDisplayRoomModal} = this.props;
        const {room} = this.state
        const roomEditing = this.props.roomEditing;

        return (
           <div>  
            <Modal 
                show={isDisplayRoomModal} 
                onHide = {this.props.onToggleRoomForm}
                size="lg"
                style={{maxWidth: '100%', width: '100%'}}>
                <Modal.Header>{roomEditing.id === "" ? "Taọ room mới" : "Chỉnh sửa thông tin room"}</Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.saveRoom}>
                        <div className='row'>
                            <div className='col-md-12 col-lg-12'>
                                { roomEditing.id === '' ? "":
                                    <div className="form-group">
                                        <label>ID room :</label>
                                        <label className="form-control">{room.id}</label>
                                    </div>
                                }
                                <div className="form-group">
                                    <label>Số phòng:</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="roomNumber"
                                        value={room.roomNumber}
                                        onChange={ this.onHandleChange }
                                    
                                    />
                                </div>
                            </div>                      
                        </div>                       
                    </form>    
                    <h5 className="text-danger">{this.state.invalidMessage !== "" ? this.state.invalidMessage: ""}</h5>
                </Modal.Body>
                <Modal.Footer>
                    
                    <Button onClick={this.saveRoom}>
                        Save
                    </Button>
                    <Button onClick={this.props.onToggleRoomForm}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isDisplayRoomModal : state.isDisplayRoomModal,
        roomEditing: state.roomEditing
    }
}

const mapDispatchToProps = (dispatch, props) =>{
    return {
        onToggleRoomForm: () => {
            dispatch(actions.toggleModal())
        },
        onSaveRoom: (room, id) => {
            dispatch(actions.actSaveRoomRequest(room, id))
        },
        onGetRoomEditing : (room) => {
            dispatch(actions.getRoomInfo(room))
        },
        onUpdateRoom: (room) => {
            dispatch(actions.actUpdateRoomRequest(room))
        },
        // // onDeleteUser: (id) => {
        // //     dispatch(actions.deleteUser(id))
        // // },
        // // onUpdateUserStatus: (id) => {
        // //     dispatch(actions.updateUserStatus(id))
        // // },
        getRoomInfo : (room) => {
            dispatch(actions.getRoomInfo(room))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomForm);
