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
import Loader from "react-loader-advanced";

import * as actions from "../../actions/cinemaAction/index";
import CinemaControl from "../../components/Control/CinemaControl/CinemaControl";
import RefreshIcon from "@material-ui/icons/Refresh";
import SearchIcon from "@material-ui/icons/Search";
import CinemaForm from "../../components/Modal/CinemaModal/CinemaForm";
import { NavLink } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import GrainIcon from '@material-ui/icons/Grain';

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
  { id: "id", numeric: false, disablePadding: true, label: "ID" },
  { id: "name", numeric: false, disablePadding: false, label: "T??n r???p chi???u" },
  { id: "address", numeric: false, disablePadding: false, label: "?????a ch???" },
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
            align="center"
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
        <TableCell align="center">H??nh ?????ng</TableCell>
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
}));

function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("id");
  const [page, setPage] = React.useState(0);
  const [cinemaFilter, setCinemaFilter] = React.useState({});
  const [dense, setDense] = React.useState(false);
  const loading = useSelector((state) => state.cinemas.loading);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const rows = useSelector((state) => state.cinemas.cinemas);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.actFetchDataCinemasRequest());
  }, []);

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

  const onDeleteCinema = (id) => {
    dispatch(actions.actDeleteCinemaRequest(id));
  };

  const getCinemaEditing = (id) => {
    dispatch(actions.actGetCinemaRequest(id));
    dispatch(actions.toggleModal());
  };

  const refreshData = () => {
    dispatch(actions.actFetchDataCinemasRequest());
    setCinemaFilter({ name: "", address: "" });
  };

  const searchCinemaQuery = (e) => {
    e.preventDefault();
    const filter = `filter={"name": {"like": "${cinemaFilter.name}"}, "address": { "like": "${cinemaFilter.address}"}}`;
    dispatch(actions.actFetchDataCinemasFilterRequest(filter));
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <Loader show={loading} message={"Loading......."}>
      <section style={{ backgroundColor: "#f3f3f4" }}>
        <CinemaForm></CinemaForm>
        <div class="container-fluid">
          <div class="row">
            <div class="col-xl-10 col-lg-9 col-md-8 ml-auto">
              <div class={"row " + classes.searchBar}>
                <div class="col-xl-12 col-12 mb-xl-0">
                  {/* <h3 class="text-left mb-2 pt-3">Qu???n l?? r???p chi???u</h3> */}
                  <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumb}>
                    <NavLink
                      
                      to={"/admin"}
                      
                      className={classes.link}
                    >
                      <HomeIcon className={classes.icon} />
                      Trang ch???
                    </NavLink>
                    <Typography color="textPrimary" className={classes.link}>
                      <GrainIcon className={classes.icon} />
                      R???p chi???u
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
                        class="form-inline pt-3 pb-3"
                        onSubmit={searchCinemaQuery}
                      >
                        <div class="form-group mb-2 mr-5">
                          <lable>T??n r???p:</lable>&nbsp;
                          <input
                            className="form-control"
                            placeholder="Nh???p t??n r???p"
                            value={cinemaFilter.name}
                            onChange={(e) => {
                              setCinemaFilter({
                                ...cinemaFilter,
                                name: e.target.value,
                              });
                            }}
                          ></input>
                        </div>
                        <div class="form-group mb-2 mr-5">
                          <lable>?????a ch???:</lable>&nbsp;
                          <input
                            className="form-control"
                            placeholder="Nh???p ?????a ch???"
                            value={cinemaFilter.address}
                            onChange={(e) => {
                              setCinemaFilter({
                                ...cinemaFilter,
                                address: e.target.value,
                              });
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
                  <div className={classes.root}>
                    <CinemaControl></CinemaControl>
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
                                return (
                                  <TableRow>
                                    <TableCell
                                      component="th"
                                      id={labelId}
                                      scope="row"
                                      align="center"
                                    >
                                      {row.id}
                                    </TableCell>
                                    <TableCell align="center">
                                      {row.name}
                                    </TableCell>
                                    <TableCell align="center">
                                      {row.address}
                                    </TableCell>

                                    <TableCell align="center">
                                      <button
                                        type="button"
                                        className="btn btn-warning"
                                        onClick={() => getCinemaEditing(row.id)}
                                      >
                                        <span className="fa fa-pencil"></span>
                                      </button>
                                      &nbsp;
                                      <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => {
                                          if (
                                            window.confirm(
                                              "B???n c?? mu???n x??a cinema n??y?"
                                            )
                                          ) {
                                            onDeleteCinema(row.id);
                                          }
                                        }}
                                      >
                                        <span className="far fa-trash-alt"></span>
                                      </button>
                                      &nbsp;
                                      <NavLink
                                        to={{
                                          pathname:
                                            "/admin/cinemas/" +
                                            row.id +
                                            "/rooms",
                                          cinemaId: row.id,
                                        }}
                                      >
                                        <button
                                          type="button"
                                          className="btn btn-primary"
                                          // onClick={this.getcinemaInfo}
                                        >
                                          <span className="fas fa-eye">
                                            DS ph??ng
                                          </span>
                                        </button>
                                      </NavLink>
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
