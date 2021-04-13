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
            selectedGenres: [],
            invalidMessage: "",
            filterGenre: "",
            filterActor: ""
        }
    }
    
    

    findIndexActorById = (actorIds,id) => {
        console.log("actors:", actorIds)
        console.log("find id", id)
        var result = -1;
        actorIds.forEach((actorId, index) => {
            if(actorId.id === id){
                result = index;
            }
        });
        console.log("result", result)
        return result;
    }

    findIndexGenreById = (genreIds,id) => {
        var result = -1;
        genreIds.forEach((genreId, index) => {
            if(genreId.id === id){
                result = index;
            }
        });
        return result;
    }

    onHandleChange = (e) => {
        //console.log("e ,", e)
        var target = e.target;
        var name = target.name;
        var value = target.value;
        //console.log("value,", value)
        var id = e.target.id;

        //console.log(id)
        var thumbnail = e.target.files != null ? URL.createObjectURL(e.target.files[0]) : this.state.movie.thumbnail
        console.log("thumbnail", thumbnail)
        if(e.target.checked === true){
            if(e.target.className === "actor-checkbox"){
                this.setState(prevState => ({
                    selectedActors: [...prevState.selectedActors, e.target.name],
                    movie: {
                        ...prevState.movie,
                        actorIds: [...prevState.movie.actorIds, {
                            id: value,
                            name: name
                        }]
                    }
                }))
            }else {
                this.setState(prevState => ({
                    selectedGenres: [...prevState.selectedGenres, e.target.name],
                    movie: {
                        ...prevState.movie,
                        genreIds: [...prevState.movie.genreIds, {
                            id: value,
                            name: name
                        }]
                    }
                }))
            }
            
        }else {
            if(e.target.className === "actor-checkbox"){
                if(value != ""){
                    console.log("id: ", id)
                    this.setState((prevState) => ({
                        selectedActors: prevState.selectedActors.filter((_, i) => i !== this.findIndexActorById(this.state.movie.actorIds, value)),
                        movie: {
                            ...prevState.movie,
                            actorIds: prevState.movie.actorIds.filter((_, i) => i !== this.findIndexActorById(prevState.movie.actorIds, value))
                        }
                    }));
                }
            }
            else {
                if(value != ""){
                    console.log("id: ", id)
                    this.setState((prevState) => ({
                        selectedGenres: prevState.selectedGenres.filter((_, i) => i !== this.findIndexActorById(this.state.movie.genreIds, value)),
                        movie: {
                            ...prevState.movie,
                            genreIds: prevState.movie.genreIds.filter((_, i) => i !== this.findIndexGenreById(prevState.movie.genreIds, value))
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
                        defaultChecked = {this.state.selectedActors.some(actorName => actorName === actor.name)}
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
            console.log("checked", this.state.selectedGenres.some(genreName => genreName === genre.name))
            return (
                <div className="genre-item ml-3">
                    <label htmlFor={'genre'+genre.id} className="mr-2">{genre.name}</label>
                    <input 
                        defaultChecked = {this.state.selectedGenres.some(genreName => genreName === genre.name)}
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

    validateMovie = () => {
        const movie = this.state.movie;
        if(movie.name === "" || movie.author === "" || movie.description === "" ||
            movie.description === "" || movie.genreIds.length == 0 || movie.releaseDate === "" ||
            movie.thumbnail == "" || movie.actorIds.length == 0){
                return false
            }
        return true;    
    }
    saveMovie = (event) => {
        event.preventDefault();
        if(this.validateMovie() === true) {
            this.props.onSaveMovie(this.state.movie)
            console.log("save movie 1", this.state.movie)
            this.props.onToggleMovieForm()
            
        }else {
            this.setState({
                invalidMessage : "Vui lòng nhập đầy đủ thông tin"
            })
        }
    }

    onHandleSearchChange = (e) => {
        var {name, value} = e.target;
        this.setState({
            [name]: value
        })
    }
    shouldComponentUpdate(nextProps, nextState) {        
        return true;
    }
    // componentDidMount(){
    //     console.log("didmount", this.props.movieInfo)
    //     if(this.props.movieInfo && this.props.movieInfo.id !== ""){
    //         console.log("movie info digs", this.props.movieInfo)
    //         this.setState(prevState => ({
    //             movie: this.props.movieInfo,
    //             selectedGenres: [...prevState.selectedGenres, ...this.props.movieInfo.genreIds.map(genre =>{return genre.name})],
    //             selectedActors: [...prevState.selectedActors, ...this.props.movieInfo.actorIds.map(actor =>{return actor.name})]
    //         }))
    //     }
    // }

    // static getDerivedStateFromProps(nextProps, prevState){
    //     if(nextProps.movieInfo!==prevState.movie){
    //       return { movie: nextProps.movieInfo};
    //    }
    //     return null;
    //   }
    //   componentDidUpdate(prevProps, prevState) {
    //     if(prevProps.movieInfo!==this.props.movie){
    //       //Perform some operation here
    //       this.setState({
    //                     movie: prevProps.movieInfo,
    //                     selectedGenres: [...prevState.selectedGenres, ...prevProps.movieInfo.genreIds.map(genre =>{return genre.name})],
    //                     selectedActors: [...prevState.selectedActors, ...prevProps.movieInfo.actorIds.map(actor =>{return actor.name})]
    //                 })
        
    //     }  
    // }

    componentWillReceiveProps(nextProps) {
        console.log("nextprops", nextProps.movieInfo)
        if(nextProps.movieInfo) {
            this.setState({
                movie: nextProps.movieInfo,
                selectedGenres: nextProps.movieInfo.genreIds.map(genre =>{return genre.name}),
                selectedActors: nextProps.movieInfo.actorIds.map(actor =>{return actor.name})
            })
        }
      }

    render() {

        const {isDisplayMovieForm} = this.props;
        const {movie} = this.state
        const movieInfo = this.props.movieInfo;
        console.log("render")
        var {genres, actors} = this.props

        console.log("state", this.state.selectedGenres)
        genres = genres.filter((genre) => {
            return genre.name.toLowerCase().indexOf(this.state.filterGenre.toLowerCase()) !== -1
        });

        actors = actors.filter((actor) => {
            return actor.name.toLowerCase().indexOf(this.state.filterActor.toLowerCase()) !== -1
        })

        return (
           <div>  
            <Modal 
                show={isDisplayMovieForm} 
                size="lg"
                style={{maxWidth: '100%', width: '100%'}}>
                <Modal.Header>{movieInfo.id === "" ? "Taọ phim mới" : "Chỉnh sửa phim"}</Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.saveMovie}>
                        <div className='row'>
                            <div className='col-md-6 col-lg-6'>
                                <div className="form-group">
                                    <label>Tên phim :</label>
                                    <input
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
                                        rows='5'
                                        cols='40'
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
                                    <input 
                                        name="filterGenre"
                                        value = {this.state.filterGenre}
                                        className="ml-2" 
                                        placeholder="Tìm theo thể loại"
                                        onChange = {this.onHandleSearchChange}>
                                    </input><br></br>
                                    <div className="genres-box">
                                        
                                        {this.showGenreCheckbox(genres)}
                                        
                                    </div>
                                    
                                    <span>Đã chọn:</span><p>{this.state.selectedGenres.toString()}</p>
                                </div>

                                <div className="form-group">
                                    <label>Diễn viên :</label>
                                    <input 
                                        name="filterActor"
                                        value={this.state.filterActor}
                                        className="ml-2" 
                                        placeholder="Tìm theo tên diễn viên"
                                        onChange = {this.onHandleSearchChange}>                                       
                                    </input><br></br>
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
                                        width='200px'
                                        height='200px'
                                    ></img>
                            </div>
                        </div>
                        
                    </form>    
                    <h5 className="text-danger">{this.state.invalidMessage !== "" ? this.state.invalidMessage: ""}</h5>
                </Modal.Body>
                <Modal.Footer>
                    
                    <Button onClick={this.saveMovie}>
                        Save
                    </Button>
                    <Button onClick={this.props.onToggleMovieForm}>
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
        genres : state.genres,
        actors: state.actors,
        isDisplayMovieForm : state.isDisplayMovieForm,
        movieInfo: state.movieInfo
    }
}

const mapDispatchToProps = (dispatch, props) =>{
    return {
        onToggleMovieForm: () => {
            dispatch(actions.toggleMovieForm())
        },
        onSaveMovie: (movie) => {
            dispatch(actions.saveMovie(movie))
        },
        onGetMovieInfo : (movie) => {
            dispatch(actions.getMovieInfo(movie))
        }
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
