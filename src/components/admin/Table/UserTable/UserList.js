import React, { Component } from 'react';
import UserItem from './UserItem';
import {connect} from 'react-redux';

class UserList extends Component {

    render() {
        console.log(this.props.users);
        return (
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th className="text-center">STT</th>
                        <th className="text-center">ID</th>
                        <th className="text-center">Username</th>
                        <th className="text-center">Vai trò</th>
                        <th className="text-center">Ngày tạo</th>
                        <th className="text-center">Trạng Thái</th>
                        <th className="text-center">Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.users.map((user, index) => {
                            return (
                                <UserItem key={user.id}
                                    index = {index + 1}
                                    //id = {user.id}
                                    // username = {user.username}
                                    // role = {user.role}
                                    // createdAt = {user.createdAt}
                                    // status = {user.status}
                                    user = {user}
                                    >
                                </UserItem>
                            )      
                        })
                    }
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}
export default connect(mapStateToProps, null) (UserList);
