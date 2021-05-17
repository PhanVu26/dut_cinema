import React, {Component} from 'react';
import {
    BrowserRouter as Router, Route, Switch,
  } from "react-router-dom";

import MovieManager from './MovieManager/index';
import ActorManager from './ActorManager/index';
import UserProfile from '../UserProfile/UserProfile';
import Navbar from '../../components/admin/Navbar/Navbar';
import Footer from '../../components/admin/Footer/Footer';

class ManagerPage extends Component{
    constructor(props) {
        super(props);
      }
      
    render(){
        const account = JSON.parse(localStorage.getItem("account"));
        if(account.roleName !== "Movie Manager"){
            window.location.href = "/login";
        }
        return (
            // <Router>
            //     <Navbar></Navbar>        
            //     <Switch>
            //         <Route path="/manager/movies" exact component={MovieManager}></Route>  
            //         <Route path="/manager/actors" exact component={ActorManager}></Route>  
            //     </Switch>    
            //     <Footer></Footer>
            // </Router>
        <Router>
            <Navbar></Navbar>        
            <Switch>
                    <Route path="/manager/movies" exact component={MovieManager}></Route>  
                    <Route path="/manager/actors" exact component={ActorManager}></Route>  
                    <Route path="/manager/profile" exact component={UserProfile}></Route>  
            </Switch>
            <Footer></Footer>
        </Router>
                
        )
    }
}


export default ManagerPage;