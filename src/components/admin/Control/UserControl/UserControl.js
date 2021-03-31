import React, { Component } from 'react';
import UserSearchControl from './UserSearchControl';
import UserSortControl from './UserSortControl';
import UserForm from '../../Form/UserForm/UserForm';
import {Modal, Button, ThemeProvider} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as actions from '../../../../actions/index'

class UserControl extends Component {

    onHandleModal = () => {
        console.log("user editing: ", this.props.userEditing)
        if(this.props.userEditing.id === '' ){
            this.props.onToggleUserForm();
        }else {
            this.props.onClearUser({
                id: '',
                username :'',
                password: '',
                status: false,
                role: ''

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
            <div className="row mb-3">
                <div className="col-md-8">
                    <UserSearchControl />
                </div>
                <div className="col-md-4">
                    <div className="row">
                        <div className="col-md-6">
                            <UserSortControl/>
                        </div>
                        <div className="col-md-6">
                            <button onClick={this.onHandleModal} type="button" className="btn btn-primary">
                                <span className="fas fa-plus mr-2"></span>Thêm User
                            </button>
                            <Modal show={isDisplayUserForm}>
                                <UserForm></UserForm>
                            </Modal>
                        </div>
                    </div>
                </div>
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
