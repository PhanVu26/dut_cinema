import { Button, Modal } from 'react-bootstrap';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions/ticketTypeAction/index';

class TicketTypeForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
           ticketType: {
                id: "",
                name: "",
                price: 0
            },
            invalidMessage: ""
        }
    }
    
    

    componentWillReceiveProps(nextProps) {
        if(nextProps.ticketTypeEditing) {
            this.setState({
                ticketType: nextProps.ticketTypeEditing,
            })
        }
    }
   
    onHandleChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        if(name === 'price'){
            const price = parseInt(value)
            this.setState(prevState => ({
                ticketType: {
                    ...prevState.ticketType,
                        [name]: price ,             
                }
            }))
        }else {
            this.setState(prevState => ({
                ticketType: {
                    ...prevState.ticketType,
                        [name]: value ,             
                }
            }))
        }
        
    }

    

    validateTicketType = () => {
        const ticketType = this.state.ticketType;
        if(ticketType.name === "" || ticketType.price === ""){
                return false
            }
        return true;    
    }
    saveTicketType = (event) => {
        event.preventDefault();
        if(this.validateTicketType() === true) {
            if(this.props.ticketTypeEditing.id){
                
                this.props.onUpdateTicketType(this.state.ticketType)
                this.props.onToggleTicketTypeForm()
            }else {
                const saveTicketType = {
                    name: this.state.ticketType.name,
                    price: this.state.ticketType.price
                } 
                this.props.onSaveTicketType(saveTicketType)
                this.props.onToggleTicketTypeForm()
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

        const {isDisplayTicketTypeForm} = this.props;
        const {ticketType} = this.state
        const ticketTypeEditing = this.props.ticketTypeEditing;

        return (
           <div>  
            <Modal 
                show={isDisplayTicketTypeForm} 
                onHide = {this.props.onToggleTicketTypeForm}
                size="lg"
                style={{maxWidth: '100%', width: '100%'}}>
                <Modal.Header>{ticketTypeEditing.id === "" ? "Tạo loại vé mới" : "Chỉnh sửa loại vé"}</Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.saveTicketType}>
                        <div className='row'>
                            <div className='col-md-12 col-lg-12'>
                                <div className="form-group">
                                    <label>Tên loại vé :</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={ticketType.name}
                                        onChange={ this.onHandleChange }
                                    
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Giá vé :</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="price"
                                        value={ticketType.price}
                                        onChange={ this.onHandleChange }
                                    
                                    />
                                </div>
                            </div>                      
                        </div>                       
                    </form>    
                    <h5 className="text-danger">{this.state.invalidMessage !== "" ? this.state.invalidMessage: ""}</h5>
                </Modal.Body>
                <Modal.Footer>
                    
                    <Button onClick={this.saveTicketType}>
                        Save
                    </Button>
                    <Button onClick={this.props.onToggleTicketTypeForm}>
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
        isDisplayTicketTypeForm : state.isDisplayTicketTypeForm,
        ticketTypeEditing: state.ticketTypeEditing
    }
}

const mapDispatchToProps = (dispatch, props) =>{
    return {
        onToggleTicketTypeForm: () => {
            dispatch(actions.toggleTicketTypeForm())
        },
        onSaveTicketType: (ticketType) => {
            dispatch(actions.actSaveTicketTypesRequest(ticketType))
        },
        onGetTicketTypeEditing : (ticketType) => {
            dispatch(actions.getTicketTypeInfo(ticketType))
        },
        onUpdateTicketType: (ticketType) => {
            dispatch(actions.actUpdateTicketTypesRequest(ticketType))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketTypeForm);
