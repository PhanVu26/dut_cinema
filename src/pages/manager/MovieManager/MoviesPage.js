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
import { NavLink } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import HomeIcon from '@material-ui/icons/Home';
import GrainIcon from '@material-ui/icons/Grain';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import * as actions from "../../../actions/movieManager/index";
import * as actorActions from '../../../actions/actorManager/index';
import MovieControl from "../../../components/Control/MovieControl/MovieControl";
import RefreshIcon from "@material-ui/icons/Refresh";
import SearchIcon from "@material-ui/icons/Search";
import MovieForm from "../../../components/Modal/MovieModal/MovieForm";
import MovieDetail from "../../../components/Modal/MovieModal/MovieDetail";

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
  { id: "name", numeric: false, disablePadding: false, label: "Tên phim" },
  { id: "image", numeric: false, disablePadding: false, label: "Hình ảnh" },
  { id: "genres", numeric: false, disablePadding: false, label: "Thể loại" },
  { id: "country", numeric: false, disablePadding: false, label: "Quốc gia" },
  {
    id: "producer",
    numeric: false,
    disablePadding: false,
    label: "Nhà sản xuất",
  },
  {
    id: "releaseDate",
    numeric: false,
    disablePadding: false,
    label: "Ngày phát hành",
  },
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
  container: {
    maxHeight: 280
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
  const [movieFilter, setMovieFilter] = React.useState({
    movieName:"",
    producer:"",
    genre:""
  });
  const [dense, setDense] = React.useState(false);
  const loading = useSelector((state) => state.movies.loading);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const rows = useSelector((state) => state.movies.movies);
  const genres = useSelector((state) => state.genres.genres);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.actFetchDataMoviesRequest());
    dispatch(actions.actFetchDataGenresRequest());
    dispatch(actorActions.actFetchDataActorsRequest());
  }, []);

  useEffect(() => {
    var filter = `filter={"name": {"like": "${movieFilter.movieName}"}, "producer": {"like": "${movieFilter.producer}"}}`;
    if(movieFilter.genre !== ""){
      filter = filter + `&genreId=${movieFilter.genre}`;
    }
    dispatch(actions.actFetchDataMoviesFilterRequest(filter));
  }, [movieFilter.genre]);

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

  const onDeleteMovie = (id) => {
    dispatch(actions.actDeleteMovieRequest(id));
  };

  const getMovieEditing = (id) => {
    dispatch(actions.getMovieRequest(id));
    dispatch(actions.toggleMovieForm());
  };

  const refreshData = () => {
    dispatch(actions.actFetchDataMoviesRequest());
    setMovieFilter({movieName: "", producer: "", genre: ""});
  };

  const searchMovieQuery = (e) => {
    e.preventDefault();
    var filter = `filter={"name": {"like": "${movieFilter.movieName}"}, "producer": {"like": "${movieFilter.producer}"}}`;
    if(movieFilter.genre !== ""){
      filter = filter + `&genreId=${movieFilter.genre}`;
    }
    dispatch(actions.actFetchDataMoviesFilterRequest(filter));
  };

  const showGenres = (genres) => {
    var result = null;
    result = genres?.map((genre) => {
      return <li key={genre.id}>{genre.name}</li>;
    });
    return result;
  };

  const showMenuItemGenre = () => {
    
    var result = null;
    result = genres?.map((genre) => {
      return <MenuItem value={genre.id}>{genre.name}</MenuItem>;
    });
    return result;
  }

  const getMovie = (id) => {
    dispatch(actions.getMovieRequest(id));
    dispatch(actions.toggleModal());
  }
  const onChangeGenre = (e) => {
    setMovieFilter({
      ...movieFilter, 
      genre: e.target.value
    });
  }
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <Loader show={loading} message={"Loading......."}>
      <section style={{ backgroundColor: "#f3f3f4" }}>
        <MovieForm></MovieForm>
        <MovieDetail></MovieDetail>
        <div class="container-fluid">
          <div class="row">
            <div class="col-xl-10 col-lg-9 col-md-8 ml-auto">
              <div class={"row " + classes.searchBar}>
                <div class="col-xl-12 col-12 mb-xl-0">
                <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumb}>
                    <NavLink           
                      to=""         
                      className={classes.link}
                    >
                      <HomeIcon className={classes.icon} />
                      Trang chủ
                    </NavLink>
                    <Typography color="textPrimary" className={classes.link}>
                      <GrainIcon className={classes.icon} />
                      Quản lý phim
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
                        onSubmit={searchMovieQuery}
                      >
                        <div class="form-group mb-2 mr-5">
                          <lable>Tên phim:</lable>&nbsp;
                          <input
                            className="form-control"
                            placeholder="Nhập tên phim"
                            value={movieFilter.movieName}
                            onChange={(e) => {
                              setMovieFilter({...movieFilter, movieName: e.target.value});
                            }}
                          ></input>
                        </div>
                        <div class="form-group mb-2 mr-5">
                          <lable>Nhà sản xuất:</lable>&nbsp;
                          <input
                            className="form-control"
                            placeholder="Nhập tên nhà sản xuất"
                            value={movieFilter.producer}
                            onChange={(e) => {
                              setMovieFilter({...movieFilter, producer: e.target.value});
                            }}
                          ></input>
                        </div>
                        <div class="form-group mb-4 mr-5">
                          <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-helper-label">
                              Thể loại
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-helper-label"
                              id="demo-simple-select-helper"
                              value={movieFilter.genre}
                              onChange={onChangeGenre}
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              {showMenuItemGenre(genres)}
                            </Select>
                          </FormControl>
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
                    <MovieControl></MovieControl>
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
                                      padding="20px"
                                    >
                                      {row.id}
                                    </TableCell>
                                    <TableCell align="left">
                                      {row.name}
                                    </TableCell>
                                    <TableCell align="left">
                                      <img
                                        src={row.image?.mainUrl}
                                        height="30px"
                                        width="30px"
                                      ></img>
                                    </TableCell>
                                    <TableCell align="left">
                                      <ul className="list-unstyled">
                                        {showGenres(row.genres)}
                                      </ul>
                                    </TableCell>
                                    <TableCell align="left">
                                      {row.country}
                                    </TableCell>
                                    <TableCell align="left">
                                      {row.producer}
                                    </TableCell>
                                    <TableCell align="left">
                                      {row.releaseDate}
                                    </TableCell>

                                    <TableCell>
                                      <button
                                        type="button"
                                        className="btn btn-warning"
                                        onClick={() => getMovieEditing(row.id)}
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
                                              "Bạn có muốn xóa phim này?"
                                            )
                                          ) {
                                            onDeleteMovie(row.id);
                                          }
                                        }}
                                      >
                                        <span className="far fa-trash-alt"></span>
                                      </button>
                                      &nbsp;
                                      <button
                                        type="button"
                                        onClick={() => getMovie(row.id)}
                                        className="btn btn-primary"
                                      >
                                        <span className="far fa-eye"></span>
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
