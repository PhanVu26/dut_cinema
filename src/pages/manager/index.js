import React, {Component} from 'react';
import {
    BrowserRouter as Router, Route, Switch,
  } from "react-router-dom";

import MovieManager from './MovieManager/index';
import ActorManager from './ActorManager/index';
import Navbar from '../../components/manager/Navbar/Navbar';
import Footer from '../../components/manager/Footer/Footer';
import UserProfile from '../UserProfile/UserProfile';

class ManagerPage extends Component{
    constructor(props) {
        super(props);
      }
      
    render(){
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