import React, { useEffect, useState } from "react";
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
import * as showtimeActions from "../../../actions/showtimeManager/index";
import { Link } from "react-router-dom";

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
  { id: "day", numeric: false, disablePadding: false, label: "Ngày" },
  { id: "startTime", numeric: false, disablePadding: false, label: "Bắt đầu" },
  { id: "endTime", numeric: false, disablePadding: false, label: "Kết thúc" },
  { id: "movieName", numeric: false, disablePadding: false, label: "Tên phim" },
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
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const rows = useSelector((state) => state.reducerShowTime.allShowtimes);

  //   var rows = [...users];
  //   if(role !== -1){
  //     rows = users.filter((user) => {
  //         return user.userRoles.some(role => {
  //             return role.role.id == role
  //         })
  //     })
  // }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showtimeActions.actFetchCinemaRequest());
    dispatch(showtimeActions.actFetchAllShowtimesRequest());
    console.log("userss", rows);
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

  const showUserRole = (userRoles) => {
    const rs = userRoles?.map((role, index) => {
      return role.role.name;
    });
    return rs?.toString();
  };

  const onDeleteShowtime = (id) => {
    showtimeActions.actDeleteShowtimeRequest(id);
    dispatch(showtimeActions.actFetchAllShowtimesRequest());
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <section style={{ backgroundColor: "#f3f3f4" }}>
      <div class="container-fluid">
        <div class="row">
          <div class="col-xl-10 col-lg-9 col-md-8 ml-auto">
            <div class={"row " + classes.searchBar}>
              <div class="col-xl-12 col-12 mb-xl-0 row">
                <h3 class="text-left mb-2 pt-3">Danh sách lịch chiếu</h3>
                <Link
                  to={(location) => {
                    let path = location.pathname;
                    if (
                      path === "/showtime-manager/movie-showtimes" ||
                      path === "/admin/movie-showtimes"
                    ) {
                      path += "/add";
                    }
                    return path;
                  }}
                  align="right"
                  class="text-left mb-2 pt-3 col-3"
                >
                  <button type="button" className="btn btn-warning">
                    <span className="fa fa-pencil mr-2"></span>
                    Thêm
                  </button>
                </Link>
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
                                    {row.startTime.slice(0, 10)}
                                  </TableCell>
                                  <TableCell align="left">
                                    {row.startTime.slice(11, 16)}
                                  </TableCell>
                                  <TableCell align="left">
                                    {row.endTime.slice(11, 16)}
                                  </TableCell>
                                  <TableCell align="left">
                                    {row.movie.name}
                                  </TableCell>
                                  <TableCell>
                                    <button
                                      type="button"
                                      className="btn btn-danger"
                                      onClick={() => {
                                        if (
                                          window.confirm(
                                            "Bạn có muốn xóa lịch chiếu này?"
                                          )
                                        ) {
                                          onDeleteShowtime(row.id);
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
                              style={{
                                height: (dense ? 33 : 53) * emptyRows,
                              }}
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
                      onChangePage={handleChangePage}
                      onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                  </Paper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
