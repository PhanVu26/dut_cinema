import { render } from "@testing-library/react";
import React, {Component, useEffect} from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import * as actions from '../../actions/userManager/userAction'
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";

import testAvatar from '../../assets/images/avatar.jpg';
import { useDispatch, useSelector } from "react-redux";

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  }));
  
  export default function SimpleTabs() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [value, setValue] = React.useState(0);
    const [user, setUser] = React.useState({})
    const [password, setPassword] = React.useState({})
    const userEditing = useSelector(state => state.userEditing)
    
    useEffect(() => {
      setUser(userEditing)
    })
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const updateProfile = (e) => {
      e.preventDefault()
      dispatch(actions.actUpdateUserRequest(user))

    }
    const changePassword = (e) => {
      e.preventDefault()
    }

    const onHanndleChangeInfo = (e) =>{
      const {name, value} = e.target;
      console.log(user)
      setUser({...user,[name]: value})
    }
    const onHanndleChangePassword = (e) =>{
      const {name, value} = e.target;
      console.log(password)
      setPassword({...password,[name]: value})
    }
    return (
        <section>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-10 col-lg-9 col-md-8 ml-auto">
                        <Container fluid className="mt-5">
                            <Row>
                            <Col md="4">
                                <Card className="card-user">
                                <div className="card-image mt-2">
                                    <h4>My Profile</h4>
                                </div>
                                <Card.Body>
                                    <div className="author">
                                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                        <img
                                        alt="..."
                                        className="avatar border-gray"
                                        width="100px"
                                        height="100px"
                                        src={testAvatar}
                                        ></img>
                                        <h5 className="title mt-2">Phan Vũ</h5>
                                    </a>
                                    <p className="email">vu@gmail.com</p>
                                    <p className="phone">0967139958</p>
                                    <p className="address">Gia Lai-Việt Nam</p>
                                    </div>
                                    
                                </Card.Body>
                                <hr></hr>
                                <div className="button-container mr-auto ml-auto">
                                    <Button
                                    className="btn-simple btn-icon"
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                    variant="link"
                                    >
                                    <i className="fab fa-facebook-square"></i>
                                    </Button>
                                    <Button
                                    className="btn-simple btn-icon"
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                    variant="link"
                                    >
                                    <i className="fab fa-twitter"></i>
                                    </Button>
                                    <Button
                                    className="btn-simple btn-icon"
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                    variant="link"
                                    >
                                    <i className="fab fa-google-plus-square"></i>
                                    </Button>
                                </div>
                                </Card>
                            </Col>    
                            <Col md="8">
                                <Card>
                                
                                <Card.Body>
                                <AppBar position="static">
                                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                                    <Tab label="My profile" {...a11yProps(0)} />
                                    <Tab label="Change password" {...a11yProps(1)} />
                                    </Tabs>
                                </AppBar>
                                <TabPanel value={value} index={0}>
                                <form>
                                    <div className="form-group row">
                                        <label for="email">Email address</label>
                                        <input 
                                          type="email" 
                                          className="form-control" 
                                          id="email" 
                                          name="email"
                                          onChange={onHanndleChangeInfo}
                                          placeholder="Enter email"
                                          value={user.email}></input>
                                    </div>
                                    <div className="form-group row">
                                        <label for="name">Name</label>
                                        <input 
                                          type="text" 
                                          className="form-control" 
                                          id="name" 
                                          name="name"
                                          value={user.name}
                                          onChange={onHanndleChangeInfo}
                                          placeholder="Enter Name"></input>
                                    </div>
                                    <div className="form-group row">
                                        <label for="age">Age</label>
                                        <input 
                                          type="number" 
                                          className="form-control" 
                                          id="age" 
                                          name="age"
                                          onChange={onHanndleChangeInfo}
                                          value={user.age}
                                          placeholder="Enter age"></input>
                                    </div>
                                    <div className="form-group row">
                                        <label for="address">Address</label>
                                        <input 
                                          type="text" 
                                          className="form-control" 
                                          id="address" 
                                          value="Đà Nẵng"
                                          placeholder="Enter address"></input>
                                    </div>
                                    <div className="form-group row">
                                        <label for="phone">Phone number</label>
                                        <input 
                                          type="number" 
                                          className="form-control" 
                                          id="phone"
                                          value="0967139956" 
                                          placeholder="Enter phone number"></input>
                                    </div>
                                    <button 
                                      type="submit" 
                                      onClick={updateProfile}
                                      className="btn btn-primary">Update</button>
                                    </form>
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    <form>
                                        <div className="form-group row">
                                            <label for="oldPassword">Old password</label>
                                            <input 
                                              type="password" 
                                              className="form-control" 
                                              id="oldPassword" 
                                              name="oldPassword"
                                              onChange={onHanndleChangePassword}
                                              value={password.oldPassword}
                                              placeholder="Enter old password"></input>
                                        </div>
                                        <div className="form-group row">
                                            <label for="newPassword">New password</label>
                                            <input 
                                              type="password" 
                                              name="newPassword"
                                              className="form-control" 
                                              id="newPassword" 
                                              onChange={onHanndleChangePassword}
                                              value= {password.newPassword}
                                              placeholder="Enter new password"></input>
                                        </div>
                                        <div className="form-group row">
                                            <label for="rePassword">Repeate Password</label>
                                            <input 
                                              type="password" 
                                              name="rePassword"
                                              className="form-control" 
                                              id="rePassword" 
                                              onChange={onHanndleChangePassword}
                                              value={password.rePassword}
                                              aria-describedby="checkRePass"
                                              placeholder="Repeate your password"></input>
                                              <small id="checkRePass" className="form-text text-warning">{password.newPassword !== password.rePassword ? "Mật khẩu không trùng khớp":""}</small>
                                        </div>
                                        
                                        <button type="submit" onClick={changePassword} className="btn btn-primary">Change</button>
                                    </form>
                                </TabPanel>
                                
                                </Card.Body>
                                </Card>
                            </Col>
                            
                            </Row>
                        </Container>
                    </div>    
                </div>
            </div>    
        </section>            
    )      
  }