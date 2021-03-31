import { Button, Modal } from 'react-bootstrap';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../../actions/index';
import { random } from 'lodash';
import { ThreeSixtySharp } from '@material-ui/icons';

class UserForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            id: '',
            username : '',
            password: '',
            role: '',
            status: true,
        }
    }

    onCloseForm = () => {
        this.props.onToggleUserForm();
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
        console.log("state edit", this.state)
        this.props.onSaveUser(user);
        this.props.onToggleUserForm();
    }

    componentDidMount(){
        console.log("props",  this.props.userEditing)
        if(this.props.userEditing && this.props.userEditing.id !== ''){
            this.setState({
                id: this.props.userEditing.id,
                password: this.props.userEditing.password,
                username: this.props.userEditing.username,
                role: this.props.userEditing.role,
                status: this.props.userEditing.status,
            })
        }
    }
    render() {
        console.log("id ", this.props.userEditing.id)
        return (
            <div>
                <form onSubmit = {this.onSubmit} >
                    <Modal.Header>{this.props.userEditing.id === '' ? 'Thêm người dùng' : 'Chỉnh sửa thông tin'}</Modal.Header>
                    <Modal.Body>
                        <div className="panel-body">
                            <div className="form-group">
                                <label>Username :</label>
                                <input
                                    readOnly ={this.props.userEditing.id !== ''}
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    value={this.state.username}
                                    onChange={ this.onHandleChange }
                                   
                                />
                            </div>
                            {this.props.userEditing.id !== '' ? '' : 
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
                            }
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
        userEditing : state.userEditing
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onToggleUserForm: ()=>{
            dispatch(actions.toggleUserForm())
        },
        onSaveUser: (user) => {
            console.log("update: ", user)
            dispatch(actions.saveUser(user))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
