import React, { Component } from "react";
import styles from "./SeatPickerStyle";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { compose } from "redux";
import { chunk } from "lodash";

class SeatPickers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrSeatReserved: [],
    };
  }

  handleOnChooseSeat = (item, amountTicket) => {
    if (item.isReversed === undefined) {
      let { arrSeatReserved, choosing } = this.state;
      let newArr = arrSeatReserved.includes(item.id)
        ? arrSeatReserved.filter((i) => i !== item.id)
        : [...arrSeatReserved, item.id];
      if (newArr.length > amountTicket) {
        newArr.splice(0, 1);
      }
      this.setState({
        arrSeatReserved: newArr,
        choosing: choosing,
      });
      this.props.showNameSeat(newArr);
    }
  };

  render() {
    console.log("this.state.arrSeatReserved", this.state.arrSeatReserved);
    let { classes, amountTicket, roomDetail } = this.props;
    let { arrSeatReserved } = this.state;
    let room = roomDetail;
    let ArrSeats = [];
    for (let i = 0; i < room.numberSeat; i++) {
      if (room.seatReserved.includes(i + 1)) {
        ArrSeats.push({
          id: i + 1,
          number: (i + 1) % 10 !== 0 ? (i + 1) % 10 : 10,
          isReversed: true,
        });
      } else {
        ArrSeats.push({
          id: i + 1,
          number: (i + 1) % 10 !== 0 ? (i + 1) % 10 : 10,
        });
      }
    }

    let arrChunk = chunk(ArrSeats, 10);

    return (
      <div className={classes.wrapSeat}>
        <table className={classes.table}>
          {arrChunk.map((arrItem, index) => {
            return (
              <tr key={index}>
                <td className="pr-3">{String.fromCharCode(index + 65)}</td>
                {arrItem.map((item) => {
                  const style =
                    item.isReversed !== undefined
                      ? classes.reversed
                      : arrSeatReserved.includes(item.id)
                      ? classes.choosing
                      : classes.normal;
                  return (
                    <td
                      key={item.id}
                      className={`${classes.seat} ${style}`}
                      onClick={() =>
                        this.handleOnChooseSeat(item, amountTicket)
                      }
                    >
                      {item.number}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </table>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withStyles(styles), withConnect)(SeatPickers);
