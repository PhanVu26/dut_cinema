import React, { useEffect, useState } from "react";
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
import { NavLink } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import HomeIcon from '@material-ui/icons/Home';
import GrainIcon from '@material-ui/icons/Grain';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import * as userActions from "../../actions/userManager/userAction";
import UserControl from "../../components/Control/UserControl/UserControl";
import RefreshIcon from '@material-ui/icons/Refresh';
import SearchIcon from '@material-ui/icons/Search';

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
  { id: "name", numeric: false, disablePadding: false, label: "Name" },
  { id: "email", numeric: false, disablePadding: false, label: "Email" },
  { id: "age", numeric: false, disablePadding: false, label: "Tu???i" },
  { id: "userRoles", numeric: false, disablePadding: false, label: "Vai tr??" },
  {
    id: "isActive",
    numeric: false,
    disablePadding: false,
    label: "Tr???ng th??i",
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
  const [userFilter, setUserFilter] = React.useState({
    name:"",
    email:"",
    role:""
  })
  const [dense, setDense] = React.useState(false);
  const loading = useSelector((state) => state.users.loading);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const rows = useSelector((state) => state.users.users);
  const roles = useSelector((state) => state.roles)


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userActions.actFetchDataUsersRequest());
    dispatch(userActions.actFetchDataRolesRequest());
    
  }, []);

  useEffect(() => {
    var filter = `filter={"name": {"like": "${userFilter.name}"}, "email": {"like": "${userFilter.email}"}}`;
    if(userFilter.role !== ""){
      filter = filter + `&roleName=${userFilter.role}`;
    }
    dispatch(userActions.actFetchDataUsersFilterRequest(filter));
  }, [userFilter.role]);

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

  const showUserRole = (userRoles) => {
    const rs = userRoles?.map((role, index) => {
      return role.role.name;
    });
    return rs?.toString();
  };

  const toggleUserStatus = (user) => {
    const userUpdate = {
      id: user.id,
      isActive: !user.isActive,
    };
    dispatch(userActions.actUpdateUserStatusRequest(userUpdate));
  };

  const onDeleteUser = (id) => {
    dispatch(userActions.actDeleteUserRequest(id));
  };

  const getUserEditing = (id) => {
    dispatch(userActions.actGetUserRequest(id));
    dispatch(userActions.toggleUserForm());
  };

  const refreshData = () => {
    dispatch(userActions.actFetchDataUsersRequest());
    setUserFilter({
      ...userFilter,
      name:"",
      email: "",
      role: ""
    })
  }

  const searchUserQuery = (e) => {
    e.preventDefault();
    var filter = `filter={"name": {"like": "${userFilter.name}"}, "email": {"like": "${userFilter.email}"}}`;
    if(userFilter.role !== ""){
      filter = filter + `&roleName=${userFilter.role}`;
    }
    dispatch(userActions.actFetchDataUsersFilterRequest(filter));
  };

  const onChangeRole = (e) => {
    setUserFilter({
      ...userFilter, 
      role: e.target.value
    });

  }

  const showUserRoles = roles => {
    const userRoles = roles.filter(role =>{
        return role.name.toLowerCase() != "Admin".toLowerCase();
    })
    var result = null;
    if (userRoles.length > 0) {
      result = userRoles.map((role, index) => {
        return <MenuItem value={role.name} >{role.name}</MenuItem>;
      });
    }
    return result;
}

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <Loader show={loading} message={'Loading.......'}> 
    <section  style={{backgroundColor:"#f3f3f4"}}>
      <div class="container-fluid">
        <div class="row">
          <div class="col-xl-10 col-lg-9 col-md-8 ml-auto">
            <div class={"row " + classes.searchBar}>
              <div class="col-xl-12 col-12 mb-xl-0">
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
                      Ng?????i d??ng
                    </Typography>
                  </Breadcrumbs>
                <div className="mb-3 mt-3">
                  <div 
                    className="col-12" 
                    style={{boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)", 
                      backgroundColor:"white",
                      borderRadius: "4px"
                      }} >
                  <form 
                    class="form-inline" 
                    onSubmit={searchUserQuery}>
                    <div class="form-group mb-2 mr-5">
                      <lable>Name:</lable>&nbsp;
                      <input 
                        className="form-control"
                        placeholder="Nh???p t??n"
                        value= {userFilter.name}
                        onChange={e=> setUserFilter({...userFilter, name: e.target.value})}>                       
                        </input>
                    </div>
                    <div class="form-group mb-2 mr-5">
                      <lable>Email:</lable>&nbsp;
                      <input 
                        className="form-control"
                        placeholder="Nh???p Email"
                        value= {userFilter.email}
                        onChange={e=> {setUserFilter({...userFilter, email: e.target.value})}}>                       
                        </input>
                    </div>
                    <div class="form-group mb-4 mr-5">
                      <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-helper-label">
                          Vai tr??
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          value={userFilter.role}
                          onChange={onChangeRole}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {showUserRoles(roles)}
                        </Select>
                      </FormControl>
                    </div>
                    
                    <div class="form-group mb-2">
                      <button 
                        type="submit"
                        className="btn btn-primary"
                        ><SearchIcon>T??m ki???m</SearchIcon></button>&nbsp;
                      <button 
                        
                        className="btn btn-warning"
                        onClick={()=>{refreshData()}}
                      >
                        <RefreshIcon>
                        L??m m???i</RefreshIcon></button>
                    </div>
                  </form>
                  </div>
                  
                </div>
                <div className={classes.root}>
                <UserControl></UserControl>
                  <Paper className={classes.paper}>
                    <TableContainer className={classes.container}>
                      <Table stickyHeader aria-label="sticky table"
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? "small" : "small"}
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
                                  <TableCell align="left">{row.name}</TableCell>
                                  <TableCell align="left">
                                    {row.email}
                                  </TableCell>
                                  <TableCell align="left">{row.age}</TableCell>
                                  <TableCell align="left">
                                    {showUserRole(row.userRoles)}
                                  </TableCell>
                                  <TableCell align="left">
                                    <i
                                      className={
                                        row.isActive
                                          ? "fas fa-toggle-on"
                                          : "fas fa-toggle-off"
                                      }
                                      onClick={() => {
                                        if (
                                          window.confirm(
                                            "B???n c?? mu???n" +
                                              status +
                                              " user n??y?"
                                          )
                                        ) {
                                          toggleUserStatus(row);
                                        }
                                      }}
                                    ></i>
                                  </TableCell>
                                  <TableCell>
                                    <button
                                      type="button"
                                      className="btn btn-warning"
                                      onClick={() => getUserEditing(row.id)}
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
                                            "B???n c?? mu???n x??a user n??y?"
                                          )
                                        ) {
                                          onDeleteUser(row.id);
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
                              style={{ height: (dense ? 33 : 33) * emptyRows }}
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
