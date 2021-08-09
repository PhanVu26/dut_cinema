import { Button, Modal } from 'react-bootstrap';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions/genreAction/index';

class GenreForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
           genre: {
                id: "",
                name: "",
            },
            invalidMessage: ""
        }
    }
    
    

    componentWillReceiveProps(nextProps) {
        if(nextProps.genreEditing) {
            this.setState({
                genre: nextProps.genreEditing,
            })
        }
    }
   
    onHandleChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState(prevState => ({
            genre: {
                ...prevState.genre,
                    [name]: value ,             
            }
        }))
        
    }

    

    validateGenre = () => {
        const genre = this.state.genre;
        if(genre.name === ""){
                return false
            }
        return true;    
    }
    saveGenre = (event) => {
        event.preventDefault();
        if(this.validateGenre() === true) {
            if(this.props.genreEditing.id){
                console.log("update genreId", this.props.genreEditing.id, this.state.genre)
                this.props.onUpdateGenre(this.state.genre)
                this.props.onToggleGenreForm()
            }else {
                const saveGenre = {
                    name: this.state.genre.name,
                } 
                this.props.onSaveGenre(saveGenre)
                this.props.onToggleGenreForm()
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

        const {isDisplayGenreForm} = this.props;
        const {genre} = this.state
        const genreEditing = this.props.genreEditing;

        return (
           <div>  
            <Modal 
                show={isDisplayGenreForm} 
                onHide = {this.props.onToggleGenreForm}
                size="lg"
                style={{maxWidth: '100%', width: '100%'}}>
                <Modal.Header>{genreEditing.id === "" ? "Taọ thể loại mới" : "Chỉnh sửa thể loại"}</Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.saveGenre}>
                        <div className='row'>
                            <div className='col-md-12 col-lg-12'>
                                <div className="form-group">
                                    <label>Tên thể loại :</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={genre.name}
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
                                        value={genre.description}
                                        onChange={ this.onHandleChange }
                                    
                                    />
                                </div>
                            </div>                      
                        </div>                       
                    </form>    
                    <h5 className="text-danger">{this.state.invalidMessage !== "" ? this.state.invalidMessage: ""}</h5>
                </Modal.Body>
                <Modal.Footer>
                    
                    <Button onClick={this.saveGenre}>
                        Save
                    </Button>
                    <Button onClick={this.props.onToggleGenreForm}>
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
        isDisplayGenreForm : state.isDisplayGenreForm,
        genreEditing: state.genreEditing
    }
}

const mapDispatchToProps = (dispatch, props) =>{
    return {
        onToggleGenreForm: () => {
            dispatch(actions.toggleGenreForm())
        },
        onSaveGenre: (genre) => {
            dispatch(actions.actSaveGenresRequest(genre))
        },
        onGetGenreEditing : (genre) => {
            dispatch(actions.getGenreInfo(genre))
        },
        onUpdateGenre: (genre) => {
            dispatch(actions.actUpdateGenresRequest(genre))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GenreForm);
