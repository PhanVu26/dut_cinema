import React, { useEffect, Component } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import BookedItem from "./BookedItem";
import { useDispatch, useSelector, connect } from "react-redux";
import { actFetchDataBookingMovieRequest } from "../../../actions/index";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function compare(a, b) {
  if (a.ticket.id < b.ticket.id) {
    return -1;
  }
  if (a.ticket.id > b.ticket.id) {
    return 1;
  }
  return 0;
}

class Booked extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // this.props.fetchDataBooking();
    const classes = makeStyles({
      table: {
        minWidth: 700,
      },
    });

    const account = JSON.parse(localStorage.getItem("account"));
    let arrayBooking1 = [];
    let arrayBooking2 = [];
    let arrayBooking = [];
    if (this.props.transaction.hasOwnProperty("results")) {
      arrayBooking1 = this.props.transaction.results;
      arrayBooking1 = arrayBooking1.filter((item) => item.service === "Book");
      arrayBooking2 = this.props.transaction.results;
      arrayBooking2 = arrayBooking2.filter((item) => item.service === "Cancel");
      console.log("test1", arrayBooking1);
      console.log("test2", arrayBooking2);
      arrayBooking1.sort(compare);
      arrayBooking2.sort(compare);
      let i = 0,
        j = 0;
      while (i < arrayBooking1.length && j < arrayBooking2.length) {
        let id1 = arrayBooking1[i].ticket.id;
        let id2 = arrayBooking2[j].ticket.id;
        if (id1 < id2) {
          arrayBooking.push(JSON.parse(JSON.stringify(arrayBooking1[i])));
          i++;
        } else if (id1 === id2) {
          i++;
          j++;
        } else {
          j++;
        }
      }
      for (; i < arrayBooking1.length; i++) {
        arrayBooking.push(JSON.parse(JSON.stringify(arrayBooking1[i])));
      }

      // for (let i = 0; i < this.props.transaction.results.length; i++) {
      //   if (account.user.id === this.props.transaction.results[i].user.id) {
      //     arrayBooking.push(this.props.transaction.results[i]);
      //   }
      // }
    }
    let dataBookedItem = arrayBooking.map((myBooked, index) => {
      return <BookedItem key={`booked ${index}`} myBooked={myBooked} />;
    });
    console.log("test3", dataBookedItem);
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Ngày</StyledTableCell>
              <StyledTableCell align="center">Thời Gian</StyledTableCell>
              <StyledTableCell align="center">Rạp</StyledTableCell>
              <StyledTableCell align="center">Phim</StyledTableCell>
              <StyledTableCell align="center">Ghế</StyledTableCell>
              <StyledTableCell align="center">Giá trị</StyledTableCell>
              <StyledTableCell align="center">Service</StyledTableCell>
              <StyledTableCell align="center">Cancel</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>{dataBookedItem}</TableBody>
        </Table>
      </TableContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    transaction: state.MovieReducer.transaction,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDataBooking: () => {
      dispatch(actFetchDataBookingMovieRequest());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Booked);
