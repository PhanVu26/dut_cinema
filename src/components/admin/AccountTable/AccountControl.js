import React, { Component } from 'react';
import AccountSearchControl from './AccountSearchControl';
import AccountSortControl from './AccountSortControl';
import {Button, Modal} from "react-bootstrap";
import { faHandHoldingMedical } from '@fortawesome/free-solid-svg-icons';
import AccountForm from './AccountForm';

class AccountControl extends Component {
    constructor(props){
        super(props);
        this.state = {
            show: false
        }       
    }
    handleModal = () => {
        this.setState({
            show: !this.state.show
        });
    }
    render() {
        return (
            <div className="row mb-3">
                <div className="col-md-8">
                    <AccountSearchControl />
                </div>
                <div className="col-md-4">
                    <div className="row">
                        <div className="col-md-6">
                            <AccountSortControl/>
                        </div>
                        <div className="col-md-6">
                            <Button onClick = {this.handleModal}>Thêm tài khoản</Button>
                            <Modal show={this.state.show}>
                                <Modal.Header>Quản lý tài khoản</Modal.Header>
                                <Modal.Body>
                                    <AccountForm></AccountForm>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick = {this.handleModal}>
                                        Save
                                    </Button>
                                    <Button onClick = {this.handleModal}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AccountControl;
