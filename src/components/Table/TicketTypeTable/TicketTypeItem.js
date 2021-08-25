import React, { Component } from 'react';
import {Modal, Button} from "react-bootstrap";
import {connect} from 'react-redux';
import * as actions from '../../../actions/ticketTypeAction/index'



class TicketTypeItem extends Component {

    constructor(props){
        super(props);
    }
    onDeleteTicketType = () => {
        this.props.onDeleteTicketType(this.props.ticketType.id);
    }
    editTicketType = () => {
        this.props.onToggleTicketTypeForm();
        this.props.getTicketTypeInfo(this.props.ticketType)
    }
    render() {
        const {index, ticketType} = this.props;
        return (
            <tr>
                <td className="text-center">{index}</td>
                <td className="text-center">{ticketType.id}</td>
                <td className="text-center">{ticketType.name}</td>
                <td className="text-center">{ticketType.price}</td>
                <td className="text-center">
                    <button 
                        onClick={this.editTicketType}
                        type="button" 
                        className="btn btn-warning">
                        <span className="fa fa-pencil"></span>
                    </button>
                    <button
                        onClick={() => {if(window.confirm('Bạn có muốn xóa loại vé này?')){this.onDeleteTicketType()};}} 
                        type="button" 
                        className="btn btn-danger ml-2 mr-2">
                        <span className="far fa-trash-alt"></span>
                    </button>
                </td>
            </tr>
        );
    }
}

const mapStateToProps = (state) => {

}

const mapDispatchToProps = (dispatch, props) =>{
    return {
        onToggleTicketTypeForm: () => {
            dispatch(actions.toggleTicketTypeForm())
        },
        getTicketTypeInfo : (ticketType) => {
            dispatch(actions.getTicketTypeInfo(ticketType))
        },
        onDeleteTicketType: (id) => {
            dispatch(actions.actDeleteTicketTypesRequest(id))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketTypeItem);
