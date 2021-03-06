import React, { Component } from 'react';
import UserItem from './UserItem';
import {connect} from 'react-redux';
import * as actions from '../../../actions/index'
import { getRoles } from '@testing-library/dom';

class UserList extends Component {
    constructor(props){
        super(props);

        this.state = {
            nameFilter: '',
            roleFilter: -1,
            statusFilter: -1
        }
    }

    showUserRoles = roles => {
        const userRoles = roles.filter(role =>{
            return role.name.toLowerCase() != "Admin".toLowerCase();
        })
        var result = null;
        if (userRoles.length > 0) {
          result = userRoles.map((role, index) => {
            return <option key={role.id} value={role.id} >{role.name}</option>;
          });
        }
        return result;
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
                return user.name.toLowerCase().indexOf(userFilter.username.toLowerCase()) !== -1
            })
        }
        rowsPerPage = rowsPerPage.filter((user) => {
            if(userFilter.status === -1){
                return rowsPerPage;
            }else {
                return user.isActive === (userFilter.status === 0 ? true : false)
            }
        })

        // rowsPerPage = rowsPerPage.filter((user) => {
        //     // switch(userFilter.role){
        //     //     case 0: return user.role === 1; break;
        //     //     case 1: return user.role === 2; break;
        //     //     case 2: return user.role === 3; break;
        //     //     default: return rowsPerPage;
        //     // }
        //         return user.userRoles.some(role => {
        //             return role.id === userFilter.role;
        //         })
        //     }else return rowsPerPage;    
            
        // })

        if(userFilter.role !== -1){
            rowsPerPage = rowsPerPage.filter((user) => {
                return user.userRoles.some(role => {
                    return role.role.id == userFilter.role
                })
            })
        }

        
        return (
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        {/* <th className="text-center">STT</th> */}
                        <th className="text-center">ID</th>
                        <th className="text-center">T??n</th>
                        <th className="text-center">Email</th>
                        <th className="text-center">Tu???i</th>
                        <th className="text-center">Vai tr??</th>
                        {/* <th className="text-center">Ng??y t???o</th> */}
                        <th className="text-center">Tr???ng Th??i</th>
                        <th className="text-center">H??nh ?????ng</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>
                            <input 
                                type="text"
                                name="nameFilter"
                                placeholder='Nh???p username'
                                onChange={this.handleChange}
                                value={this.state.nameFilter}>
                            </input>
                        </td>
                        <td></td>
                        <td></td>
                        <td>
                            <select 
                                name="roleFilter"
                                onChange={this.handleChange}
                                value={this.state.roleFilter} >
                                    <option value={-1}>T???t c???</option>
                                    {this.showUserRoles(this.props.roles)}
                            </select>
                        </td>
                        <td>
                            <select 
                                name="statusFilter"
                                onChange={this.handleChange}
                                value={this.state.statusFilter}>
                                    <option value={-1}>T???t c???</option>
                                    <option value={0}>k??ch ho???t</option>
                                    <option value={1}>???n</option>
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
        pageInfo: state.pageInfo,
        roles: state.roles
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
