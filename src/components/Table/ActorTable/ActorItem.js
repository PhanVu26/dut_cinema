import React, { Component } from 'react';
import {Modal, Button} from "react-bootstrap";
import {connect} from 'react-redux';
import * as actions from '../../../actions/actorManager/index'



class ActorItem extends Component {

    constructor(props){
        super(props);
    }
    // onHandleModal = () => {
    //     this.props.onToggleUserForm()
    // }
    onDeleteActor = () => {
        this.props.onDeleteActor(this.props.actor.id);
    }
    // toggleUserStatus = () => {
    //     this.props.onUpdateUserStatus(this.props.user.id)
    // }
    // getUserEditing = () => {
    //     console.log("get user editing", this.props.user)
    //     this.props.onToggleUserForm();
    //     this.props.getUserEditing(this.props.user)
    // }
    // getMovieInfo = () => {
    //     this.props.onToggleModal();
    //     this.props.getMovieInfo(this.props.movie)
    //     console.log("xem movie:", this.props.movie)
    // }
    editActor = () => {
        this.props.onToggleActorForm();
        this.props.getActorInfo(this.props.actor)
        console.log("edit moviessss:", this.props.actor) 
    }
    // showGenres(genres){
    //     var result = null;
    //     result = genres.map(genre => {
    //         return <li key={genre.id}>{genre.name}</li>
    //     }) 
    //     return result;
    // }
    // showActors(actors){
    //     var result = null;
    //     result = actors.map(actor => {
    //         return <li key={actor.id}>{actor.name}</li>
    //     }) 
    //     return result;
    // }
    // onDeleteMovie = () => {
    //     this.props.onDeleteMovie(this.props.movie.id);
    // }
    render() {
        const {index, actor} = this.props;
        // const genres = [] ;
        // movie.genreIds.forEach(genre => {
        //     genres.push(genre.name)
        // });
        // const actors = [] ;
        // movie.actorIds.forEach(actor => {
        //     actors.push(actor.name)
        // });
        // const {isDisplayUserForm} = this.props;
        // const status = user.status ? ' ẩn ' : ' kích hoạt ';  
        // var role = user.role === 1 ? 'Quản lý phim' : user.role === 2 ? 'Quản lý lịch chiếu' : 'Người dùng';
        return (
            <tr>
                <td className="text-center">{index}</td>
                <td className="text-center">{actor.id}</td>
                <td className="text-center">{actor.name}</td>
                <td className="text-center">
                    <img 
                        height='100px'
                        width='100px'
                        src= {actor.image}/>
                </td>
                
                <td className="text-center">{actor.birthday}</td>
                <td className='text-center'>{actor.nationality}</td>
                {/* <td className="text-center">
                    <img src={actor.image} height="80px" width="80px"></img>
                </td>
                <td className="text-center">
                    <ul className='list-unstyled'>
                        {
                            this.showGenres(actor.genreIds)
                        }
                    </ul>
                </td> */}
                {/* <td className="text-center">
                    <i 
                        className= {user.status ? 'fas fa-toggle-on': 'fas fa-toggle-off' }
                        onClick={() => {if(window.confirm('Bạn có muốn'+ status +'user này?')){this.toggleUserStatus()};}}>
                            
                    </i>
                </td> */}
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
            dispatch(actions.deleteActor(id))
        },
        // onUpdateUserStatus: (id) => {
        //     dispatch(actions.updateUserStatus(id))
        // },
        // getUserEditing : (user) => {
        //     dispatch(actions.getUserEditing(user))
        // }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActorItem);
