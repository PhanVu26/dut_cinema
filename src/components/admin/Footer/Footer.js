import React from "react";

const Footer = (props) =>{

    return (
        <footer className="bg-dark text-white">
            <div className="container-fluid mt-2">
                <div className="row">
                    <div className="col-xl-10 col-lg-9 col-md-8 ml-auto">
                        <div className="row">
                            <div className="col-lg-6 pt-3">
                                <ul className="list-inline">
                                    <li className="list-inline-item mr-2">
                                        <a href="#" className="text-white">T2Team</a>
                                    </li>
                                    <li className="list-inline-item mr-2">
                                        <a href="#" className="text-white">Contact</a>
                                    </li>
                                    <li className="list-inline-item mr-2">
                                        <a href="" className="text-white">Support</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-lg-6 text-center pt-3">
                                <p>&copy; 2021 Made with <i className="fas fa-heart text-danger"></i> By <span
                                    className="text-success"></span> T2Team</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );    
}

export default Footer;