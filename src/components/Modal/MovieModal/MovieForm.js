import { Button, Modal } from 'react-bootstrap';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions/movieManager/index';

import testThumbnail from '../../../assets/images/logo.png';
import style from '../MovieModal/MovieDetail.css'
class MovieForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            genreIds: [],
            author:"",
            producer:"",
            actorIds: [],
            releaseDate: "",
            thumbnail: "",
            description: ""
        }
    }
    // toggleModal = () => {
    //     this.props.onToggleModal();
    // }

    // showGenres(genres){
    //     var results = [];
    //     genres.forEach(genre => {
    //         results.push(genre.name)
    //     }) 
    //     return results.toString();
    // }
    // showActors(actors){
    //     var results = [];
    //     actors.forEach(actor => {
    //         results.push(actor.name)
    //     }) 
    //     return results.toString();
    // }
    
    // componentDidMount(){   
    //     this.setState({
    //         id: this.props.movieInfo.id,
    //         name: this.props.movieInfo.name,
    //         genreIds: this.props.movieInfo.genreIds,
    //         author: this.props.movieInfo.author,
    //         producer: this.props.movieInfo.producer,
    //         releaseDate: this.props.movieInfo.releaseDate,
    //         actors: this.props.movieInfo.actorIds,
    //         thumbnail: this.props.movieInfo.thumbnail
    //     })
        
    // }
    onHandleChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value,
            thumbnail: URL.createObjectURL(e.target.files[0])
        })
    }
    render() {
        const {isDisplayMovieForm} = this.props;
        const movie = this.props.movieInfo;
        return (
            <div>
                <form>
                    <Modal show={isDisplayMovieForm} size="lg" style={{maxWidth: '100%', width: '100%'}}>
                        <Modal.Header>{movie.id === "" ? "Taọ phim mới" : "Chỉnh sửa phim"}</Modal.Header>
                        <Modal.Body>
                            <div className='row'>
                                <div className='col-md-6 col-lg-6'>
                                    <div className="form-group">
                                        <label>Tên phim :</label>
                                        <input
                                            readOnly ={movie.id !== ''}
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={this.state.name}
                                            onChange={ this.onHandleChange }
                                        
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Đạo diễn :</label>
                                        <input
                                            readOnly ={movie.id !== ''}
                                            type="text"
                                            className="form-control"
                                            name="author"
                                            value={this.state.author}
                                            onChange={ this.onHandleChange }
                                        
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Nhà sản xuất :</label>
                                        <input
                                            readOnly ={movie.id !== ''}
                                            type="text"
                                            className="form-control"
                                            name="producer"
                                            value={this.state.producer}
                                            onChange={ this.onHandleChange }
                                        
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Ngày phát hành :</label>
                                        <input
                                            readOnly ={movie.id !== ''}
                                            type="text"
                                            className="form-control"
                                            name="releaseDate"
                                            value={this.state.releaseDate}
                                            onChange={ this.onHandleChange }
                                        
                                        />
                                    </div>
                    
                                    <div className="form-group">
                                        <label>Diễn viên :</label>
                                        <input
                                            readOnly ={movie.id !== ''}
                                            type="text"
                                            className="form-control"
                                            name="actorIds"
                                            value={this.state.actorIds}
                                            onChange={ this.onHandleChange }
                                        
                                        />
                                    </div>
                                </div>

                                <div className='col-md-6 col-lg-6'>
                                    
                                    <div className="form-group">
                                        <label>Thể loại :</label>
                                        <select size={4} className="form-control" name="genreIds" id="genreIds" multiple>
                                            <option value={1}>Phim tình cảm</option>
                                            <option value={2}>Phim hài</option>
                                            <option value={3}>Phim kinh dị</option>
                                            <option value={4}>Phim hành động</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Diễn viên :</label>
                                        <select size={3} className="form-control" name="actorIds" id="actorIds" multiple>
                                            <option value={1}>Phan Văn Vũ</option>
                                            <option value={2}>Phan Văn Nhân</option>
                                            <option value={3}>Võ Văn Hùng</option>
                                            <option value={4}>Nguyễn Thanh Quân</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Mô tả phim :</label>
                                        <textarea
                                            type="text"
                                            className="form-control"
                                            name="description"
                                            value={this.state.description}
                                            onChange={ this.onHandleChange }
                                        
                                        />
                                    </div>

                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-6 col-lg-6'>
                                    <div className="form-group">
                                        <label>Thumbnail :</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            onChange={ this.onHandleChange }
                                        
                                        />
                                    </div>
                                </div>
                                
                                <div className='col-md-6 col-lg-6'>
                                    <img 
                                        src={this.state.thumbnail} 
                                        width='300px'
                                        height='300px'
                                        ></img>
                                </div>
                                

                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.props.onToggleMovieForm}>
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
        isDisplayMovieForm : state.isDisplayMovieForm,
        movieInfo: state.movieInfo
    }
}

const mapDispatchToProps = (dispatch, props) =>{
    return {
        onToggleMovieForm: () => {
            dispatch(actions.toggleMovieForm())
        },
        // // onDeleteUser: (id) => {
        // //     dispatch(actions.deleteUser(id))
        // // },
        // // onUpdateUserStatus: (id) => {
        // //     dispatch(actions.updateUserStatus(id))
        // // },
        // getMovieInfo : (movie) => {
        //     dispatch(actions.getMovieInfo(movie))
        // }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieForm);
