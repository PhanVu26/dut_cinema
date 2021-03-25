import React, { Component } from 'react';
import {Modal, Button} from "react-bootstrap";
import AccountForm from './AccountForm';

class AccountItem extends Component {

    constructor(props){
        super(props);
        this.state = {
            show : false,
            showDelete: false
        }
    }

    onHandleModal = () => {
        this.setState({
            show: !this.state.show,
            showdelete: !this.state.showDelete
        })
    }
    render() {
        return (
            <tr>
                <td className="text-center">1</td>
                <td className="text-center">1123</td>
                <td className="text-center">PhanVu</td>
                <td className="text-center">10/10/2019</td>
                <td className="text-center">Actived</td>
                <td className="text-center">
                    <button onClick={this.onHandleModal} type="button" className="btn btn-warning">
                        <span className="fa fa-pencil mr-2"></span>Sửa
                    </button>
                    <Modal show={this.state.show}>
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

export default AccountItem;
