import React, { Component } from 'react';
import {Modal, Button} from "react-bootstrap";
import AccountForm from './AccountForm';
import {connect} from 'react-redux';
import * as actions from '../../../actions/index';

class AccountItem extends Component {

    onHandleModal = () => {
        this.props.onToggleForm()
    }
    render() {
        const {index, id, username, status, role, createdAt} = this.props;
        const {isDisplayForm} = this.props;
        return (
            <tr>
                <td className="text-center">{index}</td>
                <td className="text-center">{id}</td>
                <td className="text-center">{username}</td>
                <td className="text-center">{role}</td>
                <td className="text-center">{createdAt}</td>
                <td className="text-center">{status}</td>
                <td className="text-center">
                    <button onClick={this.onHandleModal} type="button" className="btn btn-warning">
                        <span className="fa fa-pencil mr-2"></span>Sửa
                    </button>
                    <Modal show={isDisplayForm}>
                        <Modal.Header><h2>Quản lý tài khoản</h2></Modal.Header>
                        <Modal.Body>
                            <AccountForm></AccountForm>                          
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick = {this.onhandleModal}>
                                Save
                            </Button>
                            <Button onClick = {this.onHandleModal}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    &nbsp;
                    <button type="button" className="btn btn-danger">
                        <span className="fa fa-trash mr-2"></span>Xóa
                    </button>
                </td>
            </tr>
        );
    }
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = (dispatch, props) =>{
    return {
        onToggleForm: () => {
            dispatch(actions.toggleForm())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountItem);
