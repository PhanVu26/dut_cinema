import React, { Component } from 'react';
import {Modal, Button} from "react-bootstrap";
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../../../actions/cinemaAction/index'



class CinemaItem extends Component {

    constructor(props){
        super(props);
    }
    // onHandleModal = () => {
    //     this.props.onToggleUserForm()
    // }
    onDeleteCinema = () => {
        this.props.onDeleteCinema(this.props.cinema.id);
    }
   
    editCinema = () => {
        this.props.onToggleCinemaForm();
        this.props.getCinemaInfo(this.props.cinema)
    }
    
    render() {
        const {index, cinema} = this.props;
 
        return (
            <tr>
                <td className="text-center">{cinema.id}</td>
                <td className="text-center">{cinema.name}</td>       
                <td className="text-center">{cinema.address}</td>
                <td className='text-center'></td>
                <td className="text-center">
                    <button 
                        onClick={this.editCinema}
                        type="button" 
                        className="btn btn-warning">
                        <span className="fa fa-pencil"></span>
                    </button>
                    {/* <cinemaForm></cinemaForm> */}
                    <button
                        onClick={() => {if(window.confirm('Bạn có muốn xóa cinema này?')){this.onDeleteCinema()};}} 
                        type="button" 
                        className="btn btn-danger ml-2 mr-2">
                        <span className="far fa-trash-alt"></span>
                    </button>
                    <NavLink to={"/admin/cinemas/" + cinema.id+"/rooms"}>
                        <button 
                            type="button" 
                            className="btn btn-danger"
                            // onClick={this.getcinemaInfo}
                            >
                            <span className="fas fa-eye"></span>
                        </button>
                    </NavLink>
                </td>
            </tr>
        );
    }
}

const mapStateToProps = (state) => {

}

const mapDispatchToProps = (dispatch, props) =>{
    return {
        // onToggleModal: () => {
        //     dispatch(actions.toggleModal())
        // },
        onToggleCinemaForm: () => {
            dispatch(actions.toggleModal())
        },
        getCinemaInfo : (cinema) => {
            dispatch(actions.getCinemaInfo(cinema))
        },
        onDeleteCinema: (id) => {
            dispatch(actions.actDeleteCinemaRequest(id))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CinemaItem);
