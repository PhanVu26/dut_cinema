import { Button, Modal } from 'react-bootstrap';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions/movieManager/index';

import testImage from '../../../assets/images/logo.png';
import style from '../MovieModal/MovieModal.css'
import { NavLink } from 'react-router-dom';
class MovieForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            previewImage: "",
            movie: {
                name: "",
                genres: [],
                producer:"",
                country:"",
                duration: '',
                actors: [],
                releaseDate: "",
                mainImage: "",
                thumbnailImage:"",
                description: "",
                trailer:""
            },
            selectedActors: [],
            selectedGenres: [],
            invalidMessage: "",
            filterGenre: "",
            filterActor: ""
        }
    }
    
    

    findIndexActorById = (actors,id) => {
        var result = -1;
        actors.forEach((actorId, index) => {
            if(actorId === id){
                result = index;
            }
        });
        return result;
    }

    findIndexGenreById = (genres,id) => {
        var result = -1;
        genres.forEach((genreId, index) => {
            if(genreId.id === id){
                result = index;
            }
        });
        return result;
    }

    onHandleChange = (e) => {
        //
        var target = e.target;
        var name = target.name;
        var value = target.value;
        var id = e.target.id;

        //
        //
        var file = null;
        var image = null;
        if(e.target.files != null){
            file = e.target.files[0]
            this.setState(prevState => ({
                previewImage: URL.createObjectURL(file),
                movie: {
                    ...prevState.movie,
                    previewImage: URL.createObjectURL(file),
                    mainImage: file!=null ? file : prevState.movie.mainImage,
                    thumbnailImage: file!=null ? file : prevState.movie.thumbnailImage   
                },
                //genres: genres
            }))
            // var reader = new FileReader();
            // reader.readAsDataURL(file[0])
            // reader.onload = (e) => {
            //     image = e.target.result
            //     this.setState(prevState => ({
            //         movie: {
            //             ...prevState.movie,
            //             image: {
            //                 mainImage: file!=null ? image : prevState.movie.image.mainImage,
            //                 thumbnailImage: file!=null ? image : prevState.movie.image.thumbnailImage   
            //             },
            //         },
            //         //genres: genres
            //     }))
            // }
        }
        
        if(e.target.className === "actor-checkbox"){
            if(e.target.checked === true){
                this.setState(prevState => ({
                    selectedActors: [...prevState.selectedActors, {
                        name : e.target.labels[0].innerHTML,
                        id: value
                    }],
                    movie: {
                        ...prevState.movie,
                        actors: [...prevState.movie.actors,
                            //id: value,
                            // name: e.target.labels[0].innerHTML
                            parseInt(value)
                        ]
                    }
                }))
            }else {
                let label = e.target.labels[0].innerHTML;
                let a = this.state.movie.actors.filter(actor => actor != value)
                this.setState((prevState) => ({
                    selectedActors: prevState.selectedActors.filter(actor => actor.name !== label),
                    movie: {
                        ...prevState.movie,
                        actors: a
                    }
                }));
            }
        }else if(e.target.className === "genre-checkbox"){
            if(e.target.checked === true){
                this.setState(prevState => ({
                    selectedGenres: [...prevState.selectedGenres, {
                        name : e.target.labels[0].innerHTML,
                        id: value
                    }],
                    movie: {
                        ...prevState.movie,
                        genres: [...prevState.movie.genres,
                            //id: value,
                            // name: e.target.labels[0].innerHTML
                            parseInt(value)
                        ]
                    }
                }))
            }else {
                let label = e.target.labels[0].innerHTML;
                let genres = this.state.movie.genres.filter(genre => genre != value)
                this.setState((prevState) => ({
                    selectedGenres: prevState.selectedGenres.filter(genre => genre.name !== label),
                    movie: {
                        ...prevState.movie,
                        genres: genres
                    }
                }));
            }
        }

        if(name !== ""){
            this.setState(prevState => ({
                movie: {
                    ...prevState.movie,
                    [name]: value,
                },
            }))
        }
    }

    showActorCheckbox = actors =>{
        
        var results = [];
        results = actors?.map((actor, index) => {
            //
            return (
                <div className="actor-item ml-3 row " key={index}>
                    <div className="col-1">
                        <input 
                            checked = {this.state.selectedActors?.some(act => act.id == actor.id)}
                            className="actor-checkbox"
                            type="checkbox" 
                            id={'actor'+actor.id} 
                            onChange = {this.onHandleChange} 
                            value={actor.id}>    
                        </input>
                    </div>
                    <div className="col-10">
                        <label htmlFor={'actor'+actor.id} className="ml-2">{actor.name}</label>
                    </div>                    
                </div>
            ) 
        })
        return results;
    }

    removeSelectedActor = (id) =>{
        //
        this.setState((prevState) => ({
            selectedActors: prevState.selectedActors.filter(actor => actor.id !== id),
            movie: {
                ...prevState.movie,
                actors: this.state.movie.actors.filter(actor => actor != id)
            }
        }));
    }

    removeSelectedGenre = (id) =>{
        this.setState((prevState) => ({
            selectedGenres: prevState.selectedGenres.filter(genre => genre.id !== id),
            movie: {
                ...prevState.movie,
                genres: this.state.movie.genres.filter(genre => genre != id)
            }
        }));
    }

    showChoosedActor = (actors) => {
        
        let rs = []
        //
        rs = actors?.map(actor => {
            return (
                <div className="selected-actor ml-2  mt-2">
                    <span>{actor.name}</span>
                    <a><i onClick={() => this.removeSelectedActor(actor.id)} className="fas fa-times ml-1"></i></a>
                </div>
            )
        })
        return rs
    }

    showGenreCheckbox = genres =>{
        var results = [];
        results = genres?.map((genre, index) => {
            return (
                <div className="genre-item ml-3 row" key={index}>
                    <div className="col-1">
                        <input 
                            checked = {this.state.selectedGenres?.some(g => g.id == genre.id)}
                            className="genre-checkbox"
                            type="checkbox" 
                            id={'genre'+genre.id} 
                            onChange = {this.onHandleChange} 
                            value={genre.id}>
                        </input>
                    </div>
                    <div className="col-10">
                        <label htmlFor={'genre'+genre.id} className="ml-2">{genre.name}</label> 
                    </div>          
                </div>
            ) 
        })
        return results;
    }

    showChoosedGenres = (genres) => {
        let rs = []
        rs = genres?.map(genre => {
            return (
                <div className="selected-genre ml-2  mt-2">
                    <span>{genre.name}</span>
                    <a><i onClick={() => this.removeSelectedGenre(genre.id)} className="fas fa-times ml-1"></i></a>
                </div>
            )
        })
        return rs
    }

    validateMovie = () => {
        const movie = this.state.movie;
        if(movie.name === "" || movie.producer === "" || movie.description === "" ||
            movie.description === "" || movie.genres.length == 0 || movie.releaseDate === "" ||
             movie.actors.length == 0 || movie.country === "" || movie.mainImage == null){
                return false
            }
        return true;    
    }
    saveMovie = (event) => {
        
        event.preventDefault();
        const newMovie = this.state.movie;
        const saveMovie = {
            name: newMovie.name,
            genreIds: newMovie.genres,
            director:newMovie.director,
            producer:newMovie.producer,
            country:newMovie.country,
            duration: parseInt(newMovie.duration),
            actorIds: newMovie.actors,
            releaseDate: newMovie.releaseDate,
            description: newMovie.description

        }
        if(this.validateMovie() === true) {
            const data = new FormData();
                const newMovie = this.state.movie;

                
                
                data.append("name", newMovie.name)
                data.append("genreIds", newMovie.genres)
                // data.append("director", newMovie.director)
                data.append("duration", parseInt(newMovie.duration))
                data.append("producer", newMovie.producer)
                data.append("country", newMovie.country)
                data.append("actorIds", newMovie.actors)
                data.append("releaseDate", newMovie.releaseDate)
                if(typeof newMovie.mainImage !== 'string'){
                    data.append("mainImage", newMovie.mainImage)
                }
                if(typeof newMovie.thumbnailImage !== 'string'){
                    data.append("thumbnailImage", newMovie.thumbnailImage)
                }
                data.append("trailer", newMovie.trailer)
                data.append("description", newMovie.description)

                
                
            if(this.props.movieInfo.id == ""){
                //
                
                this.props.onAddMovie(data)
            }else {
                //data.append("id", newMovie.id)
                
                this.props.onUpdateMovie(data, newMovie.id)
            }
            this.props.onToggleMovieForm();          
        }else {
            this.setState({
                invalidMessage : "Vui l??ng nh???p ?????y ????? th??ng tin"
            })
        }
    }

    onHandleSearchChange = (e) => {
        var {name, value} = e.target;
        this.setState({
            [name]: value
        })
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.movieInfo) {
            this.setState({
                movie: {...nextProps.movieInfo,
                    actors: nextProps.movieInfo.actors.map(act => {return act.id}),
                    genres: nextProps.movieInfo.genres.map(gen => {return gen.id}),
                    mainImage: nextProps.movieInfo.image.mainUrl,
                    previewImage: nextProps.movieInfo.image.mainUrl,
                    thumbnailImage: nextProps.movieInfo.image.thumbnailUrl
                },
                selectedGenres: nextProps.movieInfo.genres,
                selectedActors: nextProps.movieInfo.actors
            })
        }
    }
    render() {

        const {isDisplayMovieForm} = this.props;
        const {movie} = this.state
        const movieInfo = this.props.movieInfo;
        var {genres, actors} = this.props
        
        genres = genres.filter((genre) => {
            return genre.name.toLowerCase().indexOf(this.state.filterGenre.toLowerCase()) !== -1
        });

        actors = actors.filter((actor) => {
            return actor.name.toLowerCase().indexOf(this.state.filterActor.toLowerCase()) !== -1
        })
        let showImage = null;
        if(movie.id){
            showImage = movieInfo.image.thumbnailUrl
        }else showImage = this.state.previewImage;
        

        return (
           <div>  
            <Modal 
                show={isDisplayMovieForm} 
                onHide = {this.props.onToggleMovieForm}
                size="lg"
                style={{maxWidth: '100%', width: '100%'}}>
                <Modal.Header>{movieInfo.id === "" ? "Ta??? phim m???i" : "Ch???nh s???a phim"}</Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.addMovie} encType="multipart/form-data">
                        <div className='row'>
                            <div className='col-md-6 col-lg-6'>
                                {/* <div className="form-group">
                                    <label>ID phim :</label>
                                    <span className="form-control">{movie.id}</span>
                                </div> */}
                                <div className="form-group">
                                    <label>T??n phim :</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={movie.name}
                                        onChange={ this.onHandleChange }
                                    
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Th???i l?????ng :</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="duration"
                                        value={movie.duration}
                                        onChange={ this.onHandleChange }
                                    
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Nh?? s???n xu???t :</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="producer"
                                        value={movie.producer}
                                        onChange={ this.onHandleChange }
                                    
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Qu???c gia :</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="country"
                                        value={movie.country}
                                        onChange={ this.onHandleChange }
                                    
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Ng??y ph??t h??nh :</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="releaseDate"
                                        value={movie.releaseDate}
                                        onChange={ this.onHandleChange }
                                    
                                    />
                                </div>
                                <div className="form-group">
                                    <label>image :</label>
                                    <input
                                        name = "image"
                                        type="file"
                                        className="form-control"
                                        onChange={ this.onHandleChange }
                                    
                                    />
                                    <div className="image-preview">
                                        <img 
                                            src={this.state.movie.previewImage} 
                                            width = '100%'
                                            height = '100%'
                                            
                                            ></img>
                                    </div>
                                </div> 
                            </div>

                            <div className='col-md-6 col-lg-6'>                              
                                <div className="form-group">
                                    <label>Th??? lo???i :</label>
                                    <input 
                                        name="filterGenre"
                                        value = {this.state.filterGenre}
                                        className="ml-2 form-control" 
                                        placeholder="T??m theo th??? lo???i"
                                        onChange = {this.onHandleSearchChange}>
                                    </input><br></br>
                                    <div className="genres-box">
                                        
                                        {this.showGenreCheckbox(genres)}
                                        
                                    </div>
                                    
                                    <div>
                                        <span>???? ch???n:</span>
                                        {this.showChoosedGenres(this.state.selectedGenres)}
                                    </div>
                                </div>

                                <div className="form-group">
                                    
                                    <label>Di???n vi??n :</label>
                                    <input 
                                        name="filterActor"
                                        value={this.state.filterActor}
                                        className="ml-2 form-control" 
                                        placeholder="T??m theo t??n di???n vi??n"
                                        onChange = {this.onHandleSearchChange}>                                       
                                    </input><br></br>
                                    <div className="actors-box">
                                        
                                        {this.showActorCheckbox(actors)}
                                        
                                    </div>
                                    
                                    <div>
                                        <span>???? ch???n:</span>
                                        {this.showChoosedActor(this.state.selectedActors)}
                                    </div>    
                                </div>
                                <div className="form-group">
                                    <label>Trailer phim :</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="trailer"
                                        value={movie.trailer}
                                        onChange={ this.onHandleChange }
                                    
                                    />
                                </div>
                                <div className="form-group">
                                    <label>M?? t??? phim :</label>
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
        genres : state.genres.genres,
        actors: state.actors.actors,
        isDisplayMovieForm : state.isDisplayMovieForm,
        movieInfo: state.movieInfo
    }
}

const mapDispatchToProps = (dispatch, props) =>{
    return {
        onToggleMovieForm: () => {
            dispatch(actions.toggleMovieForm())
        },
        onAddMovie: (movie) => {
            dispatch(actions.actAddMovieRequest(movie))
        },
        onGetMovie : (id) => {
            dispatch(actions.getMovieRequest(id))
        },
        onUpdateMovie : (movie, id) => {
            dispatch(actions.actUpdateMovieRequest(movie, id))
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
