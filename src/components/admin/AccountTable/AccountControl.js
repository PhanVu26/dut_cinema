import React, { Component } from 'react';
import AccountSearchControl from './AccountSearchControl';
import AccountSortControl from './AccountSortControl';
import AccountForm from './AccountForm';
import {Modal, Button, ThemeProvider} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as actions from '../../../actions/index';

class AccountControl extends Component {

    onHandleModal = () => {
        console.log(this.props)
        this.props.onToggleForm();
    }
    onSubmit = (event) => {
        event.preventDefault();
    }

    onCloseForm = () => {
        this.props.onCloseForm();
    }
    render() {
        const {isDisplayForm} = this.props;
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
                            <Modal show={isDisplayForm}>
                                <AccountForm></AccountForm>
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
        isDisplayForm : state.isDisplayForm
    }

}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddUser:  (user) =>{
            dispatch(actions.addUser(user))
        },
        onToggleForm: ()=>{
            dispatch(actions.toggleForm())
        },
    }
} 

export default connect(mapStateToProps, mapDispatchToProps ) (AccountControl);
