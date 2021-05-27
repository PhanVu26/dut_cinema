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

const PropsType = {
  fetchDataBookingById: PropTypes.func,
};

const PayMovie = ({ classes, createBooking }) => {
  const [isOpen, setIsOpen] = useState(false);
  let infoMovie = JSON.parse(localStorage.getItem("booking"));
  let allTickets = infoMovie.tickets;
  let seats = infoMovie.seats;
  let BookedTickets =[];
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
        Thông tin phim
      </Alert>
      {Object.keys(infoMovie).length > 0 && (
        <Card className={`p-3 my-3 ${classes.Card}`}>
          <div>
            <span className="font-weight-bold">Phim: </span>
            <span>{infoMovie.nameMovie}</span>
          </div>
          <div>
            <span className="font-weight-bold">Suất chiếu: </span>
            <span>{`${infoMovie.date} - ${infoMovie.time}`}</span>
          </div>
          <div>
            <span className="font-weight-bold">Phòng chiếu: </span>
            <span>{`${infoMovie.room}`}</span>
          </div>
          <div>
            <span className="font-weight-bold">Ghế: </span>
            <span>
              {infoMovie.seats.map((item, index) => (
                <span key={index}>{`${item} `}</span>
              ))}
            </span>
          </div>
          <div>
            <span className="font-weight-bold">Mã vé: </span>
            <span>{`${infoMovie.tickCode}`}</span>
          </div>
          <div>
            <span className="font-weight-bold">Giá vé: </span>
            <span>{`${infoMovie.ticketPrice.toLocaleString()}`}</span>
          </div>
          <div>
            <span className="font-weight-bold">Tổng thanh toán: </span>
            <span>{`${(
              infoMovie.ticketPrice
            ).toLocaleString()}`}</span>
          </div>
        </Card>
      )}
      <Alert severity="success" color="info" className={`mt-3 ${classes.info}`}>
        Thanh toán
      </Alert>
      <Card
        onClick={() => setIsOpen(!isOpen)}
        className={`p-3 my-3 d-flex align-items-center ${classes.cardItem}`}
      >
        <span className="col-1">
          <img alt="" src={visa} style={{ height: "20px", width: "auto" }} />
        </span>
        <span className="ml-2">Thẻ thanh toán quốc tế</span>
      </Card>
      <Card
        onClick={() => setIsOpen(!isOpen)}
        className={`p-3 my-3 d-flex align-items-center ${classes.cardItem}`}
      >
        <span className="col-1">
          <img alt="" src={ATM} style={{ height: "20px", width: "auto" }} />
        </span>
        <span className="ml-2">Thẻ ATM</span>
      </Card>
      <Card
        onClick={() => setIsOpen(!isOpen)}
        className={`p-3 my-3 d-flex align-items-center ${classes.cardItem}`}
      >
        <span className="col-1">
          <img alt="" src={momo} style={{ height: "20px", width: "auto" }} />
        </span>
        <span className="ml-2">Ví momo</span>
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
      />
      <div class="p-3 my-3 d-flex align-items-center">
        <Link>
        <button 
          onClick={confirmCancel}
          className="btn btn-outline-info btn-sm"
        >
        Hủy đặt vé
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
