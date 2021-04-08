import React from "react";

const Footer = (props) =>{

    return (
        <footer class="bg-dark text-white">
            <div class="container-fluid mt-2">
                <div class="row">
                    <div class="col-xl-10 col-lg-9 col-md-8 ml-auto">
                        <div class="row">
                            <div class="col-lg-6 pt-3">
                                <ul class="list-inline">
                                    <li class="list-inline-item mr-2">
                                        <a href="#" class="text-white">T2Team</a>
                                    </li>
                                    <li class="list-inline-item mr-2">
                                        <a href="#" class="text-white">Contact</a>
                                    </li>
                                    <li class="list-inline-item mr-2">
                                        <a href="" class="text-white">Support</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="col-lg-6 text-center pt-3">
                                <p>&copy; 2021 Made with <i class="fas fa-heart text-danger"></i> By <span
                                    class="text-success"></span> T2Team</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );    
}

export default Footer;