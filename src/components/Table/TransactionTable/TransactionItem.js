import React, { Component } from 'react';
import {Modal, Button} from "react-bootstrap";
import {connect} from 'react-redux';
import * as actions from "../../../actions/transactionAction/index"
import TransactionDetail from '../../Modal/TransactionModal/TransactionDetail';

class TransactionItem extends Component {

    constructor(props){
        super(props);
    }
    onCancelTransaction = () => {
        //this.props.onDeleteMovie(this.props.movie.id);
    }
    getTransaction = () => {
        this.props.onToggleModal();
        this.props.onGetTransaction(this.props.transaction)

    }
    render() {
        const {index, transaction} = this.props;
        console.log("tr in item", transaction)
        // const {isDisplayUserForm} = this.props;
        // const status = transaction.ticket.status ? ' InActived ' : ' Actived ';  
        //var role = user.role === 1 ? 'Quản lý phim' : user.role === 2 ? 'Quản lý lịch chiếu' : 'Người dùng';
        return (
            <tr>
                {/* <td className="text-center">{index}</td> */}
                <td className="text-center">{transaction.id}</td>
                <td className="text-center">{transaction.ticket.id}</td>
                <td className="text-center">{transaction.ticket.showtime.movie.name}</td>
                <td className="text-center">{transaction.ticket.seat.row + transaction.ticket.seat.column}</td>
                <td className="text-center">{transaction.price}</td>
                <td className="text-center">{transaction.user.name}</td>
                <td className="text-center">{transaction.user.email}</td>
                <td className="text-center">{transaction.transaction_time}</td>
                <td className="text-center">{transaction.service}</td>
                <td className="text-center">   
                    <button
                        onClick={() => {if(window.confirm('Bạn có muốn hủy giao dịch này?')){this.onCancelTransaction()};}} 
                        type="button" 
                        className="btn btn-danger mr-1 px-1">
                        <i className="far fa-trash-alt"></i>
                    </button>
                    <button 
                        type="button" 
                        className="btn btn-primary mr-1 px-1"
                        onClick={this.getTransaction}>
                        <i className="fas fa-eye"></i>
                    </button>  
                </td>
            </tr>
            
        );
    }
}

const mapStateToProps = (state) => {
    return {
        transactions : state.transactions
    }
}

const mapDispatchToProps = (dispatch, props) =>{
    return {
        onToggleModal: () => {
            dispatch(actions.onToggleModal())
        },
        onGetTransaction: (transaction) => {
            dispatch(actions.getTransaction(transaction))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionItem);
