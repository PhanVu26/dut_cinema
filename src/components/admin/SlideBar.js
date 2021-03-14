import React from "react"

const SlideBar = (props) => {
    return (          
        <div class="col-xl-2 col-lg-3 col-md-4 sidebar fixed-top sidebar-side">
            <a href="#" class="navbar-brand text-white mx-auto text-center bottom-border py-3 mb-4 d-block">Code And
    Create</a>
            <div class="bottom-border text-center">
                <img src="https://images.pexels.com/photos/532220/pexels-photo-532220.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    width="50" class="rounded-circle" alt="" />
                <a href="" class="text-white">Joshua D'Souza</a>
            </div>
            <ul class="navbar-nav mt-4 flex-column ">
                <li class="nav-item ">
                    <a href="#" class="nav-link text-white p-2 mb-2 current"><i
                        class="fas fa-home fa-lg mr-3 text-white"></i>DashBoard</a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link text-white p-2 mb-2 sidebar-link"><i
                        class="fas fa-user fa-lg mr-4 text-white"></i>Profile</a>
                </li>
                <li class="nav-item">
                    <a href="" class="nav-link text-white p-2 mb-2 sidebar-link"><i
                        class="fas fa-envelope fa-lg mr-4 text-white"></i>Message</a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link p-2 mb-2 sidebar-link text-white"><i
                        class="fas fa-shopping-cart fa-lg text-white mr-4"></i>Sales</a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link text-white p-2 mb-2 sidebar-link"><i
                        class="fas fa-chart-line fa-lg mr-3 text-white"></i>Analystics</a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link text-white p-2 mb-2 sidebar-link"><i
                        class="fas fa-chart-bar fa-lg mr-4 text-white"></i>Charts</a>
                </li>
                <li class="nav-item">
                    <a href="" class="nav-link text-white p-2 mb-2 sidebar-link"><i
                        class="fas fa-table fa-lg mr-4 text-white"></i>Tables</a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link p-2 mb-2 sidebar-link text-white"><i
                        class="fas fa-wrench fa-lg text-white mr-4"></i>Settings</a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link p-2 mb-2 sidebar-link text-white"><i
                        class="fas fa-file-alt fa-lg text-white mr-4"></i>Documentation</a>
                </li>
            </ul>
        </div>
                        
    )
}

export default SlideBar;