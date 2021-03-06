import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import Loader from "react-loader-advanced";
import { NavLink } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import HomeIcon from "@material-ui/icons/Home";
import GrainIcon from "@material-ui/icons/Grain";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'
import moment from 'moment';

import RefreshIcon from "@material-ui/icons/Refresh";
import SearchIcon from "@material-ui/icons/Search";

import * as actions from "../../actions/transactionAction/index";
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
  { id: "cinema", numeric: false, disablePadding: true, label: "R???p" },
  { id: "name", numeric: false, disablePadding: false, label: "T??n phim" },
  { id: "seat", numeric: false, disablePadding: false, label: "Gh???" },
  { id: "price", numeric: false, disablePadding: false, label: "Gi??" },
  { id: "user", numeric: false, disablePadding: false, label: "Ng?????i ?????t" },
  {
    id: "transaction_time",
    numeric: false,
    disablePadding: false,
    label: "Th???i gian",
  },
  { id: "service", numeric: false, disablePadding: false, label: "Tr???ng th??i" },
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
        <TableCell>H??nh ?????ng</TableCell>
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
  link: {
    display: "flex",
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
  breadcrumb: {
    height: "10px",
    backgroundColor: "#f3f3f4",
    paddingLeft: "0px",
  },
  container: {
    maxHeight: 325,
  },
  formControl: {
    marginTop: theme.spacing(1.1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("id");
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [transactionFilter, setTransactionFilter] = React.useState({
    status:"", 
    startDate: null, 
    endDate: null,
    cinemaName:""
  });
  const loading = useSelector((state) => state.transactions.loading);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const rows = useSelector((state) => state.transactions.transactions);
  const cinemas = useSelector((state) => state.cinemas.cinemas); 
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.actFetchDataTransactionsRequest());
  }, []);

  useEffect(() => {
    var filter = `filter={"service": {"like": "${transactionFilter.status}"}}`;
    if(transactionFilter.startDate !== null && transactionFilter.endDate !== null){
      const tranFilter = `&startDate=${transactionFilter.startDate}&endDate=${transactionFilter.endDate}`;
      filter += tranFilter;
    }
    if(transactionFilter.cinema !== ""){
      filter += `&cinemaId=${transactionFilter.cinema}`
    }
    dispatch(actions.actFetchDataTransactionsFilterRequest(filter));
  }, [transactionFilter.status, transactionFilter.cinema]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    
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
    setTransactionFilter({
      movieName: "", 
      cinemaName: "", 
      status: "", 
      startDate: null, 
      endDate: null, 
      cinema:""});
  };

  const handleChangeStatus = (e) => {
    setTransactionFilter({
      ...transactionFilter,
      status: (e.target.value)
    });
  }

  const searchTransactionQuery = (e) => {
    e.preventDefault();
    var filter = `filter={"service": {"like": "${transactionFilter.status}"}}`;
    if(transactionFilter.startDate !== null && transactionFilter.endDate !== null){
      const tranFilter = `&startDate=${transactionFilter.startDate}&endDate=${transactionFilter.endDate}`;
      filter += tranFilter;
    }
    if(transactionFilter.cinema !== ""){
      filter += `&cinemaId=${transactionFilter.cinema}`
    }
    dispatch(actions.actFetchDataTransactionsFilterRequest(filter));
  };

  const onChangeCinema = (e) => {
    setTransactionFilter({
      ...transactionFilter, 
      cinema: e.target.value
    });

  }

  const showCinemas = cinemas => {
    var result = null;
    if (cinemas.length > 0) {
      result = cinemas.map((cinema, index) => {
        return <MenuItem value={cinema.id} >{cinema.name}</MenuItem>;
      });
    }
    return result;
}
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <Loader show={loading} message={"Loading......."}>
      <TransactionDetail></TransactionDetail>
      <section style={{ backgroundColor: "#f3f3f4" }}>
        <div class="container-fluid">
          <div class="row">
            <div class="col-xl-10 col-lg-9 col-md-8 ml-auto">
              <div class={"row " + classes.searchBar}>
                <div class="col-xl-12 col-12 mb-xl-0">
                  <Breadcrumbs
                    aria-label="breadcrumb"
                    className={classes.breadcrumb}
                  >
                    <NavLink to={"/admin"} className={classes.link}>
                      <HomeIcon className={classes.icon} />
                      Trang ch???
                    </NavLink>
                    <Typography color="textPrimary" className={classes.link}>
                      <GrainIcon className={classes.icon} />
                      L???ch s??? giao d???ch
                    </Typography>
                  </Breadcrumbs>
                  <div className="mb-3 mt-3">
                    <div
                      className="col-12"
                      style={{
                        boxShadow:
                          "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
                        backgroundColor: "white",
                        borderRadius: "4px",
                      }}
                    >
                      <form
                        class="form-inline"
                        onSubmit={searchTransactionQuery}
                      >
                        <div class="form-group mb-4 mr-5">
                          <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-helper-label">
                              R???p chi???u
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-helper-label"
                              id="demo-simple-select-helper"
                              value={transactionFilter.cinema}
                              onChange={onChangeCinema}
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              {showCinemas(cinemas)}
                            </Select>
                          </FormControl>
                        </div>
                        <div class="form-group mb-4 mr-5">
                          <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-helper-label">
                              Tr???ng th??i
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-helper-label"
                              id="demo-simple-select-helper"
                              value={transactionFilter.status}
                              onChange={handleChangeStatus}
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              <MenuItem value="Book">Book</MenuItem>
                              <MenuItem value="Cancel">Cancel</MenuItem>
                              <MenuItem value="Buy">Buy</MenuItem>
                              <MenuItem value="Draft">Draft</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                        <div class="form-group mb-4 mr-5">
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              disableToolbar
                              variant="inline"
                              format="dd-MM-yyyy"
                              margin="normal"
                              id="date-picker-inline"
                              label="T??? ng??y"
                              value={transactionFilter.startDate}
                              onChange={(date) => {setTransactionFilter({
                                ...transactionFilter,
                                startDate: moment(date).format('MM-DD-YYYY')
                              })}}
                              KeyboardButtonProps={{
                                'aria-label': 'change date',
                              }}
                            />
                          </MuiPickersUtilsProvider>  
                        </div>
                        <div class="form-group mb-4 mr-5">
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              disableToolbar
                              variant="inline"
                              format="dd-MM-yyyy"
                              margin="normal"
                              id="date-picker-inline"
                              label="T???i ng??y"
                              value={transactionFilter.endDate}
                              onChange={(date) => {setTransactionFilter({
                                ...transactionFilter,
                                endDate: moment(date).format('MM-DD-YYYY')
                              })}}
                              KeyboardButtonProps={{
                                'aria-label': 'change date',
                              }}
                            />
                          </MuiPickersUtilsProvider>  
                        </div>
                        
                        <div class="form-group mb-2">
                          <button type="submit" className="btn btn-primary">
                            <SearchIcon>T??m ki???m</SearchIcon>
                          </button>
                          &nbsp;
                          <button
                            className="btn btn-warning"
                            onClick={() => {
                              refreshData();
                            }}
                          >
                            <RefreshIcon color="secondary">L??m m???i</RefreshIcon>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className={classes.root}>
                    <Paper className={classes.paper}>
                      <TableContainer className={classes.container}>
                        <Table
                          stickyHeader
                          aria-label="sticky table"
                          className={classes.table}
                          aria-labelledby="tableTitle"
                          size="small"
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
                                  ? " kh??a"
                                  : " k??ch ho???t";
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
                                    <TableCell align="left">
                                      {row.ticket.seat.row +
                                        row.ticket.seat.column}
                                    </TableCell>
                                    <TableCell align="left">
                                      {row.price}
                                    </TableCell>
                                    <TableCell align="left">
                                      {row.user.name}
                                    </TableCell>
                                    <TableCell align="left">
                                      {row.transaction_time.slice(0, 10)}
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
                                        <span className="fa fa-eye"></span>
                                      </button>
                                      &nbsp;
                                      <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => {
                                          if (
                                            window.confirm(
                                              "B???n c?? mu???n x??a giao d???ch n??y?"
                                            )
                                          ) {
                                            onDeleteTransaction(row.id);
                                          }
                                        }}
                                      >
                                        <span className="far fa-trash-alt"></span>
                                      </button>
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                            {emptyRows > 0 && (
                              <TableRow
                                style={{
                                  height: (dense ? 33 : 33) * emptyRows,
                                }}
                              >
                                <TableCell colSpan={6} />
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <TablePagination
                        rowsPerPageOptions={[10, 20, 30]}
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
