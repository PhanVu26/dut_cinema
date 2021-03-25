import React, { Component } from 'react';

class AccountForm extends Component {

    render() {
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                </div>
                <div className="panel-body">
                    <form >
                        <div className="form-group">
                            <label>Username :</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                // value={this.state.name}
                                // onChange={ this.onHandleChange }
                            />
                        </div>
                        <div className="form-group">
                            <label>Password :</label>
                            <input
                                type="text"
                                className="form-control"
                                name="password"
                                // value={this.state.name}
                                // onChange={ this.onHandleChange }
                            />
                        </div>
                        <label>Vai trò :</label>
                        <select
                            className="form-control"
                            // value={this.state.status}
                            // onChange={this.onHandleChange}
                            name="role"
                        >
                            <option value="1">Quản lý phim</option>
                            <option value="2">Quản lý lịch chiếu</option>
                        </select><br/>
                        <label>Trạng thái :</label>
                        <select
                            className="form-control"
                            // value={this.state.status}
                            // onChange={this.onHandleChange}
                            name="status"
                        >
                            <option value="1">Active</option>
                            <option value="2">Inactive</option>
                        </select><br/>
                    </form>
                </div>
            </div>
        );
    }
}

export default AccountForm;
