import { Button, Modal } from 'react-bootstrap';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions/userManager/userAction'

class UserForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            id: '',
            name : '',
            email: '',
            age:'',
            isActive: false,
            password:''
        }
    }

    onCloseForm = () => {
        this.props.onToggleUserForm();
    }
    onHandleChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name] : value
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        const isActive = this.state.isActive === "true" ? true: false
        const user = {...this.state, isActive: isActive};
        console.log("save user", user)
        this.props.onSaveUser(user);
        this.props.onToggleUserForm();
    }

    // componentDidMount(){
    //     console.log("get user", this.props.userEditing)
    //     if(this.props.userEditing && this.props.userEditing.id !== ''){
    //         this.setState({
    //             id: this.props.userEditing.id,
    //             name: this.props.userEditing.name,
    //             email: this.props.userEditing.email,
    //             password: this.props.userEditing.password,
    //             age: this.props.userEditing.age,
    //             isActive: this.props.userEditing.isActive,
    //         })
    //     }
    // }
    componentWillReceiveProps(nextProps) {
        if(nextProps.userEditing && nextProps.userEditing.id !== ''){
            this.setState({
                id: nextProps.userEditing.id,
                name: nextProps.userEditing.name,
                email: nextProps.userEditing.email,
                password: nextProps.userEditing.password,
                age: nextProps.userEditing.age,
                isActive: nextProps.userEditing.isActive,
            })
        }
    }
    render() {
        return (
            <div>
                <form onSubmit = {this.onSubmit} >
                    <Modal.Header>{this.props.userEditing.id === '' ? 'Thêm người dùng' : 'Chỉnh sửa thông tin'}</Modal.Header>
                    <Modal.Body>
                        <div className="panel-body">
                        <div className="form-group">
                                <label>ID :</label>
                                <input
                                    readOnly ={this.props.userEditing.id !== ''}
                                    type="text"
                                    className="form-control"
                                    name="id"
                                    value={this.state.id}
                                   
                                />
                            </div>
                            <div className="form-group">
                                <label>Email :</label>
                                <input
                                    readOnly ={this.props.userEditing.id !== ''}
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    value={this.state.email}
                                    onChange={ this.onHandleChange }
                                   
                                />
                            </div>
                            <div className="form-group">
                                <label>Name :</label>
                                <input
                                    readOnly ={this.props.userEditing.id !== ''}
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={this.state.name}
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
                                // value={this.state.role}
                                // onChange={ this.onHandleChange }
                                name="role"
                            >
                                <option defaultValue={1}>Quản lý phim</option>
                                <option value={2}>Quản lý lịch chiếu</option>
                                <option value={3}>Người dùng</option>
                            </select><br/>
                            <label>Trạng thái :</label>
                            <select
                                className="form-control"
                                value={this.state.isActive}
                                onChange={ this.onHandleChange }
                                name="isActive"
                            >
                                <option value={true}>Actived</option>
                                <option value={false}>InActived</option>
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
            dispatch(actions.actUpdateUserRequest(user))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
