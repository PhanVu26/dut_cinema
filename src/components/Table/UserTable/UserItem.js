import React, { Component } from 'react';
import {Modal, Button} from "react-bootstrap";
import {connect} from 'react-redux';
import * as actions from '../../../actions/userManager/userAction'
import UserForm from '../../Form/UserForm/UserForm';

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
        const userUpdate = {
            id: this.props.user.id,
            isActive: !this.props.user.isActive
        }
        this.props.onUpdateUserStatus(userUpdate)
    }
    getUserEditing = () => {
        this.props.onToggleUserForm();
        console.log("id", this.props.user.id)
        this.props.onGetUserEditing(this.props.user.id)
    }
    showUserRole = (userRoles) => {
        const rs = userRoles.map((role, index) => {
            return role.role.name
        })
        return rs.toString();
    }
    render() {
        const {index, user} = this.props;
        const {isDisplayUserForm} = this.props;
        const status = user.isActive ? ' InActived ' : ' Actived ';  
        var role = user.role === 1 ? 'Quản lý phim' : user.role === 2 ? 'Quản lý lịch chiếu' : 'Người dùng';
        return (
            <tr>
                {/* <td className="text-center">{index}</td> */}
                <td className="text-center">{user.id}</td>
                <td className="text-center">{user.name}</td>
                <td className="text-center">{user.email}</td>
                <td className="text-center">{user.age}</td>
                <td className="text-center">{this.showUserRole(user.userRoles)}</td>
                {/* <td className="text-center">{user.createdAt}</td> */}
                <td className="text-center">
                    <i 
                        className= {user.isActive ? 'fas fa-toggle-on': 'fas fa-toggle-off' }
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
        onUpdateUserStatus: (user) => {
            dispatch(actions.actUpdateUserStatusRequest(user))
        },
        onGetUserEditing : (id) => {
            dispatch(actions.actGetUserRequest(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserItem);
