import { Card } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { withStyles } from "@material-ui/styles";
import React, { useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";
import { actCreateBookingRequest } from "../../../actions/index";
import styles from "./PayMovieStyle";
import visa from "../../../assets/images/visa.png";
import ATM from "../../../assets/images/ATM.png";
import momo from "../../../assets/images/momo.png";
import zalo from "../../../assets/images/zalopay.png";
import PopupComfirm from "../../../components/client/Popup/Popup";
import { Link } from "react-router-dom";
import Paypal from "../../../components/client/Paypal/Paypal";

const PropsType = {
  fetchDataBookingById: PropTypes.func,
};

const PayMovie = ({ classes, createBooking }) => {
  const [isOpen, setIsOpen] = useState(false);
  let infoMovie = JSON.parse(localStorage.getItem("booking"));
  let allTickets = infoMovie.tickets;
  let seats = infoMovie.seats;
  let BookedTickets =[];
  let type_transac= infoMovie.type_transac
  for (let index = 0; index < seats.length; index++) {
    let checkRow = seats[index].substring(0, 1);;
    let checkColumn = seats[index].substring(1);
    for (let ind = 0; ind < allTickets.length; ind++) {
      if(checkRow === allTickets[ind].seat.row && Number(checkColumn) === allTickets[ind].seat.column){
        let type_Id = 1;
        if(allTickets[ind].seat.type!=="Normal") type_Id = 2;
        BookedTickets.push({
            "id": allTickets[ind].id,
            "typeId": type_Id
          })
      }
    }
  }
  let data_sold ={
    tickets: BookedTickets,
    status: "Sold"
  }
  let data_booked ={
    "tickets": BookedTickets,
    "status": "Booked"
  }
  let data_cancle ={
    "tickets": BookedTickets,
    "status": "Available"
  }
  const confirmInform = () => {
    createBooking(data_booked,"Booked");
    setIsOpen(!isOpen);
  };
  const confirmBuy = () => {
    createBooking(data_sold,"Sold");
    setIsOpen(!isOpen);
  };
  const confirmCancel = () => {
    createBooking(data_cancle,"Available");
  };
  let total = infoMovie.ticketPrice;

  return (
    <div className="container">
      <Alert severity="success" color="info" className={`mt-3 ${classes.info}`}>
        Th??ng tin phim
      </Alert>
      {Object.keys(infoMovie).length > 0 && (
        <Card className={`p-3 my-3 ${classes.Card}`}>
          <div>
            <span className="font-weight-bold">Phim: </span>
            <span>{infoMovie.nameMovie}</span>
          </div>
          <div>
            <span className="font-weight-bold">Su???t chi???u: </span>
            <span>{`${infoMovie.date} - ${infoMovie.time}`}</span>
          </div>
          <div>
            <span className="font-weight-bold">Ph??ng chi???u: </span>
            <span>{`${infoMovie.room}`}</span>
          </div>
          <div>
            <span className="font-weight-bold">Gh???: </span>
            <span>
              {infoMovie.seats.map((item, index) => (
                <span key={index}>{`${item} `}</span>
              ))}
            </span>
          </div>
          <div>
            <span className="font-weight-bold">M?? v??: </span>
            <span>{`${infoMovie.tickCode}`}</span>
          </div>
          <div>
            <span className="font-weight-bold">Gi?? v??: </span>
            <span>{`${infoMovie.ticketPrice.toLocaleString()}`}</span>
          </div>
          <div>
            <span className="font-weight-bold">T???ng thanh to??n: </span>
            <span>{`${type_transac=="buy"?(infoMovie.ticketPrice).toLocaleString():(infoMovie.ticketPrice/10).toLocaleString()+" (C???n thanh to??n ph???n c??n l???i t???i qu???y tr?????c 30')"}`}</span>
          </div>
        </Card>
      )}
      <Alert severity="success" color="info" className={`mt-3 ${classes.info}`}>
        Thanh to??n
      </Alert>
      {/* <Card
        onClick={() => setIsOpen(!isOpen)}
        className={`p-3 my-3 d-flex align-items-center ${classes.cardItem}`}
      >
        <span className="col-1">
          <img alt="" src={visa} style={{ height: "20px", width: "auto" }} />
        </span>
        <span className="ml-2">Th??? thanh to??n qu???c t???</span>
      </Card>
      <Card
        onClick={() => setIsOpen(!isOpen)}
        className={`p-3 my-3 d-flex align-items-center ${classes.cardItem}`}
      >
        <span className="col-1">
          <img alt="" src={ATM} style={{ height: "20px", width: "auto" }} />
        </span>
        <span className="ml-2">Th??? ATM</span>
      </Card>
      <Card
        onClick={() => setIsOpen(!isOpen)}
        className={`p-3 my-3 d-flex align-items-center ${classes.cardItem}`}
      >
        <span className="col-1">
          <img alt="" src={momo} style={{ height: "20px", width: "auto" }} />
        </span>
        <span className="ml-2">V?? momo</span>
      </Card>
      <Card
        onClick={() => setIsOpen(!isOpen)}
        className={`p-3 my-3 d-flex align-items-center ${classes.cardItem}`}
      >
        <span className="col-1">
          <img alt="" src={zalo} style={{ height: "20px", width: "auto" }} />
        </span>
        <span className="ml-2">Zalopay</span>
      </Card>
      <PopupComfirm
        open={isOpen}
        onClose={() => setIsOpen(!isOpen)}
        onComfirm={confirmInform}
        onBuy = {confirmBuy}
        total={total}
      /> */}
      <div class="p-3 my-3 d-flex align-items-center">
        <Paypal data1 = {type_transac=="buy"?(total/23012.38).toFixed(2):(total/230123.8).toFixed(2)} onComfirm={type_transac=="buy"?confirmBuy:confirmInform}/>
      </div>
      <div class="p-3 my-3 d-flex align-items-center">
        <Link>
        <button 
          onClick={confirmCancel}
          className="btn btn-outline-info btn-sm"
        >
        H???y ?????t v??
         </button>
         </Link>
      </div>  
    </div>
  );
};

PayMovie.propTypes = PropsType;

const mapDispatchToProps = (dispatch) => {
  return {
    createBooking: (data,type) => dispatch(actCreateBookingRequest(data,type)),
  };
};

const withConnect = connect(null, mapDispatchToProps);

export default compose(withStyles(styles), withConnect)(PayMovie);
