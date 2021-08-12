import React, { Component } from 'react';
import {Modal, Button} from "react-bootstrap";
import {connect} from 'react-redux';
import * as actions from '../../../actions/genreAction/index'



class GenreItem extends Component {

    constructor(props){
        super(props);
    }
    onDeleteGenre = () => {
        this.props.onDeleteGenre(this.props.genre.id);
    }
    editGenre = () => {
        this.props.onToggleGenreForm();
        this.props.getGenreInfo(this.props.genre)
    }
    render() {
        const {index, genre} = this.props;
        return (
            <tr>
                <td className="text-center">{index}</td>
                <td className="text-center">{genre.id}</td>
                <td className="text-center">{genre.name}</td>
                <td className="text-center">
                    <button 
                        onClick={this.editGenre}
                        type="button" 
                        className="btn btn-warning">
                        <span className="fa fa-pencil"></span>
                    </button>
                    <button
                        onClick={() => {if(window.confirm('Bạn có muốn xóa thể loại này?')){this.onDeleteGenre()};}} 
                        type="button" 
                        className="btn btn-danger ml-2 mr-2">
                        <span className="far fa-trash-alt"></span>
                    </button>
                </td>
            </tr>
        );
    }
}

const mapStateToProps = (state) => {

}

const mapDispatchToProps = (dispatch, props) =>{
    return {
        onToggleGenreForm: () => {
            dispatch(actions.toggleGenreForm())
        },
        getGenreInfo : (genre) => {
            dispatch(actions.getGenreInfo(genre))
        },
        onDeleteGenre: (id) => {
            dispatch(actions.actDeleteGenresRequest(id))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GenreItem);
