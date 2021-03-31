import React from "react";
import { withStyles } from "@material-ui/styles";
import styles from "./TableStyle";
import Row from "../Row/Row";

function Table(props) {
  let { classes, type, arrData, countAllTotal, totalAll } = props;
  // console.log("type:", type);
  // console.log("arrData:", arrData);
  // console.log("totalAll:", totalAll);
  return (
    <table className={`${classes.table} mb-0 table table-striped`}>
      <thead className={classes.tableHead}>
        <tr>
          <th className={classes.w40}>{type}</th>
          <th className="text-center">Số lượng</th>
          <th className="text-center">Giá (VNĐ)</th>
          <th className="text-right">Tổng (VNĐ)</th>
        </tr>
      </thead>
      <tbody className={classes.tableBody}>
        {arrData &&
          arrData.map((item, index) => {
            return (
              <Row
                key={index}
                object={item}
                totalRow={(obj) => countAllTotal(obj, index)}
              />
            );
          })}
        <tr className={classes.total}>
          <td>Tổng:</td>
          <td></td>
          <td></td>
          <td align="right">{totalAll && totalAll.toLocaleString()}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default withStyles(styles)(Table);
