import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions/roomAction/index'
import RoomItem from './RoomItem';


class RoomList extends Component {
    constructor(props){
        super(props);
    }

    showRooms = rooms => {
        var result = null;
        if (rooms.length > 0) {
          result = rooms.map((room, index) => {
            return <RoomItem key={room.id} room={room} index={index + 1} />;
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
                        <th className="text-center">Tên room</th>
                        <th className="text-center">room number</th>
                        <th className="text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>               
                    {this.showRooms(rowsPerPage)}                   
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        rooms: state.rooms,
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps) (RoomList);
