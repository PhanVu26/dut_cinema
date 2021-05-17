import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions/movieManager/index'
import MovieForm from '../../Modal/MovieModal/MovieForm';
import MovieItem from '../../Table/MovieTable/MovieItem';

class MovieList extends Component {
  constructor(props) {
    super(props);

        this.state = {
            filterByName: '',
            filterByGenre: -1,
            filterByDirector: '',
            filterByProducer:''
        }
  }
    handleChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        var filter = {
            name: name === 'filterByName' ? value : this.state.filterByName,
            genre: name === 'filterByGenre' ? value : this.state.filterByGenre,
            director: name === 'filterByDirector' ? value : this.state.filterByDirector,
            producer: name === 'filterByProducer' ? value : this.state.filterByProducer,
        }
        this.setState({
            [name]: value
        })
        this.props.onFilterMovie(filter)
        
    }
    showMovies = movies => {
      var result = null;
      if (movies.length > 0) {
        result = movies.map((movie, index) => {
          return <MovieItem key={movie.id} movie={movie} index={index + 1} />;
        });
      }
      return result;
    };
    showGenreSelectBox = (genres) => {
        var result = null;
        result = genres.map((genre, index) => {
            return (
                <option key={index} value={genre.id}>{genre.name}</option>
            )
        })
        return result;
    }

  render() {
    // var{rowsPerPage} = this.props;
    // console.log("list movies ", rowsPerPage)
    var { rowsPerPage, filterMovie } = this.props;
    if (filterMovie.name) {
      rowsPerPage = rowsPerPage.filter((movie) => {
        return (
          movie.name.toLowerCase().indexOf(filterMovie.name.toLowerCase()) !==
          -1
        );
      });
    }
    if (filterMovie.author) {
      rowsPerPage = rowsPerPage.filter((movie) => {
        return (
          movie.author
            .toLowerCase()
            .indexOf(filterMovie.author.toLowerCase()) !== -1
        );
      });
    }

    // var{rowsPerPage} = this.props;
    console.log("filter", this.state);
    var{rowsPerPage, filterMovie} = this.props;
    if(filterMovie.name){
        rowsPerPage = rowsPerPage.filter((movie) => {
            return movie.name.toLowerCase().indexOf(filterMovie.name.toLowerCase()) !== -1
        })
    }
    if(filterMovie.director){
        rowsPerPage = rowsPerPage.filter((movie) => {
            return movie.director.toLowerCase().indexOf(filterMovie.director.toLowerCase()) !== -1
        })
    }

    if(filterMovie.producer){
        rowsPerPage = rowsPerPage.filter((movie) => {
            return movie.producer.toLowerCase().indexOf(filterMovie.producer.toLowerCase()) !== -1
        })
    }
  
    if(filterMovie.genre !== -1){
        rowsPerPage = rowsPerPage.filter((movie) => {
            return movie.genres.some(genre => {
                return genre.id == filterMovie.genre
            })
        })
    }
    return (
        <table className="table table-bordered table-hover">
            <thead>
                <tr>
                    <th className="text-center">ID phim</th>
                    <th className="text-center">Tên phim</th>
                    <th className="text-center">Hình ảnh phim</th>
                    <th className="text-center">Thể loại</th>
                    <th className="text-center">Quốc gia</th>
                    {/* <th className="text-center">Đạo diễn</th> */}
                    <th className="text-center">Nhà sản xuất</th>
                    <th className="text-center">Ngày phát hành</th>
                    <th className="text-center">Hành Động</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td>
                        <input 
                            type="text"
                            name="filterByName"
                            placeholder='Tên phim'
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
                    <td></td>
                    {/* <td>
                        <input 
                            type="text"
                            name="filterByDirector"
                            placeholder='Đạo diễn'
                            onChange={this.handleChange}
                            value={this.state.filterByDirector}>
                        </input>
                    </td> */}
                    <td>
                        <input 
                            type="text"
                            name="filterByProducer"
                            placeholder='Nhà sản xuất'
                            onChange={this.handleChange}
                            value={this.state.filterByProducer}>
                        </input>
                    </td>
                    <td></td>
                    <td></td>
                </tr>
                
                {this.showMovies(rowsPerPage)}
                
            </tbody>
        </table>
    );
  }  
}
  

const mapStateToProps = (state) => {
  return {
    movies: state.movies,
    genres: state.genres,
    filterMovie: state.filterMovie,
    // pageInfo: state.pageInfo
  };
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        onFilterMovie: (filter) => {
            dispatch(actions.filterMovie(filter))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (MovieList);
