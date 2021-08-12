import { Button, Modal } from 'react-bootstrap';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions/transactionAction/index';

// import testImage from '../../../assets/images/logo.png';
// import style from '../MovieModal/MovieModal.css'
class MovieDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // id: "",
            // name: "",
            // genres: [],
            // director:"",
            // producer:"",
            // actors: [],
            // releaseDate: "",
            // image: "",
            // description: ""
        }
    }
    toggleModal = () => {
        this.props.onToggleModal();
    }

    render() {
        const {isDisplayTransactionModal} = this.props;
        const transaction = this.props.transactionInfo;
        console.log("transaction: ", transaction)
        return (
            <div>
                <form>
                    <Modal 
                        onHide = {this.props.onToggleModal}
                        show={isDisplayTransactionModal} 
                        size="lg" 
                        style={{maxWidth: '100%', width: '100%'}}>
                        <Modal.Header>Chi tiết giao dịch</Modal.Header>
                        <Modal.Body>
                            <div className='row'>
                                <div className='col-md-12 col-lg-12 movie-details'>
                                    <table className='table'>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <span className="title-detail">ID transaction:</span>
                                                </td>
                                                <td>
                                                    <span>{transaction?.id}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="title-detail">Dịch vụ:</span>
                                                </td>
                                                
                                                <td>
                                                    <span className="text-success">{transaction?.service}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="title-detail">ID ticket:</span>
                                                </td>
                                                
                                                <td>
                                                    <span>{transaction.ticket?.id}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="title-detail">Trạng thái:</span>
                                                </td>
                                                
                                                <td>
                                                    <span className="text-success">{transaction.ticket?.status}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="title-detail">Loại vé:</span>
                                                </td>
                                                
                                                <td>
                                                    <span>{transaction.ticket?.seat.type}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="title-detail">Giá vé:</span>
                                                </td>
                                                
                                                <td>
                                                    <span>{transaction.price}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="title-detail">Người đặt:</span>
                                                </td>
                                                
                                                <td>
                                                    <span className="text-primary">{transaction.user?.name}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="title-detail">Email người đặt:</span>
                                                </td>
                                                
                                                <td>
                                                    <span>{transaction.user?.email}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="title-detail"> Số ghế:</span>
                                                </td>
                                                <td>
                                                    <span>{transaction.ticket?.seat.row + transaction.ticket?.seat.column}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="title-detail">Phòng:</span>
                                                </td>
                                                <td>
                                                    <span>{transaction.ticket?.seat.room.roomNumber}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="title-detail">Tên phim:</span>
                                                </td>
                                                <td>
                                                    <span>{transaction.ticket?.showtime.movie.name}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="title-detail">Rạp chiếu:</span>
                                                </td>
                                                <td>
                                                    <span>{transaction.ticket?.seat.room.cinema.name}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="title-detail">Ngày chiếu:</span>
                                                </td>
                                                <td>
                                                    <span>{transaction.ticket?.showtime.startTime.split('T')[0]}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="title-detail">Giờ chiếu:</span>
                                                </td>
                                                <td>
                                                    <span>{transaction.ticket?.showtime.startTime.split('T')[1].slice(0,5)}</span>
                                                </td>
                                            </tr> 
                                            
                                        </tbody>
                                        
                                    </table>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.toggleModal}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isDisplayTransactionModal : state.isDisplayTransactionModal,
        transactionInfo: state.transactionInfo
    }
}

const mapDispatchToProps = (dispatch, props) =>{
    return {
        onToggleModal: () => {
            dispatch(actions.onToggleModal())
        },
        // onDeleteUser: (id) => {
        //     dispatch(actions.deleteUser(id))
        // },
        // // onUpdateUserStatus: (id) => {
        // //     dispatch(actions.updateUserStatus(id))
        // // },
        // getMovieInfo : (movie) => {
        //     dispatch(actions.getMovieInfo(movie))
        // }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);
