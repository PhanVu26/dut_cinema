import { Button, Modal } from 'react-bootstrap';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions/seatAction/index';
import * as acts from '../../../actions/index';

class SeatForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            seat: {
                type: "Normal",
                columns: 10,
                row: ""
            },
            room:"",
            invalidMessage: ""
        }
    }
    
    componentDidMount() {
        this.props.onFetchTicketTypes();
        this.setState(prevState => ({
            seat: {...prevState.seat},
            room: this.props.roomEditing
        }))
    }

    // componentWillReceiveProps(nextProps) {
    //     if(nextProps.roomEditing) {
    //         this.setState({
    //             seat: nextProps
    //             room: nextProps.roomEditing,
    //         })
    //     }
    // }
   
    onHandleChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState(prevState => ({
            seat:  {...prevState.seat, 
                [name]: value 
            },
            room: {...prevState.room}
        }))
        
        
    }

    

    validateSeat = () => {
        const {seat} = this.state;
        if(!seat.row || !seat.type){
                return false
            }
        return true;    
    }
    saveSeat = (event) => {
        event.preventDefault();
        
        if(this.validateSeat() === true) {
            const roomId = window.location.pathname.split('/')[3];
            this.props.onSaveSeat(this.state.seat, roomId)
            this.props.onToggleSeatForm();
            
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
   
   

    showTicketTypes = (tickets) => {
        const rs = tickets.map(t => {
            return (
                <option
                    value={t.name}>
                    {t.name}    
                </option>
            )
        })
        return rs;
    }

    render() {

        const {isDisplaySeatModal} = this.props;
        // const {room} = this.state
        // const roomEditing = this.props.roomEditing;

        return (
           <div>  
            <Modal 
                show={isDisplaySeatModal} 
                onHide = {this.props.onToggleSeatForm}
                size="lg"
                style={{maxWidth: '100%', width: '100%'}}>
                <Modal.Header>Tạo ghế mới</Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.saveSeat}>
                        <div className='row'>
                            <div className='col-md-12 col-lg-12'>
                             
                                    <div className="form-group">
                                        <label>Hàng ghế :</label>
                                        <select 
                                            name="row" 
                                            value={this.state.row}
                                            onChange={this.onHandleChange}
                                            className="form-control" >
                                            <option>Chọn hàng ghế</option>
                                            <option value="A">A</option>
                                            <option value="B">B</option>
                                            <option value="C">C</option>
                                        </select>
                                    </div>
                                
                                <div className="form-group">
                                    <label>Số ghế/hàng:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={10}
                                        disabled={true}
                                    
                                    />
                                </div>
                                {/* <div className="form-group">
                                    <label>Loại vé :</label>
                                    <select 
                                        value={this.state.type}
                                        onChange={this.onHandleChange}
                                        name="type" 
                                        className="form-control">
                                        <option>Chọn loại vé</option>
                                        {this.showTicketTypes(this.props.ticketTypes)}
                                    </select>
                                </div> */}
                            </div>                      
                        </div>                       
                    </form>    
                    <h5 className="text-danger">{this.state.invalidMessage !== "" ? this.state.invalidMessage: ""}</h5>
                </Modal.Body>
                <Modal.Footer>
                    
                    <Button onClick={this.saveSeat}>
                        Save
                    </Button>
                    <Button onClick={this.props.onToggleSeatForm}>
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
        isDisplaySeatModal : state.isDisplaySeatModal,
        ticketTypes : state.TicketReducer.tickets,
        roomEditing : state.roomEditing
        // roomEditing: state.roomEditing
    }
}

const mapDispatchToProps = (dispatch, props) =>{
    return {
        onToggleSeatForm: () => {
            dispatch(actions.toggleSeatModal())
        },
        onFetchTicketTypes: (room, id) => {
            dispatch(acts.actFetchDataTicketRequest())
        },
        onSaveSeat : (seat, id) => {
            dispatch(actions.actSaveSeatRequest(seat, id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeatForm);
