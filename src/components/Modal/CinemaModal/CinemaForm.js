import { Button, Modal } from 'react-bootstrap';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions/cinemaAction/index';

class CinemaForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
           cinema: {
                id: "",
                name: "",
                address:""
            },
            invalidMessage: ""
        }
    }
    
    

    componentWillReceiveProps(nextProps) {
        if(nextProps.cinemaEditing) {
            this.setState({
                cinema: nextProps.cinemaEditing,
            })
        }
    }
   
    onHandleChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState(prevState => ({
            cinema: {
                ...prevState.cinema,
                    [name]: value           
            }
        }))
        
    }

    

    validateCinema = () => {
        const cinema = this.state.cinema;
        if(cinema.name === "" || cinema.address === ""){
                return false
            }
        return true;    
    }
    saveCinema = (event) => {
        event.preventDefault();
        if(this.validateCinema() === true) {
            if(this.props.cinemaEditing.id){
                console.log("update cinemaId", this.props.cinemaEditing.id, this.state.cinema)
                this.props.onUpdateCinema(this.state.cinema)
                this.props.onToggleCinemaForm()
            }else {
                const saveCinema = {
                    name: this.state.cinema.name,
                    address: this.state.cinema.address
                } 
                this.props.onSaveCinema(saveCinema)
                this.props.onToggleCinemaForm()
            }
            
        }else {
            this.setState({
                invalidMessage : "Vui lòng nhập đầy đủ thông tin"
            })
        }
    }

    onHandleSearchChange = (e) => {
        // var {name, value} = e.target;
        // this.setState({
        //     [name]: value
        // })
    }
   
   

   

    render() {

        const {isDisplayCinemaModal} = this.props;
        const {cinema} = this.state
        const cinemaEditing = this.props.cinemaEditing;

        return (
           <div>  
            <Modal 
                show={isDisplayCinemaModal} 
                onHide = {this.props.onToggleCinemaForm}
                size="lg"
                style={{maxWidth: '100%', width: '100%'}}>
                <Modal.Header>{cinemaEditing.id === "" ? "Taọ cinema mới" : "Chỉnh sửa thông tin cinema"}</Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.saveCinema}>
                        <div className='row'>
                            <div className='col-md-12 col-lg-12'>
                                { cinemaEditing.id === '' ? "":
                                    <div className="form-group">
                                        <label>ID cinema :</label>
                                        <label className="form-control">{cinema.id}</label>
                                    </div>
                                }
                                <div className="form-group">
                                    <label>Tên cinema :</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={cinema.name}
                                        onChange={ this.onHandleChange }
                                    
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Địa chỉ :</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="address"
                                        value={cinema.address}
                                        onChange={ this.onHandleChange }
                                    
                                    />
                                </div>
                            </div>                      
                        </div>                       
                    </form>    
                    <h5 className="text-danger">{this.state.invalidMessage !== "" ? this.state.invalidMessage: ""}</h5>
                </Modal.Body>
                <Modal.Footer>
                    
                    <Button onClick={this.saveCinema}>
                        Save
                    </Button>
                    <Button onClick={this.props.onToggleCinemaForm}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isDisplayCinemaModal : state.isDisplayCinemaModal,
        cinemaEditing: state.cinemaEditing
    }
}

const mapDispatchToProps = (dispatch, props) =>{
    return {
        onToggleCinemaForm: () => {
            dispatch(actions.toggleModal())
        },
        onSaveCinema: (cinema) => {
            dispatch(actions.actSaveCinemaRequest(cinema))
        },
        onGetCinemaEditing : (cinema) => {
            dispatch(actions.getCinemaInfo(cinema))
        },
        onUpdateCinema: (cinema) => {
            dispatch(actions.actUpdateCinemaRequest(cinema))
        },
        // // onDeleteUser: (id) => {
        // //     dispatch(actions.deleteUser(id))
        // // },
        // // onUpdateUserStatus: (id) => {
        // //     dispatch(actions.updateUserStatus(id))
        // // },
        // getcinemaInfo : (cinema) => {
        //     dispatch(actions.getcinemaInfo(cinema))
        // }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CinemaForm);
