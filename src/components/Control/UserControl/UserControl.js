import React, { Component } from 'react';
// import UserSearchControl from './UserSearchControl';
// import UserSortControl from './UserSortControl';
import {Modal, Button, ThemeProvider} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as actions from "../../../actions/index"
import UserForm from '../../Form/UserForm/UserForm';

class UserControl extends Component {

    onHandleModal = () => {
        if(this.props.userEditing.id === '' ){
            this.props.onToggleUserForm();
        }else {
            this.props.onClearUser({
                id: '',
                name :'',
                password: '',
                isActive: false,
                age: '',
                email:''

            })
            this.props.onToggleUserForm();
        }
    }
    onSubmit = (event) => {
        event.preventDefault();
    }

    onCloseForm = () => {
        this.props.onCloseForm();
    }
    render() {
        const {isDisplayUserForm} = this.props;
        return (
            <div className = "mb-2 float-left">
                <button onClick={this.onHandleModal} type="button" className="btn btn-primary">
                    <span className="fas fa-plus mr-2"></span>Thêm User
                </button>
                <Modal 
                    show={isDisplayUserForm}
                    onHide = {this.props.onToggleUserForm}>
                    <UserForm></UserForm>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isDisplayUserForm : state.isDisplayUserForm,
        userEditing : state.userEditing
    }

}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onToggleUserForm: ()=>{
            dispatch(actions.toggleUserForm())
        },
        onClearUser: (user) => {
            dispatch(actions.getUserEditing(user))
        }
    }
} 

export default connect(mapStateToProps, mapDispatchToProps ) (UserControl);
