import React, { Component } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  LineChart,
} from "recharts";
import { Pie, Line } from "react-chartjs-2";
import { connect } from "react-redux";
import * as actions from "../../../actions/transactionAction/index";
import TransactionTable from "./TransactionTable";

class SalesChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: {},
      bookedQuanties: {},
      saleData: {},
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.transactions) {
      const tickets = props.transactions.filter((tran) => {
        return tran.service === "Buy" || tran.service === "Book";
      });
      const transactions = props.transactions.reduce(
        (prev, curr) => (
          (prev[curr.service] = ++prev[curr.service] || 1), prev
        ),
        {}
      );

      // Tính số lượng vé trên mỗi phim
      const bookedQuanties = tickets.reduce(
        (prev, curr) => (
          (prev[curr.ticket.showtime.movie.name] =
            ++prev[curr.ticket.showtime.movie.name] || 1),
          prev
        ),
        {}
      );
      const movieTickets = [];
      const keys = Object.keys(bookedQuanties);
      const values = Object.values(bookedQuanties);
      for (let i = 0; i < keys.length; i++) {
        movieTickets.push({
          name: keys[i],
          quantity: values[i],
        });
      }

      // count sale data
      const saleData = tickets.sort(function (a, b) {
        return (
          new Date(Date.parse(a.transaction_time)) -
          new Date(b.transaction_time)
        );
      });

      let sales = [];
      let pre_time = "";
      let money = 0;
      for (let i = 0; i < saleData.length; i++) {
        let item = saleData[i];
        let time = item.transaction_time.slice(0, 7);
        if (pre_time === time) {
          if (item.service === "Buy") {
            money += item.price;
          } else {
            money += item.price / 10;
          }
        } else {
          let obj = {
            time: pre_time,
            money: money,
          };
          sales.push(obj);
          pre_time = time;
          if (item.service === "Buy") {
            money += item.price;
          } else {
            money += item.price / 10;
          }
        }
      }
      let obj = {
        time: pre_time,
        money: money,
      };
      sales.push(obj);
      sales.shift();
      var months = [];
      var salesData = [];
      sales.forEach((data) => {
        months.push(data.time);
        salesData.push(data.money);
      });

      return {
        transactions: {
          labels: Object.keys(transactions),
          datasets: [
            {
              label: "Trạng thái đặt vé",
              data: Object.values(transactions),
              backgroundColor: [
                "rgba(253, 204, 69, 1)",
                "rgba(38, 38, 205, 1)",
                "rgba(255, 0, 0, 1)",
                "rgba(75, 192, 192, 1)",
              ],
              borderColor: [
                "rgba(253, 204, 69, 1)",
                "rgba(38, 38, 205, 1)",
                "rgba(255, 0, 0, 1)",
                "rgba(75, 192, 192, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        bookedQuanties: movieTickets,
        sales: {
          labels: months,
          datasets: [
            {
              label: "Doanh thu(vnđ)",
              data: salesData,
              fill: false,
              backgroundColor: "rgb(255, 0, 0)",
              borderColor: "rgba(255, 0, 0, 0.2)",
            },
          ],
        },
      };
    } else {
      return {
        transactions: {},
        bookedQuanties: {},
      };
    }
  }

  countSales = (arr) =>
    arr.reduce(
      (prev, curr) => (
        (prev[curr.transaction_time] = prev[curr.transaction_time] || 1), prev
      ),
      {}
    );
  render() {
    var { transactions, bookedQuanties, sales } = this.state;

    const options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: false,
            },
          },
        ],
      },
    };
    return (
      <div>
        <div className="row">
          <div
            className="col-md-12"
            style={{
              boxShadow: "1px 2px 5px #999",
              backgroundColor: "white",
              borderRadius: "4px",
            }}
          >
            <h4 className="mb-5 mt-3 text-center">
              Biểu đồ số lượng vé đã đặt theo phim
            </h4>
            <BarChart width={1150} height={450} data={bookedQuanties}>
              <XAxis dataKey="name" stroke="#8884d8" />
              <YAxis />
              <Tooltip wrapperStyle={{ width: 100, backgroundColor: "#ccc" }} />
              <Legend
                width={100}
                wrapperStyle={{
                  top: 40,
                  right: 20,
                  backgroundColor: "#f5f5f5",
                  border: "1px solid #d5d5d5",
                  borderRadius: 3,
                  lineHeight: "40px",
                }}
              />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Bar dataKey="quantity" fill="#8884d8" barSize={30} />
            </BarChart>
          </div>
        </div>
        <div className="row mt-3">
          <div
            className="col-md-4"
            style={{
              boxShadow: "1px 2px 5px #999",
              backgroundColor: "white",
              borderRadius: "4px",
            }}
          >
            <h5 className="text-center mb-4 mt-3">
              Biểu đồ trạng thái giao dịch
            </h5>
            <Pie data={transactions} />
          </div>
          <div className="col-md-8">
            <TransactionTable></TransactionTable>
          </div>
        </div>
        <div className="row mt-5 mb-5">
          <div
            className="col-md-12"
            style={{
              boxShadow: "1px 2px 5px #999",
              backgroundColor: "white",
              borderRadius: "4px",
            }}
          >
            <h5 className="text-center mb-4 mt-3">Biểu đồ doanh thu</h5>
            <Line data={sales} options={options} />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    transactions: state.transactions.transactions,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchDataTransaction: () => {
      dispatch(actions.actFetchDataTransactionsRequest());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SalesChart);
