import React from "react";

import AccountControl from "./AccountControl";
import AccountForm from "./AccountForm";
import AccountList from "./AccountList";

const AccountManagement  = (props) => {
    return (
        <section>
            <div class="container-fluid mt-5">
                <div class="row">                   
                    <div class="col-xl-10 col-lg-9 col-md-8 ml-auto">
                        <div class="row ">
                            <div class="col-xl-12 col-12 mb-4 mb-xl-0">
                                <h2 class="text-muted text-center mb-5">Danh sách người dùng</h2>
                                <AccountControl></AccountControl>
                                <AccountList></AccountList>
                                <ul class="pagination justify-content-center">
                                    <li class="page-item">
                                        <a href="#" class="page-link px-3 py-2">
                                            <span>&laquo;</span>
                                        </a>
                                    </li>
                                    <li class="page-item active"><a href="#" class="page-link py-2 px-3">1</a></li>
                                    <li class="page-item"><a href="#" class="page-link py-2 px-3">2</a></li>
                                    <li class="page-item"><a href="#" class="page-link py-2 px-3">3</a></li>
                                    <li class="page-item"><a href="#" class="page-link py-2 px-3">4</a></li>
                                    <li class="page-link"><a href="#" class="page-item py-2 px-3">
                                        <span>&raquo;</span>
                                    </a></li>
                                </ul>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </section> 
    );
};    

export default AccountManagement;
