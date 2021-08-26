import React, { useEffect } from "react";
import ItemPromotionContainer from "./ItemPromotionContainer";
// import { actFetchDataPromotionRequest } from "../../../actions/action";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { data } from "./promotionData";
function Promotion() {
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
      <div className="row mt-3">
        <div className="col-md-12">
          <Link to="/promotion">
            <p className="link hover-2" style={linksStyle}>
              Tin khuyến mãi
            </p>
          </Link>
        </div>
      </div>
      {/* <div className="row">{dataItemPromotion1}</div>
      <br />
      <div className="row">{dataItemPromotion2}</div> */}
      <div className="row">{dataItemPromotion}</div>
      <br />
    </div>
  );
}

export default React.memo(Promotion);
