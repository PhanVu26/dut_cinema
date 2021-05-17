import React from "react";
import { Link } from "react-router-dom";


const Modal  = (props) => {
    return (
        <div className="modal fade" id="sign-out">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4>Want to leave?</h4>
                        <button className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div className="modal-body">
                        Are You Sure
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-success" data-dismiss="modal">Save Changes</button>
                        <Link to="/login">
                            <button className="btn btn-danger" data-dismiss="modal">Log out</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};    

export default Modal;