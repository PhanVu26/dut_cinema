import React, { Component } from 'react';
import AccountItem from './AccountItem'

class AccountList extends Component {

    render() {
        return (
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th className="text-center">STT</th>
                        <th className="text-center">ID</th>
                        <th className="text-center">Username</th>
                        <th className="text-center">Ngày tạo</th>
                        <th className="text-center">Trạng Thái</th>
                        <th className="text-center">Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    
                    <AccountItem></AccountItem>
                    <AccountItem></AccountItem>
                    <AccountItem></AccountItem>
                    <AccountItem></AccountItem>
                    <AccountItem></AccountItem>
                    <AccountItem></AccountItem>
                </tbody>
            </table>
        );
    }
}

export default AccountList;
