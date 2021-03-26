import React, { Component } from 'react';
import AccountSearchControl from './AccountSearchControl';
import AccountSortControl from './AccountSortControl';
import {Button, Modal} from "react-bootstrap";
import { faHandHoldingMedical } from '@fortawesome/free-solid-svg-icons';
import AccountForm from './AccountForm';
import {connect} from 'react-redux';
import * as actions from '../../../actions/index';

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
    onSubmit = (event) => {
        event.preventDefault();
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
                            <button onClick={this.onHandleModal} type="button" className="btn btn-primary">
                                <span className="fas fa-plus mr-2"></span>Thêm Account
                            </button>
                            <Modal show={this.state.show}>
                                <Modal.Header>Quản lý tài khoản</Modal.Header>
                                <Modal.Body>
                                    <AccountForm
                                        onAddUser = {this.props.onAddUser}
                                    ></AccountForm>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick = {this.onSubmit}>
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

const mapStateToProps = (state) => {
    return {
        addUser : state.addUser
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddUser:  (user) =>{
            dispatch(actions.addUser(user))
        }
    }
} 

export default connect(mapStateToProps, mapDispatchToProps ) (AccountControl);
