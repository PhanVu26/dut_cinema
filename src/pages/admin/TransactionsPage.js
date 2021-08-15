import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import {makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import Loader from 'react-loader-advanced';

import RefreshIcon from '@material-ui/icons/Refresh';
import SearchIcon from '@material-ui/icons/Search';

import * as actions from '../../actions/transactionAction/index';
import TransactionDetail from "../../components/Modal/TransactionModal/TransactionDetail";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "id", numeric: false, disablePadding: true, label: "Id" },
  { id: "cinema", numeric: false, disablePadding: true, label: "Rạp chiếu" },
  { id: "name", numeric: false, disablePadding: false, label: "Tên phim" },
  { id: "seat", numeric: false, disablePadding: false, label: "Ghế" },
  { id: "price", numeric: false, disablePadding: false, label: "Giá vé" },
  { id: "user", numeric: false, disablePadding: false, label: "Người đặt" },
  { id: "email", numeric: false, disablePadding: false, label: "Email người đặt" },
  { id: "transaction_time", numeric: false, disablePadding: false, label: "Thời gian" },
  { id: "service", numeric: false, disablePadding: false, label: "Trạng thái" },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding="20px"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell>Hành động</TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  searchBar: {
    border: 1,
  },
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("id");
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [movieName, setMovieName] = React.useState('');
  const [cinemaName, setCinemaName] = React.useState('');
  const loading = useSelector((state) => state.transactions.loading);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const rows = useSelector((state) => state.transactions.transactions);
  const roles = useSelector((state) => state.roles)
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(actions.actFetchDataTransactionsRequest());
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    console.log("page", newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log("perpage", event.target.value);
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onDeleteTransaction = (id) => {
    dispatch(actions.actDeleteTransactionRequest(id));
  };

  const getTransaction = (transaction) => {
    dispatch(actions.getTransaction(transaction));
    dispatch(actions.onToggleModal());
  };

  const refreshData = () => {
    dispatch(actions.actFetchDataTransactionsRequest());
    setMovieName('');
    setCinemaName('');
  }

  const searchUserQuery = (e) => {
    e.preventDefault();
    // const filter = `filter={"name": {"like": "${name}"}, "email": {"like": "${email}"}}`;
    // dispatch(userActions.actFetchDataUsersFilterRequest(filter));
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <Loader show={loading} message={'Loading.......'}> 
        <TransactionDetail></TransactionDetail>
        <section style={{backgroundColor:"#f3f3f4"}}>
        <div class="container-fluid">
            <div class="row">
            <div class="col-xl-10 col-lg-9 col-md-8 ml-auto">
                <div class={"row " + classes.searchBar}>
                <div class="col-xl-12 col-12 mb-xl-0">
                    <h3 class="text-left mb-2 pt-3">Lịch sử giao dịch</h3>
                    <div className="mb-3 mt-3">
                    <div 
                        className="col-12" 
                        style={{boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)", 
                        backgroundColor:"white",
                        borderRadius: "4px"
                        }} >
                    <form 
                        class="form-inline pt-3 pb-3" 
                        onSubmit={searchUserQuery}>
                        <div class="form-group mb-2 mr-5">
                        <lable>Tên phim:</lable>&nbsp;
                        <input 
                            className="form-control"
                            placeholder="Nhập tên phim"
                            value= {movieName}
                            onChange={e=> {setMovieName(e.target.value)}}>                       
                            </input>
                        </div>
                        <div class="form-group mb-2 mr-5">
                        <lable>Tên rạp chiếu:</lable>&nbsp;
                        <input 
                            className="form-control"
                            placeholder="Nhập tên rạp chiếu"
                            value= {cinemaName}
                            onChange={e=> {setCinemaName(e.target.value)}}>                       
                            </input>
                        </div>                        
                        <div class="form-group mb-2">
                        <button 
                            type="submit"
                            className="btn btn-primary"
                            ><SearchIcon>Tìm kiếm</SearchIcon></button>&nbsp;
                        <button 
                            
                            className="btn btn-warning"
                            onClick={()=>{refreshData()}}
                        >
                            <RefreshIcon color="secondary">
                            Làm mới</RefreshIcon></button>
                        </div>
                    </form>
                    </div>
                    
                    </div>
                    <div className={classes.root}>
                    <Paper className={classes.paper}>
                        <TableContainer>
                        <Table
                            className={classes.table}
                            aria-labelledby="tableTitle"
                            size={dense ? "small" : "medium"}
                            aria-label="enhanced table"
                        >
                            <EnhancedTableHead
                            classes={classes}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            />
                            <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                                )
                                .map((row, index) => {
                                const labelId = `enhanced-table-checkbox-${index}`;
                                const status = row.isActive
                                    ? " khóa"
                                    : " kích hoạt";
                                return (
                                    <TableRow>
                                    <TableCell
                                        component="th"
                                        id={labelId}
                                        scope="row"
                                        padding="20px"
                                    >
                                        {row.id}
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.ticket?.seat.room.cinema.name}
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.ticket.showtime.movie.name}
                                    </TableCell>
                                    <TableCell align="left">{row.ticket.seat.row + row.ticket.seat.column}</TableCell>
                                    <TableCell align="left">
                                        {row.price}
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.user.name}
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.user.email}
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.transaction_time.slice(0,10)}
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.service}
                                    </TableCell>
                                    <TableCell>
                                        <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() => getTransaction(row)}
                                        >
                                        <span className="fa fa-eye mr-2"></span>
                                        Xem
                                        </button>                                  
                                        &nbsp;
                                        <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => {
                                            if (
                                            window.confirm(
                                                "Bạn có muốn xóa giao dịch này?"
                                            )
                                            ) {
                                            onDeleteTransaction(row.id);
                                            }
                                        }}
                                        >
                                        <span className="far fa-trash-alt mr-2"></span>
                                        Xóa
                                        </button>
                                    </TableCell>
                                    </TableRow>
                                );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                style={{ height: (dense ? 33 : 53) * emptyRows }}
                                >
                                <TableCell colSpan={6} />
                                </TableRow>
                            )}
                            </TableBody>
                        </Table>
                        </TableContainer>
                        <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                    </div>
                </div>              
                </div>
            </div>
            </div>
        </div>
        </section>
    </Loader>
  );
}