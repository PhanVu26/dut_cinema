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
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import moment from "moment";

import RefreshIcon from "@material-ui/icons/Refresh";
import SearchIcon from "@material-ui/icons/Search";

import * as actions from "../../../actions/transactionAction/index";
import * as analysisActions from "../../../actions/analysisAction/index";

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
  { id: "cinema", numeric: false, disablePadding: true, label: "Rạp" },
  { id: "name", numeric: false, disablePadding: false, label: "Tên phim" },
  { id: "seat", numeric: false, disablePadding: false, label: "Ghế" },
  { id: "price", numeric: false, disablePadding: false, label: "Giá" },
  { id: "user", numeric: false, disablePadding: false, label: "Người đặt" },
  {
    id: "transaction_time",
    numeric: false,
    disablePadding: false,
    label: "Thời gian",
  },
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
    margin: theme.spacing(1),
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
    status: "",
    startTime: null,
    endTime:null
  });
  const [year, setYear] = React.useState(new Date().getFullYear());
  const loading = useSelector((state) => state.transactions.loading);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const rows = useSelector((state) => state.transactions.transactions);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("tran", transactionFilter);
    dispatch(actions.actFetchDataTransactionsRequest());
  }, []);

  //   useEffect(() => {
  //     console.log("sadasd")
  //     const serviceFilter = `"service": {"like": "${transactionFilter.status}"}`;
  //     const tranTimeFilter = transactionFilter.tranTime === "" ? "" : `,transaction_time": {"equal": "${transactionFilter.tranTime}"}`;
  //     var filter = "";
  //     if(serviceFilter !== "" || tranTimeFilter !== ""){
  //       filter = `filter={${serviceFilter}}`;
  //     }
  //     dispatch(actions.actFetchDataTransactionsFilterRequest(filter));
  //   }, [transactionFilter.status]);

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

  //   const onDeleteTransaction = (id) => {
  //     dispatch(actions.actDeleteTransactionRequest(id));
  //   };

  //   const getTransaction = (transaction) => {
  //     dispatch(actions.getTransaction(transaction));
  //     dispatch(actions.onToggleModal());
  //   };

  const refreshData = () => {
    dispatch(actions.actFetchDataTransactionsRequest());
    setTransactionFilter({
      movieName: "",
      cinemaName: "",
      status: "",
      startTime: null,
      endTime:null
    });
  };

  //   const handleChangeStatus = (e) => {
  //     setTransactionFilter({
  //       ...transactionFilter,
  //       status: (e.target.value)
  //     });
  //   }

  const searchTransactionQuery = (e) => {
    e.preventDefault();
    if(transactionFilter.startTime !== null && transactionFilter.endTime !== null){
      var filter = `startDate=${transactionFilter.startTime}&endDate=${transactionFilter.endTime}`;
      dispatch(actions.actFetchDataTransactionsFilterRequest(filter));
    }
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <Loader show={loading} message={"Loading......."}>
      <div class={"row " + classes.searchBar}>
        <div class="col-xl-12 col-12 mb-xl-0 pr-0" >
          <div className="">
            <div
              className="col-12"
              style={{
                boxShadow:
                "1px 2px 5px #999",
                backgroundColor: "white",
                borderRadius: "4px",
              }}
            >
              <form class="form-inline" onSubmit={searchTransactionQuery}>
                <div class="form-group mb-4 mr-5">
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="dd-MM-yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Từ ngày"
                      value={transactionFilter.startTime}
                      onChange={(date) => {setTransactionFilter({
                        ...transactionFilter,
                        startTime: moment(date).format('MM-DD-YYYY')
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
                      label="Đến ngày"
                      value={transactionFilter.endTime}
                      onChange={(date) => {setTransactionFilter({
                        ...transactionFilter,
                        endTime: moment(date).format('MM-DD-YYYY')
                      })}}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </div>

                <div class="form-group mb-2">
                  <button type="submit" className="btn btn-primary">
                    <SearchIcon>Tìm kiếm</SearchIcon>
                  </button>
                  &nbsp;
                  <button
                    className="btn btn-warning"
                    onClick={() => {
                      refreshData();
                    }}
                  >
                    <RefreshIcon color="secondary">Làm mới</RefreshIcon>
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
                        const status = row.isActive ? " khóa" : " kích hoạt";
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
                              {row.ticket.seat.row + row.ticket.seat.column}
                            </TableCell>
                            <TableCell align="left">{row.price}</TableCell>
                            <TableCell align="left">{row.user.name}</TableCell>
                            <TableCell align="left">
                              {row.transaction_time.slice(0, 10)}
                            </TableCell>
                            <TableCell align="left">{row.service}</TableCell>
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
    </Loader>
  );
}