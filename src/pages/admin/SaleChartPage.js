import React, { Component } from "react";
import 'font-awesome/css/font-awesome.min.css';  
import 'bootstrap/dist/css/bootstrap.min.css';

import "../../components/admin/style.css";
import SalesChart from "../../components/admin/Chart/SalesChart";


class SaleChartPage extends Component{
    constructor(props) {
        super(props);
      }
      
    render(){
        
        return (
                <section>
                    
                    <div class="container-fluid mt-5">
                        <div class="row">                   
                            <div class="col-xl-10 col-lg-9 col-md-8 ml-auto">
                                <div class="row ">
                                    <div class="col-xl-12 col-12 mb-4 mb-xl-0">
                                        <SalesChart></SalesChart>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </section> 
                
        )
    }
}



export default SaleChartPage;