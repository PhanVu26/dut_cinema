import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions/movieManager/index'
import ActorItem from './ActorItem';


class ActorList extends Component {
    constructor(props){
        super(props);

        // this.state = {
        //     filterByName: '',
        //     filterByGenre: -1,
        //     filterByAuthor: '',
        //     filterByProducer:''
        // }
    }

    showActors = actors => {
        var result = null;
        if (actors.length > 0) {
          result = actors.map((actor, index) => {
            return <ActorItem key={actor.id} actor={actor} index={index + 1} />;
          });
        }
        return result;
      };

    handleChange = (e) => {
        // var target = e.target;
        // var name = target.name;
        // var value = target.value;
        // var filter = {
        //     name: name === 'filterByName' ? value : this.state.filterByName,
        //     genre: name === 'filterByGenre' ? value : this.state.filterByGenre,
        //     author: name === 'filterByAuthor' ? value : this.state.filterByAuthor,
        //     producer: name === 'filterByProducer' ? value : this.state.filterByProducer,
        // }
        // this.setState({
        //     [name]: value
        // })
        // this.props.onFilterMovie(filter)
        
    }

    // showGenreSelectBox = (genres) => {
    //     var result = null;
    //     result = genres.map((genre, index) => {
    //         return (
    //             <option key={index} value={genre.id}>{genre.name}</option>
    //         )
    //     })
    //     return result;
    // }

    render() {

        // var{rowsPerPage} = this.props;
        // console.log("list movies ", rowsPerPage)
        var{rowsPerPage} = this.props;
        // if(filterMovie.name){
        //     rowsPerPage = rowsPerPage.filter((movie) => {
        //         return movie.name.toLowerCase().indexOf(filterMovie.name.toLowerCase()) !== -1
        //     })
        // }
        // if(filterMovie.author){
        //     rowsPerPage = rowsPerPage.filter((movie) => {
        //         return movie.author.toLowerCase().indexOf(filterMovie.author.toLowerCase()) !== -1
        //     })
        // }

        // if(filterMovie.producer){
        //     rowsPerPage = rowsPerPage.filter((movie) => {
        //         return movie.producer.toLowerCase().indexOf(filterMovie.producer.toLowerCase()) !== -1
        //     })
        // }
     
        // if(filterMovie.genre !== -1){
        //     rowsPerPage = rowsPerPage.filter((movie) => {
        //         var found = movie.genreIds.some(genre =>{
        //             return genre.id === filterMovie.genre
        //         });
        //         console.log('found', found)
        //         return found === true ? true: false
        //     })
        // }
        return (
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th className="text-center">STT</th>
                        <th className="text-center">ID</th>
                        <th className="text-center">Tên diễn viên</th>
                        <th className="text-center">Hình ảnh</th>
                        <th className="text-center">Ngày sinh</th>
                        <th className="text-center">Quốc tịch</th>
                        <th className="text-center">Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    {/* <tr>
                        <td></td>
                        <td></td>
                        <td>
                            <input 
                                type="text"
                                name="filterByName"
                                placeholder='Nhập tên phim'
                                onChange={this.handleChange}
                                value={this.state.filterByName}>
                            </input>
                        </td>
                        <td></td>
                        <td>
                            <select 
                                name="filterByGenre"
                                onChange={this.handleChange}
                                value={this.state.filterByGenre} >
                                    <option value={-1}>Tất cả</option>
                                    {this.showGenreSelectBox(this.props.genres)}
                            </select>
                        </td>
                        <td>
                            <input 
                                type="text"
                                name="filterByAuthor"
                                placeholder='Nhập tên đạo diễn'
                                onChange={this.handleChange}
                                value={this.state.filterByAuthor}>
                            </input>
                        </td>
                        <td>
                            <input 
                                type="text"
                                name="filterByProducer"
                                placeholder='Nhập tên nhà sản xuất'
                                onChange={this.handleChange}
                                value={this.state.filterByProducer}>
                            </input>
                        </td>
                        <td></td>
                        <td></td>
                    </tr> */}
                    
                    {this.showActors(rowsPerPage)}
                    
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        actors: state.actors,
        // genres: state.genres,
        // filterMovie : state.filterMovie,
        // pageInfo: state.pageInfo
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        // onFilterMovie: (filter) => {
        //     dispatch(actions.filterMovie(filter))
        // }
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (ActorList);
