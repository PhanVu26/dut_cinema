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
import * as actions from "../../../actions/analysisAction/index";
import TransactionTable from "./TransactionTable";

class SalesChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieAnalysis: [],
      serviceAnalist: [],
      saleAnalysis: [],
      lineChartOption: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: false,
              },
            },
          ],
        },
      }
    };
  }

  componentDidMount(){
    console.log("didmount")
    this.props.fetchDataMovieAnalysis();
    this.props.fetchDataSaleAnalysis("");
    this.props.fetchDataServiceAnalysis("");
  }
  
  mapToPieChartData(serviceAnalysis){
    var services = [];
    var quantity = [];
    serviceAnalysis.forEach((data) => {
      services.push(data.service);
      quantity.push(data.total);
    });
    return {
      labels: services,
      datasets: [
        {
          label: "Trạng thái đặt vé",
          data: quantity,
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
    }
  }
  mapToLineChartData(saleAnalysis){
    var months = [];
    var salesData = [];
    saleAnalysis.forEach((data) => {
      months.push(data.month_year);
      salesData.push(data.sumSales);
    });
    return {
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
    }
  }
  render() {
    var saleAnalysis = this.mapToLineChartData(this.props.saleAnalysis);
    var serviceAnalysis = this.mapToPieChartData(this.props.serviceAnalysis);
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
            <BarChart width={1150} height={450} data={this.props.movieAnalysis}>
              <XAxis dataKey="movieName" stroke="#8884d8" />
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
              <Bar dataKey="buyQuantity" fill="#8884d8" barSize={30} />
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
            <Pie data={serviceAnalysis} />
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
            <Line data={saleAnalysis} options={this.state.lineChartOption} />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    movieAnalysis : state.analysisReducer.movieAnalysis,
    serviceAnalysis: state.analysisReducer.serviceAnalysis,
    saleAnalysis: state.analysisReducer.saleAnalysis
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchDataMovieAnalysis: () => {
      dispatch(actions.actFetchDataMovieAnalysisRequest());
    },
    fetchDataServiceAnalysis: (query) => {
      dispatch(actions.actFetchDataServiceAnalysisRequest(query));
    },
    fetchDataSaleAnalysis: (query) => {
      dispatch(actions.actFetchDataSaleAnalysisRequest(query));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SalesChart);
