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
import RefreshIcon from "@material-ui/icons/Refresh";
import SearchIcon from "@material-ui/icons/Search";
import { NavLink } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import HomeIcon from '@material-ui/icons/Home';
import GrainIcon from '@material-ui/icons/Grain';


function descendingComparator(a, b, orderBy) {
  try {
    let value1 = "",
      value2 = "";
    switch (orderBy) {
      case "id":
        value1 = a.id;
        value2 = b.id;
        break;
      case "day":
        value1 = a.id;
        value2 = b.id;
        break;
      case "startTime":
        value1 = a.startTime.slice(11, 16);
        value2 = b.startTime.slice(11, 16);
        break;
      case "endTime":
        value1 = a.endTime.slice(11, 16);
        value2 = b.endTime.slice(11, 16);
        break;
      case "movieName":
        value1 = a.movie.name;
        value2 = b.movie.name;
        break;
      case "cinema":
        value1 = a.room.cinema.name;
        value2 = b.room.cinema.name;
        break;
      case "room":
        value1 = a.room.roomNumber;
        value2 = b.room.roomNumber;
        break;
      default:
        value1 = a[orderBy];
        value2 = b[orderBy];
    }

    if (value2 < value1) {
      return -1;
    }
    if (value2 > value1) {
      return 1;
    }
    return 0;
  } catch (error) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
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
  { id: "day", numeric: false, disablePadding: false, label: "Ng??y" },
  { id: "startTime", numeric: false, disablePadding: false, label: "B???t ?????u" },
  { id: "endTime", numeric: false, disablePadding: false, label: "K???t th??c" },
  { id: "movieName", numeric: false, disablePadding: false, label: "T??n phim" },
  { id: "cinema", numeric: false, disablePadding: false, label: "R???p chi???u" },
  { id: "room", numeric: false, disablePadding: false, label: "Ph??ng chi???u" },
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
  container: {
    maxHeight: 281
  },
  link: {
    display: 'flex',
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
  breadcrumb: {
    height: '10px',
    backgroundColor: '#f3f3f4',
    paddingLeft: '0px'
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
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const rows = useSelector((state) => state.reducerShowTime.allShowtimes);
  const [name, setName] = React.useState("");
  const [cinema, setCinema] = React.useState("");
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
    // console.log("userss", rows);
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    // console.log("page", newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    // console.log("perpage", event.target.value);
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onDeleteShowtime = (id) => {
    showtimeActions.actDeleteShowtimeRequest(id);
    setTimeout(() => {
      dispatch(showtimeActions.actFetchAllShowtimesRequest());
    }, 500);
  };

  const refreshData = () => {
    dispatch(showtimeActions.actFetchAllShowtimesRequest());
    setName("");
    setCinema("");
  };

  const searchUserQuery = (e) => {
    e.preventDefault();
    const filterAns = rows.filter((row) => {
      if (
        row.movie.name.toLowerCase().includes(name.trim().toLowerCase()) &&
        row.room.cinema.name.toLowerCase().includes(cinema.trim().toLowerCase())
      ) {
        // console.log("search", row);
        return true;
      }
      return false;
    });
    const res = {
      results: filterAns,
      total: filterAns.length,
    };
    dispatch(showtimeActions.actFetchShowtimes(res));
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <section style={{ backgroundColor: "#f3f3f4" }}>
      <div class="container-fluid">
        <div class="row">
          <div class="col-xl-10 col-lg-9 col-md-8 ml-auto">
            <div class={"row " + classes.searchBar}>
              <div class="col-xl-12 col-12 mb-xl-0 ">
                <div class="row ml-1">
                  <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumb}>
                    <NavLink           
                      to={(location) => {
                        let path = location.pathname;
                        return "/" + path.split('/')[1];
                      }}         
                      className={classes.link}
                    >
                      <HomeIcon className={classes.icon} />
                      Trang ch???
                    </NavLink>
                    <Typography color="textPrimary" className={classes.link}>
                      <GrainIcon className={classes.icon} />
                      L???ch chi???u
                    </Typography>
                  </Breadcrumbs>
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
                      Th??m
                    </button>
                  </Link>
                </div>
                {/*--------------------------------------*/}

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
                      class="form-inline pt-3 pb-3"
                      onSubmit={searchUserQuery}
                    >
                      <div class="form-group mb-2 mr-5">
                        <lable style={{ marginRight: "20px" }}>
                          Movie Name:
                        </lable>
                        &nbsp;
                        <input
                          className="form-control"
                          placeholder="Nh???p t??n phim"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        ></input>
                      </div>
                      <div class="form-group mb-2 mr-5">
                        <lable style={{ marginRight: "20px" }}>Cinema:</lable>
                        &nbsp;
                        <input
                          className="form-control"
                          placeholder="Nh???p r???p chi???u"
                          value={cinema}
                          onChange={(e) => {
                            setCinema(e.target.value);
                          }}
                        ></input>
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

                {/*--------------------------------------*/}
                <div className={classes.root}>
                  <Paper className={classes.paper}>
                    <TableContainer className={classes.container}>
                      <Table
                        stickyHeader aria-label="sticky table"
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size="small"
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
                                  <TableCell align="left">
                                    {row.room.cinema.name}
                                  </TableCell>
                                  <TableCell align="left">
                                    Ph??ng {row.room.roomNumber}
                                  </TableCell>
                                  <TableCell>
                                    <button
                                      type="button"
                                      className="btn btn-danger"
                                      onClick={() => {
                                        if (
                                          window.confirm(
                                            "B???n c?? mu???n x??a l???ch chi???u n??y?"
                                          )
                                        ) {
                                          onDeleteShowtime(row.id);
                                        }
                                      }}
                                    >
                                      <span className="far fa-trash-alt mr-2"></span>
                                      X??a
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
