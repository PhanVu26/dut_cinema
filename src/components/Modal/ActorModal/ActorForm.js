import { Button, Modal } from 'react-bootstrap';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions/actorManager/index';

class ActorForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
           actor: {
                id: "",
                name: "",
                birthday:"",
                description:"",
                nationality:"",
                image: ""
            },
            invalidMessage: ""
        }
    }
    
    

    componentWillReceiveProps(nextProps) {
        if(nextProps.actorEditing) {
            this.setState({
                actor: nextProps.actorEditing,
            })
        }
    }
   
    onHandleChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        var image = e.target.files != null ? URL.createObjectURL(e.target.files[0]) : this.state.actor.image
        this.setState(prevState => ({
            actor: {
                ...prevState.actor,
                    [name]: value ,
                    image: image              
            }
        }))
        
    }

    

    validateActor = () => {
        const actor = this.state.actor;
        if(actor.name === "" || actor.description === ""){
                return false
            }
        return true;    
    }
    saveActor = (event) => {
        event.preventDefault();
        if(this.validateActor() === true) {
            if(this.props.actorEditing.id){
                console.log("update actorId", this.props.actorEditing.id, this.state.actor)
                this.props.onUpdateActor(this.state.actor)
                this.props.onToggleActorForm()
            }else {
                const saveActor = {
                    name: this.state.actor.name,
                    description: this.state.actor.description
                } 
                this.props.onSaveActor(saveActor)
                this.props.onToggleActorForm()
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

        const {isDisplayActorForm} = this.props;
        const {actor} = this.state
        const actorEditing = this.props.actorEditing;

        return (
           <div>  
            <Modal 
                show={isDisplayActorForm} 
                onHide = {this.props.onToggleActorForm}
                size="lg"
                style={{maxWidth: '100%', width: '100%'}}>
                <Modal.Header>{actorEditing.id === "" ? "Taọ diễn viên mới" : "Chỉnh sửa thông tin diễn viên"}</Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.saveActor}>
                        <div className='row'>
                            <div className='col-md-12 col-lg-12'>
                                <div className="form-group">
                                    <label>Tên diễn viên :</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={actor.name}
                                        onChange={ this.onHandleChange }
                                    
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Ngày sinh :</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="birthday"
                                        value={actor.birthday}
                                        onChange={ this.onHandleChange }
                                    
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Quốc tịch :</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="nationality"
                                        value={actor.nationality}
                                        onChange={ this.onHandleChange }
                                    
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Mô tả :</label>
                                    <textarea
                                        cols ='3'
                                        rows ='3'
                                        className="form-control"
                                        name="description"
                                        value={actor.description}
                                        onChange={ this.onHandleChange }
                                    
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Hình ảnh :</label>
                                    <input
                                        name = "image"
                                        type="file"
                                        className="form-control"
                                        onChange={ this.onHandleChange }
                                    
                                    />
                                    <img 
                                        className='mt-3'
                                        src={actor.image} 
                                        height='300px'
                                        width='300px'
                                    ></img>
                                </div>
                            </div>                      
                        </div>                       
                    </form>    
                    <h5 className="text-danger">{this.state.invalidMessage !== "" ? this.state.invalidMessage: ""}</h5>
                </Modal.Body>
                <Modal.Footer>
                    
                    <Button onClick={this.saveActor}>
                        Save
                    </Button>
                    <Button onClick={this.props.onToggleActorForm}>
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
        isDisplayActorForm : state.isDisplayActorForm,
        actorEditing: state.actorEditing
    }
}

const mapDispatchToProps = (dispatch, props) =>{
    return {
        onToggleActorForm: () => {
            dispatch(actions.toggleActorForm())
        },
        onSaveActor: (actor) => {
            dispatch(actions.actSaveActorsRequest(actor))
        },
        onGetActorEditing : (actor) => {
            dispatch(actions.getActorInfo(actor))
        },
        onUpdateActor: (actor) => {
            dispatch(actions.actUpdateActorsRequest(actor))
        },
        // // onDeleteUser: (id) => {
        // //     dispatch(actions.deleteUser(id))
        // // },
        // // onUpdateUserStatus: (id) => {
        // //     dispatch(actions.updateUserStatus(id))
        // // },
        // getactorInfo : (actor) => {
        //     dispatch(actions.getactorInfo(actor))
        // }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActorForm);
