import React from "react";
import "./PromotionStyles.css";
import { Link } from "react-router-dom";
function ItemPromotionContainer(props) {
  return (
    <div className="col-md-3 col-sm-4 col-xs-6">
      <div className="box1">
        <img src={props.promotion.imageUrl} alt="" />
        <div className="box-content">
          <p>{props.promotion.title}</p>
          {/* <h2></h2>
          <p>{props.promotion.content}</p> */}
          <Link to={`/promotion/${props.promotion.link}`}>
            <button type="button" className="btn btn-outline-warning">
              CHI TIẾT
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ItemPromotionContainer;
