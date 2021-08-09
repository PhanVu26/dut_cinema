import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions/seatAction/index'
import SeatItem from './SeatItem';


class SeatList extends Component {
    constructor(props){
        super(props);
    }

    showSeats = seats => {
        var result = null;
        if (seats.length > 0) {
          result = seats.map((seat, index) => {
            return <SeatItem key={index} seat={seat} index={index + 1} />;
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
                        <th className="text-center">Hàng ghế</th>
                        <th className="text-center">Số lượng</th>
                        <th className="text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>               
                    {this.showSeats(rowsPerPage)}                   
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        seats: state.seats.seats,
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps) (SeatList);
