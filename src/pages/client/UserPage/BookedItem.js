import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { connect } from "react-redux";
import { actDeleteBooking } from "../../../actions/index";
import callApi from "../../../utils/ApiCallerServer";

class BookedItem extends Component {
  cancelBooking = () => {
    let ticketId = this.props.myBooked.ticket.id;
    let type = this.props.myBooked.ticket.seat.type;
    let type_Id = 1;
    if (type !== "Normal") type_Id = 2;
    const payload = {
      tickets: [
        {
          id: ticketId,
          typeId: type_Id,
        },
      ],
      status: "Available",
    };
    var result = window.confirm("Bạn có muốn hủy đặt vé?");
    if (result) {
      callApi(`tickets`, "POST", payload).then((res) => {
        window.location.reload(true);
      });
    }
    // window.location.href = "/profile";
  };

  render() {
    let d = new Date(this.props.myBooked.transaction_time);
    let month = d.getMonth() + 1;
    let day = d.getDate();
    if (month < 10) {
      month = "0" + month.toString();
    } else {
      month = month.toString();
    }
    if (day < 10) {
      day = "0" + day.toString();
    } else {
      day = day.toString();
    }
    // let d = new Date();
    // d.toISOString
    let dateString = d.getFullYear().toString() + "-" + month + "-" + day;
    return (
      <>
        <StyledTableRow>
          <StyledTableCell component="th" scope="row" align="center">
            {dateString}
          </StyledTableCell>
          <StyledTableCell align="center">
            {d.toLocaleTimeString()}
          </StyledTableCell>
          <StyledTableCell align="center">
            {this.props.myBooked.ticket.seat.room.cinema.name}
          </StyledTableCell>
          <StyledTableCell align="center">
            {this.props.myBooked.ticket.showtime.movie.name}
          </StyledTableCell>
          <StyledTableCell align="center">
            {this.props.myBooked.ticket.seat.row +
              this.props.myBooked.ticket.seat.column}
          </StyledTableCell>
          <StyledTableCell align="center">
            {this.props.myBooked.price}
          </StyledTableCell>
          <StyledTableCell align="center">
            {this.props.myBooked.service}
          </StyledTableCell>
          <StyledTableCell align="center">
            <button
              type="button"
              className="btn btn-danger"
              style={{ marginRight: "10px" }}
              onClick={this.cancelBooking}
            >
              <span className="far fa-trash-alt"></span>
            </button>
          </StyledTableCell>
        </StyledTableRow>
      </>
    );
  }
}

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const mapDispatchToProps = (dispatch, props) => {
  return {
    onDeleteBooking: (payload) => {
      dispatch(actDeleteBooking(payload));
    },
  };
};

export default connect(null, mapDispatchToProps)(BookedItem);
