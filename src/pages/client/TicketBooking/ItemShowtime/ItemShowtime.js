import React from "react";

function ItemShowtime(props) {
    return (
      <div className="col-3 col-md-2 col-lg-2">
        <p className="item">{props.frameTime.time}</p>
      </div>
    );
  }

export default ItemShowtime;
