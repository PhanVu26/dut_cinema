import React, { useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ItemDeal from "./DealItem";
import { useDispatch, useSelector } from "react-redux";
// import { actFetchDataBookingMovieRequest } from "../../../actions/action";

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

function Deal() {
  const dispatch = useDispatch();
  var bookingMovie =
    useSelector((state) => state.reducerMovie.bookingMovie) || [];
  console.log(bookingMovie);
  //   useEffect(() => {
  //     dispatch(actFetchDataBookingMovieRequest());
  //   }, [dispatch]);

  const classes = useStyles();
  const account = JSON.parse(localStorage.getItem("account"));
  let data = [];
  let arrayBooking = [];
  data = bookingMovie;

  for (let i = 0; i < data.length; i++) {
    if (account._id === data[i].idUser) {
      arrayBooking.push(data[i]);
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
            <StyledTableCell>Ngày</StyledTableCell>
            <StyledTableCell align="center">Thời Gian</StyledTableCell>
            <StyledTableCell align="center">Mã Vé</StyledTableCell>
            <StyledTableCell align="center">Rạp</StyledTableCell>
            <StyledTableCell align="center">Phim</StyledTableCell>
            <StyledTableCell align="center">Ghế</StyledTableCell>
            <StyledTableCell align="center">Giá trị</StyledTableCell>
            <StyledTableCell align="center">Giá Combo</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>{dataItemDeal}</TableBody>
      </Table>
    </TableContainer>
  );
}

export default Deal;
