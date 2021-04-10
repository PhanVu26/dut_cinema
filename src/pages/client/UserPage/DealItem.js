import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

class ItemDeal extends Component {
  render() {
    console.log(this.props.myDeal);

    return (
      <>
        <StyledTableRow>
          <StyledTableCell component="th" scope="row">
            {this.props.myDeal.date}
          </StyledTableCell>
          <StyledTableCell align="center">
            {this.props.myDeal.time}
          </StyledTableCell>
          <StyledTableCell align="center">
            {this.props.myDeal.tickCode}
          </StyledTableCell>
          <StyledTableCell align="center">
            {this.props.myDeal.room}
          </StyledTableCell>
          <StyledTableCell align="center">
            {this.props.myDeal.nameMovie}
          </StyledTableCell>
          <StyledTableCell align="center">
            {this.props.myDeal.seats}
          </StyledTableCell>
          <StyledTableCell align="center">
            {this.props.myDeal.ticketPrice}
          </StyledTableCell>
          <StyledTableCell align="center">
            {this.props.myDeal.foodPrice}
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
