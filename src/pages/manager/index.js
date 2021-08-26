import React, {Component} from 'react';
import {
    BrowserRouter as Router, Redirect, Route, Switch,
  } from "react-router-dom";

import MovieManager from './MovieManager/index';
import MoviesPage from './MovieManager/MoviesPage';
import ActorManager from './ActorManager/index';
import ActorsPage from './ActorManager/ActorsPage';
import UserProfile from '../UserProfile/UserProfile';
import Navbar from '../../components/admin/Navbar/Navbar';
import Footer from '../../components/admin/Footer/Footer';
import NotFoundPage from '../error/404/NotFoundPage';

class ManagerPage extends Component{
    constructor(props) {
        super(props);
      }
      
    render(){
        const account = JSON.parse(localStorage.getItem("account"));
        if(account.roleName !== "Movie Manager"){
            window.location.href = "/403";
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
                    <Route path="/manager" exact component={UserProfile}></Route> 
                    <Route path="/manager/movies" exact component={MoviesPage}></Route>  
                    <Route path="/manager/actors" exact component={ActorsPage}></Route>  
                    <Route path="/manager/profile" exact component={UserProfile}></Route>  
                    <Route path='/manager/404' component={NotFoundPage} />
                    <Redirect from='*' to='/manager/404' />
                    <Route path='*' exact={true} component={NotFoundPage} />
            </Switch>
            <Footer></Footer>
        </Router>
                
        )
    }
}


export default ManagerPage;