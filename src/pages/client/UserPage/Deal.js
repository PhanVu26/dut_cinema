import React, { useEffect, Component } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ItemDeal from "./DealItem";
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

class Deal extends Component {
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
    let arrayBooking = [];
    if (this.props.transaction.hasOwnProperty("results")) {
      for (let i = 0; i < this.props.transaction.results.length; i++) {
        if (account.user.id === this.props.transaction.results[i].user.id) {
          arrayBooking.push(this.props.transaction.results[i]);
        }
      }
    }
    let dataItemDeal = arrayBooking.map((myDeal, index) => {
      return <ItemDeal key={`movie ${index}`} myDeal={myDeal} />;
    });

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
            </TableRow>
          </TableHead>
          <TableBody>{dataItemDeal}</TableBody>
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

export default connect(mapStateToProps, mapDispatchToProps)(Deal);

// function Deal() {
//   const dispatch = useDispatch();
//   var bookingMovie =
//     useSelector((state) => state.reducerMovie.bookingMovie) || [];
//   console.log(bookingMovie);
//   //   useEffect(() => {
//   //     dispatch(actFetchDataBookingMovieRequest());
//   //   }, [dispatch]);

//   const classes = useStyles();
//   const account = JSON.parse(localStorage.getItem("account"));
//   let data = [];
//   let arrayBooking = [];
//   // data = bookingMovie;

//   for (let i = 0; i < data.length; i++) {
//     if (account._id === data[i].idUser) {
//       arrayBooking.push(data[i]);
//     }
//   }

//   let dataItemDeal = arrayBooking.map((myDeal, index) => {
//     return <ItemDeal key={`movie ${index}`} myDeal={myDeal} />;
//   });
//   return (
//     <TableContainer component={Paper}>
//       <Table className={classes.table} aria-label="customized table">
//         <TableHead>
//           <TableRow>
//             <StyledTableCell>Ngày</StyledTableCell>
//             <StyledTableCell align="center">Thời Gian</StyledTableCell>
//             <StyledTableCell align="center">Mã Vé</StyledTableCell>
//             <StyledTableCell align="center">Rạp</StyledTableCell>
//             <StyledTableCell align="center">Phim</StyledTableCell>
//             <StyledTableCell align="center">Ghế</StyledTableCell>
//             <StyledTableCell align="center">Giá trị</StyledTableCell>
//             <StyledTableCell align="center">Giá Combo</StyledTableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>{dataItemDeal}</TableBody>
//       </Table>
//     </TableContainer>
//   );
// }

// export default Deal;
