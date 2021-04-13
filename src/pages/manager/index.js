import React, {Component} from 'react';
import {
    BrowserRouter as Router, Route, Switch,
  } from "react-router-dom";

import Footer from '../../components/admin/Footer/Footer';
import Navbar from '../../components/manager/Navbar/Navbar';
import MovieManager from './movie manager/index';
import ActorManager from './ActorManager/index';

class ManagerPage extends Component{
    constructor(props) {
        super(props);
      }
      
    render(){
        return (
            <Router>
                <Navbar></Navbar>        
                <Switch>
                    <Route path="/manager/movies" exact component={MovieManager}></Route>  
                    <Route path="/manager/actors" exact component={ActorManager}></Route>  
                </Switch>    
                <Footer></Footer>
            </Router>
                
        )
    }
}


export default ManagerPage;