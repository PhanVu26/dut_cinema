import React, { Component } from 'react';
import {Modal, Button} from "react-bootstrap";
import UserForm from '../../Form/UserForm/UserForm';
import {connect} from 'react-redux';
import * as actions from '../../../../actions/index';

class UserItem extends Component {

    onHandleModal = () => {
        this.props.onToggleUserForm()
    }
    onDeleteUser = () => {
        this.props.onDeleteUser(this.props.user.id);
    }
    render() {
        const {index, user} = this.props;
        const {isDisplayUserForm} = this.props;
        return (
            <tr>
                <td className="text-center">{index}</td>
                <td className="text-center">{user.id}</td>
                <td className="text-center">{user.username}</td>
                <td className="text-center">{user.role}</td>
                <td className="text-center">{user.createdAt}</td>
                <td className="text-center">{user.status}</td>
                <td className="text-center">
                    <button onClick={this.onHandleModal} type="button" className="btn btn-warning">
                        <span className="fa fa-pencil mr-2"></span>Sửa
                    </button>
                    <Modal show={isDisplayUserForm}>
                        <Modal.Header><h2>Quản lý tài khoản</h2></Modal.Header>
                        <Modal.Body>
                            <UserForm></UserForm>                          
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick = {this.onhandleModal}>
                                Save
                            </Button>
                            <Button onClick = {this.onHandleModal}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    &nbsp;
                    <button onClick={() => {if(window.confirm('Bạn có muốn xóa user này?')){this.onDeleteUser()};}} type="button" className="btn btn-danger">
                        <span className="far fa-trash-alt mr-2"></span>Xóa
                    </button>
                </td>
            </tr>
            
        );
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch, props) =>{
    return {
        onToggleUserForm: () => {
            dispatch(actions.toggleUserForm())
        },
        onDeleteUser: (id) => {
            dispatch(actions.deleteUser(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserItem);
