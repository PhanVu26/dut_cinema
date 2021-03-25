import React, { Component } from 'react';

class AccountSortControl extends Component {

    // onClick = (sortBy, sortValue) => {
    //     this.props.onSort(sortBy, sortValue);
    // }

    render() {
        return (
            <div className="dropdown">
                <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Sắp xếp
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <a class="dropdown-item" href="#">Something else here</a>
                </div>
            </div>
        );
    }
}

export default AccountSortControl;
