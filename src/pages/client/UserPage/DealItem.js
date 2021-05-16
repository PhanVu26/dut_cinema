import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

class ItemDeal extends Component {
  render() {
    return (
      <>
        <StyledTableRow>
          <StyledTableCell component="th" scope="row" align="center">
            {this.props.myDeal.transaction_time.slice(0, 10)}
          </StyledTableCell>
          <StyledTableCell align="center">
            {this.props.myDeal.transaction_time.slice(11, 19)}
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
