import React, { Component } from 'react';
import {Modal, Button} from "react-bootstrap";
import UserForm from '../../Form/UserForm/UserForm';
import {connect} from 'react-redux';
import * as actions from '../../../../actions/index';

class UserItem extends Component {

    constructor(props){
        super(props);
    }
    onHandleModal = () => {
        this.props.onToggleUserForm()
    }
    onDeleteUser = () => {
        this.props.onDeleteUser(this.props.user.id);
    }
    toggleUserStatus = () => {
        this.props.onUpdateUserStatus(this.props.user.id)
    }
    getUserEditing = () => {
        console.log("get user editing", this.props.user)
        this.props.onToggleUserForm();
        this.props.getUserEditing(this.props.user)
    }
    render() {
        const {index, user} = this.props;
        const {isDisplayUserForm} = this.props;
        const status = user.status ? ' ẩn ' : ' kích hoạt ';  
        var role = user.role === 1 ? 'Quản lý phim' : user.role === 2 ? 'Quản lý lịch chiếu' : 'Người dùng';
        return (
            <tr>
                <td className="text-center">{index}</td>
                <td className="text-center">{user.id}</td>
                <td className="text-center">{user.username}</td>
                <td className="text-center">{role}</td>
                <td className="text-center">{user.createdAt}</td>
                <td className="text-center">
                    <i 
                        className= {user.status ? 'fas fa-toggle-on': 'fas fa-toggle-off' }
                        onClick={() => {if(window.confirm('Bạn có muốn'+ status +'user này?')){this.toggleUserStatus()};}}>
                            
                    </i>
                </td>
                <td className="text-center">
                    <button onClick={this.getUserEditing} type="button" className="btn btn-warning">
                        <span className="fa fa-pencil mr-2"></span>Sửa
                    </button>
                    <Modal show={isDisplayUserForm}>
                        <UserForm></UserForm>
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
        userEditing : state.userEditing
    }
}

const mapDispatchToProps = (dispatch, props) =>{
    return {
        onToggleUserForm: () => {
            dispatch(actions.toggleUserForm())
        },
        onDeleteUser: (id) => {
            dispatch(actions.deleteUser(id))
        },
        onUpdateUserStatus: (id) => {
            dispatch(actions.updateUserStatus(id))
        },
        getUserEditing : (user) => {
            dispatch(actions.getUserEditing(user))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserItem);
