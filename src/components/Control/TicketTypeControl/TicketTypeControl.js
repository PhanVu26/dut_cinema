import React, { Component } from 'react';
import {Modal, Button, ThemeProvider} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as actions from "../../../actions/ticketTypeAction/index"
import TicketTypeForm from '../../Modal/TicketTypeModal/TicketTypeForm';

class TicketTypeControl extends Component {

    onHandleModal = () => {
        if(this.props.ticketTypeEditing.id === '' ){
            this.props.onToggleTicketTypeForm();
        }else {
            this.props.onClearTicketType({
                id: '',
                name :'',

            })
            this.props.onToggleTicketTypeForm();
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
            <div className = "mb-2 float-left ml-2 mt-2">
                <button onClick={this.onHandleModal} type="button" className="btn btn-primary">
                    <span className="fas fa-plus mr-2"></span>Thêm loại vé
                </button>
                <TicketTypeForm></TicketTypeForm>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isDisplayTicketTypeForm : state.isDisplayTicketTypeForm,
        ticketTypeEditing : state.ticketTypeEditing
    }

}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onToggleTicketTypeForm: ()=>{
            dispatch(actions.toggleTicketTypeForm())
        },
        onClearTicketType: (ticketType) => {
            dispatch(actions.getTicketTypeInfo(ticketType))
        }
    }
} 

export default connect(mapStateToProps, mapDispatchToProps ) (TicketTypeControl);
