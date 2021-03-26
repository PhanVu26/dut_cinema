import { Button, Modal } from 'react-bootstrap';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions/index';

class AccountForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            name : '',
            password: '',
            role: '',
            status: true,
        }
    }

    onCloseForm = () => {
        this.props.onToggleForm();
    }
    onHandleChange = (event) => {
        var target = event.target;
        console.log(target)
        var name = target.name;
        var value = target.value;
        this.setState({
            [name] : value
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        const user = this.state;
        console.log(this.state)
        this.props.onAddUser(user);
        this.props.onToggleForm();
    }
    render() {
        return (
            <div>
                <form onSubmit = {this.onSubmit} >
                    <Modal.Header>Quản lý tài khoản</Modal.Header>
                    <Modal.Body>
                        <div className="panel-body">
                            <div className="form-group">
                                <label>Username :</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    value={this.state.username}
                                    onChange={ this.onHandleChange }
                                />
                            </div>
                            <div className="form-group">
                                <label>Password :</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="password"
                                    value={this.state.password}
                                    onChange={ this.onHandleChange }
                                />
                            </div>
                            <label>Vai trò :</label>
                            <select
                                className="form-control"
                                value={this.state.role}
                                onChange={ this.onHandleChange }
                                name="role"
                            >
                                <option value="movie-manager">Quản lý phim</option>
                                <option value="movie-showtime-manager">Quản lý lịch chiếu</option>
                                <option value="user">Người dùng</option>
                            </select><br/>
                            <label>Trạng thái :</label>
                            <select
                                className="form-control"
                                value={this.state.status}
                                onChange={ this.onHandleChange }
                                name="status"
                            >
                                <option value={true}>Active</option>
                                <option value={false}>Inactive</option>
                            </select><br/>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type='submit'>
                            Save
                        </Button>
                        <Button onClick={this.onCloseForm}>
                            Close
                        </Button>
                    </Modal.Footer>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onToggleForm: ()=>{
            dispatch(actions.toggleForm())
        },
        onAddUser: (user) => {
            dispatch(actions.addUser(user))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountForm);
