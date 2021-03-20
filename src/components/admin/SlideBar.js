import React from "react"

const SlideBar = (props) => {
    return (          
        <div className="col-xl-2 col-lg-3 col-md-4 sidebar fixed-top sidebar-side">
            <a href="#" className="navbar-brand text-white mx-auto text-center bottom-border py-3 mb-4 d-block">Admin</a>
            <div className="bottom-border text-center">
                <img src="https://images.pexels.com/photos/532220/pexels-photo-532220.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=640"
                    width="50" className="rounded-circle" alt="" />
                <a href="" className="text-white">Phan Vũ</a>
            </div>
            <ul className="navbar-nav mt-4 flex-column ">
                <li className="nav-item ">
                    <a href="#" className="nav-link text-white p-2 mb-2 current"><i
                        className="fas fa-home fa-lg mr-3 text-white"></i>DashBoard</a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link text-white p-2 mb-2 sidebar-link"><i
                        className="fas fa-user fa-lg mr-4 text-white"></i>Profile</a>
                </li>
                <li className="nav-item">
                    <a href="" className="nav-link text-white p-2 mb-2 sidebar-link"><i
                        className="fas fa-envelope fa-lg mr-4 text-white"></i>Users</a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link p-2 mb-2 sidebar-link text-white"><i
                        className="fas fa-shopping-cart fa-lg text-white mr-4"></i>Sales</a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link text-white p-2 mb-2 sidebar-link"><i
                        className="fas fa-chart-line fa-lg mr-3 text-white"></i>Analystics</a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link text-white p-2 mb-2 sidebar-link"><i
                        className="fas fa-chart-bar fa-lg mr-4 text-white"></i>Charts</a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link p-2 mb-2 sidebar-link text-white"><i
                        className="fas fa-wrench fa-lg text-white mr-4"></i>Settings</a>
                </li>
            </ul>
        </div>
                        
    )
}

export default SlideBar;