import { Button, Modal } from 'react-bootstrap';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions/movieManager/index';

import testThumbnail from '../../../assets/images/logo.png';
import style from '../MovieModal/MovieModal.css'
class MovieForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movie: {
                id: "",
                name: "",
                genreIds: [],
                author:"",
                producer:"",
                actorIds: [],
                releaseDate: "",
                thumbnail: "",
                description: ""
            },
            selectedActors: [],
            selectedGenres: []
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
    findIndexActorById = (actorIds,id) => {
        console.log("actors:", actorIds)
        console.log("find id", id)
        var result = -1;
        actorIds.forEach((actorId, index) => {
            if(actorId === id){
                result = index;
            }
        });
        console.log("result", result)
        return result;
    }

    findIndexGenreById = (genreIds,id) => {
        var result = -1;
        genreIds.forEach((genreId, index) => {
            if(genreId === id){
                result = index;
            }
        });
        return result;
    }

    onHandleChange = (e) => {
        console.log("e ,", e)
        var target = e.target;
        var name = target.name;
        var value = target.value;
        var id = e.target.id;
        // let genreIds = Array.from(e.target.selectedOptions, option => {
        //     console.log(option.innerHTML);
        //     return option.innerHTML
        // });
        //console.log("genreIds: ", genreIds)

        console.log(id)
        var thumbnail = e.target.files != null ? URL.createObjectURL(e.target.files[0]) : this.state.thumbnail
        
        if(e.target.checked === true){
            if(e.target.className === "actor-checkbox"){
                this.setState(prevState => ({
                    selectedActors: [...prevState.selectedActors, e.target.name],
                    movie: {
                        ...prevState.movie,
                        actorIds: [...prevState.movie.actorIds, id]
                    }
                }))
            }else {
                this.setState(prevState => ({
                    selectedGenres: [...prevState.selectedGenres, e.target.name],
                    movie: {
                        ...prevState.movie,
                        genreIds: [...prevState.movie.genreIds, id]
                    }
                }))
            }
            
        }else {
            if(e.target.className === "actor-checkbox"){
                if(id != ""){
                    console.log("id: ", id)
                    this.setState((prevState) => ({
                        selectedActors: prevState.selectedActors.filter((_, i) => i !== this.findIndexActorById(this.state.movie.actorIds, id)),
                        movie: {
                            ...prevState.movie,
                            actorIds: prevState.movie.actorIds.filter((_, i) => i !== this.findIndexActorById(prevState.movie.actorIds, id))
                        }
                    }));
                }
            }
            else {
                if(id != ""){
                    console.log("id: ", id)
                    this.setState((prevState) => ({
                        selectedGenres: prevState.selectedGenres.filter((_, i) => i !== this.findIndexActorById(this.state.movie.genreIds, id)),
                        movie: {
                            ...prevState.movie,
                            genreIds: prevState.movie.genreIds.filter((_, i) => i !== this.findIndexGenreById(prevState.movie.genreIds, id))
                        }
                    }));
                }
            }    
        }
        this.setState(prevState => ({
            movie: {
                ...prevState.movie,
                [name]: value,
                thumbnail: thumbnail,
            },
            //genreIds: genreIds
        }))
    }

    showActorCheckbox = actors =>{
        var results = [];
        results = actors.map(actor => {
            return (
                <div className="actor-item ml-3">
                    <label htmlFor={'actor'+actor.id} className="mr-2">{actor.name}</label>
                    <input 
                        className="actor-checkbox"
                        type="checkbox" 
                        id={'actor'+actor.id} 
                        name={actor.name}
                        onChange = {this.onHandleChange} 
                        value={actor.id}></input><br></br>
                </div>
            ) 
        })
        return results;
    }

    showChoosedActor = (actors) => {
        var choosedActors = [];
        choosedActors = actors.map(actor => {
            return actor.name;
        })
        return choosedActors;
    }

    showGenreCheckbox = genres =>{
        var results = [];
        results = genres.map(genre => {
            return (
                <div className="genre-item ml-3">
                    <label htmlFor={'genre'+genre.id} className="mr-2">{genre.name}</label>
                    <input 
                        className="genre-checkbox"
                        type="checkbox" 
                        id={'genre'+genre.id} 
                        name={genre.name}
                        onChange = {this.onHandleChange} 
                        value={genre.id}></input><br></br>
                </div>
            ) 
        })
        return results;
    }

    showChoosedGenres = (genres) => {
        var choosedGenres = [];
        choosedGenres = genres.map(genre => {
            return genre.name;
        })
        return choosedGenres;
    }

    render() {
        const {isDisplayMovieForm} = this.props;
        const {movie} = this.state
        const movieInfo = this.props.movieInfo;
        const actors = [
            {
                id: 1,
                name: "Phan Văn Vũ"
            },
            {
                id: 2,
                name: "Phan Văn Vũ2"
            },
            {
                id: 3,
                name: "Phan Văn Vũ3"
            },
            {
                id: 4,
                name: "Phan Văn Vũ4"
            },
            {
                id: 5,
                name: "Phan Văn Vũ5"
            }

        ];


        const genres = [
            {
                id: 1,
                name: "Phim kinh dị"
            },
            {
                id: 2,
                name: "Phim hành động"
            },
            {
                id: 3,
                name: "Phim tình cảm"
            },
            {
                id: 4,
                name: "Phim gia đình"
            },
            {
                id: 5,
                name: "Phim hài"
            }

        ];

        return (
            <div>
                <form>
                    <Modal show={isDisplayMovieForm} size="lg" style={{maxWidth: '100%', width: '100%'}}>
                        <Modal.Header>{movieInfo.id === "" ? "Taọ phim mới" : "Chỉnh sửa phim"}</Modal.Header>
                        <Modal.Body>
                            <div className='row'>
                                <div className='col-md-6 col-lg-6'>
                                    <div className="form-group">
                                        <label>Tên phim :</label>
                                        <input
                                            readOnly ={movieInfo.id !== ''}
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={movie.name}
                                            onChange={ this.onHandleChange }
                                        
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Đạo diễn :</label>
                                        <input
                                            readOnly ={movieInfo.id !== ''}
                                            type="text"
                                            className="form-control"
                                            name="author"
                                            value={movie.author}
                                            onChange={ this.onHandleChange }
                                        
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Nhà sản xuất :</label>
                                        <input
                                            readOnly ={movieInfo.id !== ''}
                                            type="text"
                                            className="form-control"
                                            name="producer"
                                            value={movie.producer}
                                            onChange={ this.onHandleChange }
                                        
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Ngày phát hành :</label>
                                        <input
                                            readOnly ={movieInfo.id !== ''}
                                            type="text"
                                            className="form-control"
                                            name="releaseDate"
                                            value={movie.releaseDate}
                                            onChange={ this.onHandleChange }
                                        
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Mô tả phim :</label>
                                        <textarea
                                            type="text"
                                            className="form-control"
                                            name="description"
                                            value={movie.description}
                                            onChange={ this.onHandleChange }
                                        
                                        />
                                    </div>
                    
                                    
                                </div>

                                <div className='col-md-6 col-lg-6'>
                                    
                                <div className="form-group">
                                        <label>Thể loại :</label>
                                        <input className="ml-2" placeholder="Nhập tên thể loại"></input><br></br>
                                        <div className="genres-box">
                                            
                                           {this.showGenreCheckbox(genres)}
                                            
                                        </div>
                                        
                                        <span>Đã chọn:</span><p>{this.state.selectedGenres.toString()}</p>
                                    </div>

                                    <div className="form-group">
                                        <label>Diễn viên :</label>
                                        <input className="ml-2" placeholder="Nhập tên diễn viên"></input><br></br>
                                        <div className="actors-box">
                                            
                                           {this.showActorCheckbox(actors)}
                                            
                                        </div>
                                        
                                        <span>Đã chọn:</span><p>{this.state.selectedActors.toString()}</p>
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
                                        src={movie.thumbnail} 
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
