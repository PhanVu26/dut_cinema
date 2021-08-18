import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions/genreAction/index'
import GenreItem from './GenreItem';


class GenreList extends Component {
    constructor(props){
        super(props);

        this.state = {
            filterByName: '',
        }
    }

    showGenres = genres => {
        var result = null;
        if (genres.length > 0) {
          result = genres.map((genre, index) => {
            return <GenreItem key={genre.id} genre={genre} index={index + 1} />;
          });
        }
        return result;
      };

    handleChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        var filter = {
            name: name === 'filterByName' ? value : this.state.filterByName,
        }
        this.setState({
            [name]: value
        })
        this.props.onFilterGenre(filter)
        
    }


    render() {
        var{rowsPerPage, filterGenre} = this.props;
        
        if(filterGenre.name){
            rowsPerPage = rowsPerPage.filter((genre) => {
                return genre.name.toLowerCase().indexOf(filterGenre.name.toLowerCase()) !== -1
            })
        }
        return (
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th className="text-center">STT</th>
                        <th className="text-center">ID</th>
                        <th className="text-center">Tên thể loại</th>
                        <th className="text-center">Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td className="text-center">
                            <input 
                                type="text"
                                name="filterByName"
                                placeholder='Nhập tên thể loại'
                                onChange={this.handleChange}
                                value={this.state.filterByName}>
                            </input>
                        </td>
                        <td></td>
                    </tr>
                    
                    {this.showGenres(rowsPerPage)}
                    
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        genres: state.genres.genres,
        // genres: state.genres,
        filterGenre : state.filterGenre,
        // pageInfo: state.pageInfo
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onFilterGenre: (filter) => {
            dispatch(actions.filterGenre(filter))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (GenreList);
