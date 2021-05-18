import React, { Component } from 'react';
import TransactionItem from './TransactionItem';
import {connect} from 'react-redux';
import * as actions from '../../../actions/index'

class TransactionList extends Component {
    constructor(props){
        super(props);
    }

    showTransactions = transactions => {
        var result = null;
        if (transactions.length > 0) {
          result = transactions.map((tr, index) => {
            return <TransactionItem key={tr.id} transaction={tr} index={index + 1} />;
          });
        }
        return result;
    };
    // handleChange = (e) => {
    //     var target = e.target;
    //     var name = target.name;
    //     var value = target.value;
    //     var filter = {
    //         username: name === 'nameFilter' ? value : this.state.nameFilter,
    //         role: name === 'roleFilter' ? value : this.state.roleFilter,
    //         status: name === 'statusFilter' ? value : this.state.statusFilter
    //     }
    //     this.setState({
    //         [name]: value
    //     })
    //     this.props.onFilterUser(filter)
        
    // }

    render() {

        var{rowsPerPage} = this.props;
        // if(userFilter.username){
        //     rowsPerPage = rowsPerPage.filter((user) => {
        //         return user.name.toLowerCase().indexOf(userFilter.username.toLowerCase()) !== -1
        //     })
        // }
        // rowsPerPage = rowsPerPage.filter((user) => {
        //     if(userFilter.status === -1){
        //         return rowsPerPage;
        //     }else {
        //         return user.isActive === (userFilter.status === 0 ? true : false)
        //     }
        // })

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

        // if(userFilter.role !== -1){
        //     rowsPerPage = rowsPerPage.filter((user) => {
        //         return user.userRoles.some(role => {
        //             return role.role.id == userFilter.role
        //         })
        //     })
        // }

        
        return (
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        {/* <th className="text-center">STT</th> */}
                        <th className="text-center">ID Transaction</th>
                        <th className="text-center">ID Vé</th>
                        <th className="text-center">Phim</th>
                        <th className="text-center">Giá</th>
                        <th className="text-center">Người đặt</th>
                        <th className="text-center">Email</th>
                        <th className="text-center">Thời gian</th>
                        <th className="text-center">Trạng Thái</th>
                        <th className="text-center">Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {this.showTransactions(rowsPerPage)}
                    
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
export default connect(mapStateToProps, mapDispatchToProps) (TransactionList);
