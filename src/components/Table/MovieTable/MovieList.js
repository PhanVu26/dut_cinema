import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions/movieManager/index'
import MovieItem from '../../Table/MovieTable/MovieItem';

class MovieList extends Component {
    constructor(props){
        super(props);

        // this.state = {
        //     nameFilter: '',
        //     roleFilter: -1,
        //     statusFilter: -1
        // }
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

    // handleChange = (e) => {
    //     var target = e.target;
    //     var name = target.name;
    //     var value = target.value;
    //     var filter = {
    //         username: name === 'nameFilter' ? value : this.state.nameFilter,
    //         role: name === 'roleFilter' ? value : this.state.roleFilter,
    //         status: name === 'statusFilter' ? value : this.state.statusFilter
    //     }
    //     this.setState({
    //         [name]: value
    //     })
    //     this.props.onFilterUser(filter)
        
    // }

    render() {

        var{rowsPerPage} = this.props;
        // if(userFilter.username){
        //     rowsPerPage = rowsPerPage.filter((user) => {
        //         return user.username.toLowerCase().indexOf(userFilter.username.toLowerCase()) !== -1
        //     })
        // }
        // rowsPerPage = rowsPerPage.filter((user) => {
        //     if(userFilter.status === -1){
        //         return rowsPerPage;
        //     }else {
        //         return user.status === (userFilter.status === 0 ? true : false)
        //     }
        // })

        // rowsPerPage = rowsPerPage.filter((user) => {
        //     switch(userFilter.role){
        //         case 0: return user.role === 1; break;
        //         case 1: return user.role === 2; break;
        //         case 2: return user.role === 3; break;
        //         default: return rowsPerPage;
        //     }
            
        // })
        console.log("list users ", rowsPerPage)
        return (
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th className="text-center">STT</th>
                        <th className="text-center">ID</th>
                        <th className="text-center">Tên phim</th>
                        <th className="text-center">Thể loại</th>
                        <th className="text-center">Đạo diễn</th>
                        <th className="text-center">Nhà sản xuất</th>
                        <th className="text-center">Diễn Viên</th>
                        <th className="text-center">Ngày phát hành</th>
                        <th className="text-center">Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {this.showMovies(rowsPerPage)}
                    
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        movies: state.movies,
        // userFilter : state.userFilter,
        // pageInfo: state.pageInfo
    }
}
const mapDispatchToProps = (dispatch, props) => {
    // return {
    //     onFilterUser: (filter) => {
    //         dispatch(actions.filterUser(filter))
    //     }
    // }
}
export default connect(mapStateToProps, mapDispatchToProps) (MovieList);
