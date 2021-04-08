import React, { Component } from 'react';
import UserItem from './UserItem';
import {connect} from 'react-redux';
import * as actions from '../../../actions/index'

class UserList extends Component {
    constructor(props){
        super(props);

        this.state = {
            nameFilter: '',
            roleFilter: -1,
            statusFilter: -1
        }
    }

    showUsers = users => {
        var result = null;
        if (users.length > 0) {
          result = users.map((user, index) => {
            return <UserItem key={user.id} user={user} index={index + 1} />;
          });
        }
        return result;
      };

    handleChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        var filter = {
            username: name === 'nameFilter' ? value : this.state.nameFilter,
            role: name === 'roleFilter' ? value : this.state.roleFilter,
            status: name === 'statusFilter' ? value : this.state.statusFilter
        }
        this.setState({
            [name]: value
        })
        this.props.onFilterUser(filter)
        
    }

    render() {

        var{rowsPerPage, userFilter} = this.props;
        if(userFilter.username){
            rowsPerPage = rowsPerPage.filter((user) => {
                return user.username.toLowerCase().indexOf(userFilter.username.toLowerCase()) !== -1
            })
        }
        rowsPerPage = rowsPerPage.filter((user) => {
            if(userFilter.status === -1){
                return rowsPerPage;
            }else {
                return user.status === (userFilter.status === 0 ? true : false)
            }
        })

        rowsPerPage = rowsPerPage.filter((user) => {
            switch(userFilter.role){
                case 0: return user.role === 1; break;
                case 1: return user.role === 2; break;
                case 2: return user.role === 3; break;
                default: return rowsPerPage;
            }
            
        })
        console.log("list users ", rowsPerPage)
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
                    <tr>
                        <td></td>
                        <td></td>
                        <td>
                            <input 
                                type="text"
                                name="nameFilter"
                                placeholder='Nhập username'
                                onChange={this.handleChange}
                                value={this.state.nameFilter}>
                            </input>
                        </td>
                        <td>
                            <select 
                                name="roleFilter"
                                onChange={this.handleChange}
                                value={this.state.roleFilter} >
                                    <option value={-1}>Tất cả</option>
                                    <option value={0}>Quản lý phim</option>
                                    <option value={1}>Quản lý lịch chiếu</option>
                                    <option value={2}>Người dùng</option>
                            </select>
                        </td>
                        <td></td>
                        <td>
                            <select 
                                name="statusFilter"
                                onChange={this.handleChange}
                                value={this.state.statusFilter}>
                                    <option value={-1}>Tất cả</option>
                                    <option value={0}>kích hoạt</option>
                                    <option value={1}>Ẩn</option>
                            </select>
                        </td>
                        <td></td>
                    </tr>
                    {this.showUsers(rowsPerPage)}
                    
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
        userFilter : state.userFilter,
        pageInfo: state.pageInfo
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onFilterUser: (filter) => {
            dispatch(actions.filterUser(filter))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (UserList);
