import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { actDeleteShowtimeRequest } from "../../../actions/showtimeManager/index";

class ShowtimeItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDisplayForm: false,
    };
  }

  onDeleteShowtime = (id) => {
    actDeleteShowtimeRequest(id);
  };

  getUserEditing = () => {
    this.props.onToggleUserForm();
    console.log("id", this.props.user.id);
    this.props.onGetUserEditing(this.props.user.id);
  };
  showUserRole = (userRoles) => {
    const rs = userRoles?.map((role, index) => {
      return role.role.name;
    });
    return rs?.toString();
  };
  render() {
    const { index, showtime } = this.props;
    return (
      <tr>
        {/* <td className="text-center">{index}</td> */}
        <td className="text-center">{showtime.id}</td>
        <td className="text-center">{showtime.startTime.slice(0, 10)}</td>
        <td className="text-center">{showtime.startTime.slice(11, 16)}</td>
        <td className="text-center">{showtime.endTime.slice(11, 16)}</td>
        <td className="text-center">{showtime.movie.name}</td>
        <td className="text-center">
          <button
            onClick={() => {
              if (window.confirm("Bạn có muốn xóa lịch chiếu này?")) {
                this.onDeleteShowtime();
              }
            }}
            type="button"
            className="btn btn-danger"
          >
            <span className="far fa-trash-alt mr-2"></span>Xóa
          </button>
        </td>
      </tr>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userEditing: state.userEditing,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowtimeItem);
