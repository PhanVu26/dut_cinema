import React, { Component } from 'react';
import {Modal, Button} from "react-bootstrap";
import {connect} from 'react-redux';
import * as actions from '../../../actions/actorManager/index'



class ActorItem extends Component {

    constructor(props){
        super(props);
    }
    onDeleteActor = () => {
        this.props.onDeleteActor(this.props.actor.id);
    }

    editActor = () => {
        this.props.onToggleActorForm();
        this.props.getActorInfo(this.props.actor)
    }

    render() {
        const {index, actor} = this.props;
        return (
            <tr>
                <td className="text-center">{index}</td>
                <td className="text-center">{actor.id}</td>
                <td className="text-center">{actor.name}</td>
                <td className="text-center">{actor.birthday}</td>
                <td className='text-center'>{actor.nationality}</td>
                <td className="text-center">
                    <button 
                        onClick={this.editActor}
                        type="button" 
                        className="btn btn-warning">
                        <span className="fa fa-pencil"></span>
                    </button>
                    {/* <actorForm></actorForm> */}
                    <button
                        onClick={() => {if(window.confirm('Bạn có muốn xóa diễn viên này?')){this.onDeleteActor()};}} 
                        type="button" 
                        className="btn btn-danger ml-2 mr-2">
                        <span className="far fa-trash-alt"></span>
                    </button>
                    <button 
                        type="button" 
                        className="btn btn-danger"
                        // onClick={this.getactorInfo}
                        >
                        <span className="fas fa-eye"></span>
                    </button>
                </td>
                {/* <actorDetail></actorDetail> */}
                {/* <actorForm></actorForm> */}
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
        onToggleActorForm: () => {
            dispatch(actions.toggleActorForm())
        },
        getActorInfo : (actor) => {
            dispatch(actions.getActorInfo(actor))
        },
        onDeleteActor: (id) => {
            dispatch(actions.actDeleteActorsRequest(id))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActorItem);
