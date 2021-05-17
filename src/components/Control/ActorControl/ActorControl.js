import React, { Component } from 'react';
import {Modal, Button, ThemeProvider} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as actions from "../../../actions/actorManager/index"
import ActorForm from '../../Modal/ActorModal/ActorForm';

class ActorControl extends Component {

    onHandleModal = () => {
        if(this.props.actorEditing.id === '' ){
            this.props.onToggleActorForm();
        }else {
            this.props.onClearActor({
                id: '',
                name :'',
                birthday: '',
                iamge: '',
                nationality:'',
                description: ''

            })
            this.props.onToggleActorForm();
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
            <div className = "mb-2 float-left">
                <button onClick={this.onHandleModal} type="button" className="btn btn-primary">
                    <span className="fas fa-plus mr-2"></span>Thêm diễn viên
                </button>
                <ActorForm></ActorForm>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isDisplayActorForm : state.isDisplayActorForm,
        actorEditing : state.actorEditing
    }

}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onToggleActorForm: ()=>{
            dispatch(actions.toggleActorForm())
        },
        onClearActor: (actor) => {
            dispatch(actions.getActorInfo(actor))
        }
    }
} 

export default connect(mapStateToProps, mapDispatchToProps ) (ActorControl);
