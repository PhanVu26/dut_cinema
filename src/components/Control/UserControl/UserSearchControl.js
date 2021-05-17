import React, { Component } from 'react';

class AccountSearchControl extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div className="input-group">
                        <input
                            name="keyword"
                            // value={this.state.keyword}
                            type="text"
                            className="form-control"
                            placeholder="Nhập từ khóa..."
                            // onChange={this.onHandleChange}
                        />
                        <span className="input-group-btn">
                            <button className="btn btn-primary" type="button" >
                                <span className="fa fa-search mr-2"></span>Tìm
                            </button>
                        </span>
                    </div>
                </div>
            </div>
            
        );
    }
}

export default AccountSearchControl;
