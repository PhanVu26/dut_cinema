import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

class ItemDeal extends Component {
  render() {
    let d = new Date(this.props.myDeal.transaction_time);
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
            {this.props.myDeal.ticket.seat.room.cinema.name}
          </StyledTableCell>
          <StyledTableCell align="center">
            {this.props.myDeal.ticket.showtime.movie.name}
          </StyledTableCell>
          <StyledTableCell align="center">
            {this.props.myDeal.ticket.seat.row +
              this.props.myDeal.ticket.seat.column}
          </StyledTableCell>
          <StyledTableCell align="center">
            {this.props.myDeal.price}
          </StyledTableCell>
          <StyledTableCell align="center">
            {this.props.myDeal.service}
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

export default ItemDeal;
