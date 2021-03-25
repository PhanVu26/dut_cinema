import React from "react";
import { Link } from "react-router-dom";


const Modal  = (props) => {
    return (
        <div class="modal fade" id="sign-out">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4>Want to leave?</h4>
                        <button class="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        Are You Sure
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-success" data-dismiss="modal">Save Changes</button>
                        <Link to="/login">
                            <button class="btn btn-danger" data-dismiss="modal">Log out</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};    

export default Modal;