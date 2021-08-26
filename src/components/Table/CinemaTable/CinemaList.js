import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions/cinemaAction/index'
import CinemaItem from './CinemaItem';


class CinemaList extends Component {
    constructor(props){
        super(props);
    }

    showCinemas = cinemas => {
        var result = null;
        if (cinemas.length > 0) {
          result = cinemas.map((cinema, index) => {
            return <CinemaItem key={cinema.id} cinema={cinema} index={index + 1} />;
          });
        }
        return result;
      };



    render() {
        var{rowsPerPage} = this.props;
        return (
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th className="text-center">ID</th>
                        <th className="text-center">Tên cinema</th>
                        <th className="text-center">Địa chỉ</th>
                        <th className="text-center">Mô tả</th>
                        <th className="text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>               
                    {this.showCinemas(rowsPerPage)}                   
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cinemas: state.cinemas,
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps) (CinemaList);
