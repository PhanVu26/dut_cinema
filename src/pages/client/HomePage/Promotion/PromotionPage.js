import React, { useEffect } from "react";
import ItemPromotionContainer from "./ItemPromotionContainer";
// import { actFetchDataPromotionRequest } from "../../../actions/action";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { data } from "./promotionData";
function PromotionPage() {
  const dispatch = useDispatch();
  //   const promotion =
  //     useSelector((state) => state.reducerMovie.promotion, []) || [];
  const { promotion } = data;

  //   useEffect(() => {
  //     dispatch(actFetchDataPromotionRequest());
  //   }, [dispatch]);

  let linksStyle = {
    fontSize: "18px",
    color: "black",
    textTransform: "uppercase",
  };

  // let ind = -1;
  // let dataItemPromotion1 = promotion.slice(0, 4).map((item) => {
  //   ind++;
  //   return <ItemPromotionContainer key={`promotion ${ind}`} promotion={item} />;
  // });
  // let dataItemPromotion2 = promotion.slice(4, 7).map((item) => {
  //   ind++;
  //   return <ItemPromotionContainer key={`promotion ${ind}`} promotion={item} />;
  // });
  let dataItemPromotion = promotion.map((item, index) => {
    return (
      <ItemPromotionContainer key={`promotion ${index}`} promotion={item} />
    );
  });
  return (
    <div className="container">
      <br />
      {/* <div className="row">{dataItemPromotion1}</div>
      <br />
      <div className="row">{dataItemPromotion2}</div> */}
      <div className="row">{dataItemPromotion}</div>
      <br />
      <br />
    </div>
  );
}

export default React.memo(PromotionPage);
