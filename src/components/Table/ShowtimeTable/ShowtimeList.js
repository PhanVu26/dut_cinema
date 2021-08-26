import React, { Component } from "react";
import ShowtimeItem from "./ShowtimeItem";
import { connect } from "react-redux";
import * as actions from "../../../actions/index";

class ShowtimeList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nameFilter: "",
      roleFilter: -1,
      statusFilter: -1,
    };
  }

  showShowtimes = (showtimes) => {
    var result = null;
    if (showtimes.length > 0) {
      result = showtimes.map((user, index) => {
        return <ShowtimeItem key={user.id} showtime={user} index={index + 1} />;
      });
    }
    return result;
  };

  render() {
    var { rowsPerPage } = this.props;
    return (
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            {/* <th className="text-center">STT</th> */}
            <th className="text-center">ID</th>
            <th className="text-center">Ngày</th>
            <th className="text-center">Bắt đầu</th>
            <th className="text-center">Kết thúc</th>
            <th className="text-center">Tên Phim</th>
            {/* <th className="text-center">Ngày tạo</th> */}
            <th className="text-center">Hành Động</th>
          </tr>
        </thead>
        <tbody>{this.showShowtimes(rowsPerPage)}</tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    userFilter: state.userFilter,
    pageInfo: state.pageInfo,
    roles: state.roles,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    onFilterUser: (filter) => {
      dispatch(actions.filterUser(filter));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ShowtimeList);
