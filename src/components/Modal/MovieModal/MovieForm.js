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
                genreIds: [],
                director:"",
                producer:"",
                country:"",
                actorIds: [],
                releaseDate: "",
                mainImage: "",
                thumbnailImage:"",
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
        var result = -1;
        actorIds.forEach((actorId, index) => {
            if(actorId === id){
                result = index;
            }
        });
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
        var target = e.target;
        var name = target.name;
        var value = target.value;
        var id = e.target.id;

        console.log("value", e)
        console.log("checked", e.target.checked)
        var file = null;
        var image = null;
        if(e.target.files != null){
            file = e.target.files[0]
            this.setState(prevState => ({
                previewImage: URL.createObjectURL(file),
                movie: {
                    ...prevState.movie,
                    mainImage: file!=null ? file : prevState.movie.mainImage,
                    thumbnailImage: file!=null ? file : prevState.movie.thumbnailImage   
                },
                //genreIds: genreIds
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
            //         //genreIds: genreIds
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
                        actorIds: [...prevState.movie.actorIds,
                            //id: value,
                            // name: e.target.labels[0].innerHTML
                            parseInt(value)
                        ]
                    }
                }))
            }else {
                console.log("falise")
                let label = e.target.labels[0].innerHTML;
                let a = this.state.movie.actorIds.filter(actor => actor != value)
                console.log("filter", a)
                this.setState((prevState) => ({
                    selectedActors: prevState.selectedActors.filter(actor => actor.name !== label),
                    movie: {
                        ...prevState.movie,
                        actorIds: a
                    }
                }));
            }
        }
        

        // if(e.target.checked === true){
        //     if(e.target.className === "actor-checkbox"){
        //         this.setState(prevState => ({
        //             selectedActors: [...prevState.selectedActors, e.target.labels[0].innerHTML],
        //             movie: {
        //                 ...prevState.movie,
        //                 actorIds: [...prevState.movie.actorIds,
        //                     //id: value,
        //                     // name: e.target.labels[0].innerHTML
        //                     parseInt(value)
        //                 ]
        //             }
        //         }))
        //     }else {
        //         this.setState(prevState => ({
        //             selectedGenres: [...prevState.selectedGenres, e.target.labels[0].innerHTML],
        //             movie: {
        //                 ...prevState.movie,
        //                 genreIds: [...prevState.movie.genreIds,
        //                     parseInt(value)
        //                     // id: value,
        //                     // name: e.target.labels[0].innerHTML
        //                 ]
        //             }
        //         }))
        //     }
            
        // }else {
        //     if(e.target.className === "actor-checkbox"){
        //         if(value != ""){
        //             this.setState((prevState) => ({
        //                 selectedActors: prevState.selectedActors.filter((_, i) => i !== this.findIndexActorById(this.state.movie.actorIds, value)),
        //                 movie: {
        //                     ...prevState.movie,
        //                     actorIds: prevState.movie.actorIds.filter((_, i) => i !== this.findIndexActorById(prevState.movie.actorIds, value))
        //                 }
        //             }));
        //         }
        //     }
        //     else {
        //         if(value != ""){
        //             this.setState((prevState) => ({
        //                 selectedGenres: prevState.selectedGenres.filter((_, i) => i !== this.findIndexActorById(this.state.movie.genreIds, value)),
        //                 movie: {
        //                     ...prevState.movie,
        //                     genreIds: prevState.movie.genreIds.filter((_, i) => i !== this.findIndexGenreById(prevState.movie.genreIds, value))
        //                 }
        //             }));
        //         }
        //     }    
        // }

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
        results = actors.map((actor, index) => {
            console.log("showActorBox", this.state.selectedActors?.some(act => act.id == actor.id))
            return (
                <div className="actor-item ml-3" key={index}>
                    <img src={testImage} width="30px" height="30px">
                    </img>
                    <label htmlFor={'actor'+actor.id} className="mr-2">{actor.name}</label>
                    <input 
                        checked = {this.state.selectedActors?.some(act => act.id == actor.id)}
                        className="actor-checkbox"
                        type="checkbox" 
                        id={'actor'+actor.id} 
                        onChange = {this.onHandleChange} 
                        value={actor.id}></input><br></br>
                       
                </div>
            ) 
        })
        return results;
    }

    removeSelectedActor = (id) =>{
        console.log("remove ", id)
        this.setState((prevState) => ({
            selectedActors: prevState.selectedActors.filter(actor => actor.id !== id),
            movie: {
                ...prevState.movie,
                actorIds: this.state.movie.actorIds.filter(actor => actor != id)
            }
        }));
    }

    showChoosedActor = (actors) => {
        let rs = []
        console.log("actors",actors);
        rs = actors.map(actor => {
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
        results = genres.map((genre, index) => {
            return (
                <div className="genre-item ml-3" key={index}>
                    <label htmlFor={'genre'+genre.id} className="mr-2">{genre.name}</label>
                    <input 
                        defaultChecked = {this.state.selectedGenres?.some(genreName => genreName === genre.name)}
                        className="genre-checkbox"
                        type="checkbox" 
                        id={'genre'+genre.id} 
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
        if(movie.name === "" || movie.director === "" || movie.description === "" ||
            movie.description === "" || movie.genreIds.length == 0 || movie.releaseDate === "" ||
            movie.image == "" || movie.actorIds.length == 0 || movie.country === ""){
                return false
            }
        return true;    
    }
    saveMovie = (event) => {
        event.preventDefault();
        if(this.validateMovie() === true) {
            if(this.props.movieInfo.id == ""){
                console.log("edit moive id", this.props.movieInfo.id)
                console.log("save movie", this.state.movie)

                var data = new FormData();
                var newMovie = this.state.movie;
                console.log("newMovie", newMovie)
                data.append("name", newMovie.name)
                data.append("genreIds", newMovie.genreIds)
                data.append("director", newMovie.director)
                data.append("producer", newMovie.producer)
                data.append("country", newMovie.country)
                data.append("actorIds", newMovie.actorIds)
                data.append("releaseDate", newMovie.releaseDate)
                data.append("mainImage", newMovie.mainImage)
                data.append("thumbnailImage", newMovie.thumbnailImage)
                data.append("description", newMovie.description)
                
                // data = {
                //     name: newMovie.name,
                //     genreIds: newMovie.genreIds,
                //     director: newMovie.director,
                //     producer:newMovie.producer,
                //     country:newMovie.country,
                //     actorIds: newMovie.actorIds,
                //     releaseDate: newMovie.releaseDate,
                //     description: newMovie.description
                // };
                // data.append("mainImage", newMovie.mainImage)
                // data.append("thumbnailImage", newMovie.thumbnailImage)
                console.log("form-data", data)
                console.log("image", data.mainImage);



                this.props.onAddMovie(data)
            }else this.props.onUpdateMovie(this.state.movie)
            this.props.onToggleMovieForm();          
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

    componentWillReceiveProps(nextProps) {
        if(nextProps.movieInfo) {
            this.setState({
                movie: nextProps.movieInfo,
                selectedGenres: nextProps.movieInfo.genreIds?.map(genre =>{return genre.name}),
                selectedActors: nextProps.movieInfo.actorIds?.map(actor =>{return actor.name})
            })
        }
    }
    render() {
        const {isDisplayMovieForm} = this.props;
        const {movie} = this.state
        const movieInfo = this.props.movieInfo;
        var {genres, actors} = this.props
        console.log("state", this.state);
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
                onHide = {this.props.onToggleMovieForm}
                size="lg"
                style={{maxWidth: '100%', width: '100%'}}>
                <Modal.Header>{movieInfo.id === "" ? "Taọ phim mới" : "Chỉnh sửa phim"}</Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.addMovie} encType="multipart/form-data">
                        <div className='row'>
                            <div className='col-md-6 col-lg-6'>
                                <div className="form-group">
                                    <label>ID phim :</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        // value={movie.id}   
                                        readOnly="true"                                 
                                    />
                                </div>
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
                                        name="director"
                                        value={movie.director}
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
                                    <label>Quốc gia :</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="country"
                                        value={movie.country}
                                        onChange={ this.onHandleChange }
                                    
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Ngày phát hành :</label>
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
                                    <img 
                                        src={movieInfo.id?movieInfo.image.thumbnailImage:this.state.previewImage} 
                                        width='200px'
                                        height='200px'
                                    ></img>
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
                                    
                                    <span>Đã chọn:</span><p>{this.state.selectedGenres?.toString()}</p>
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
                                    
                                    <div>
                                        <span>Đã chọn:</span>
                                        {this.showChoosedActor(this.state.selectedActors)}
                                    </div>    
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
        onAddMovie: (movie) => {
            dispatch(actions.actAddMovieRequest(movie))
        },
        onGetMovie : (id) => {
            dispatch(actions.getMovieRequest(id))
        },
        onUpdateMovie : (movie) => {
            dispatch(actions.actUpdateMovieRequest(movie))
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
