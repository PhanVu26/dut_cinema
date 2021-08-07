
import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, LineChart } from 'recharts';
import { Pie, Line } from 'react-chartjs-2';
import {connect} from 'react-redux';
import * as actions from '../../../actions/transactionAction/index';

class SalesChart extends Component{
    constructor(props){
        super(props);
        this.state = {
            transactions: {},
            bookedQuanties: {}
        }
    }

    static getDerivedStateFromProps(props, state) {
        if(props.transactions){
            const tickets = props.transactions.filter(tran => {
                return tran.service === "Buy";
            });
            const transactions = props.transactions.reduce((prev, curr) => (prev[curr.service] = ++prev[curr.service] || 1, prev), {});

            // Tính số lượng vé trên mỗi phim
            const bookedQuanties = tickets.reduce((prev, curr) => (prev[curr.ticket.showtime.movie.name] = ++prev[curr.ticket.showtime.movie.name] || 1, prev), {});
            const movieTickets = [];
            const keys = Object.keys(bookedQuanties);
            const values = Object.values(bookedQuanties);
            for(let i = 0 ; i < keys.length; i ++){
                movieTickets.push({
                    name: keys[i],
                    quantity: values[i]
                })
            }

            return{
                transactions: {
                    labels: Object.keys(transactions),
                    datasets: [
                        {
                        label: 'Trạng thái đặt vé',
                        data: Object.values(transactions),
                        backgroundColor: [
                            'rgba(253, 204, 69, 1)',
                            'rgba(38, 38, 205, 1)',
                            'rgba(255, 0, 0, 1)',
                            'rgba(75, 192, 192, 1)',
                        ],
                        borderColor: [
                            'rgba(253, 204, 69, 1)',
                            'rgba(38, 38, 205, 1)',
                            'rgba(255, 0, 0, 1)',
                            'rgba(75, 192, 192, 1)',
                        ],
                        borderWidth: 1,
                        },
                    ],
                },
                bookedQuanties : movieTickets
            }
        }else {
            return {
                transactions:{},
                bookedQuanties: {}

            };
        }
      }

   
    countSales = arr => arr.reduce((prev, curr) => (prev[curr.transaction_time] = prev[curr.transaction_time] || 1, prev), {});
    render(){
        console.log("state", this.state)
        var {transactions, bookedQuanties} = this.state;

        const data = {
            labels: ['1', '2', '3', '4', '5', '6'],
            datasets: [
              {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                fill: false,
                backgroundColor: 'rgb(255, 0, 0)',
                borderColor: 'rgba(255, 0, 0, 0.2)',
              },
            ],
          };
          
          const options = {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          };
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <h4 className="mb-5 text-center">Biểu đồ số lượng vé đã đặt theo phim</h4>
                        <BarChart width={1150} height={450} data={bookedQuanties}>
                            <XAxis dataKey="name" stroke="#8884d8" />
                            <YAxis />
                            <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
                            <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <Bar dataKey="quantity" fill="#8884d8" barSize={30} />
                        </BarChart>
                    </div>
                </div>
                <div className="row mt-5">
                        <div className="col-md-4">
                            <h5 className="text-center mb-4">Biểu đồ trạng thái giao dịch</h5>
                            <Pie data={transactions} />
                        </div>
                        <div className="col-md-8">
                            <h5 className="text-center mb-4">Biểu đồ doanh thu</h5>
                            <Line data={data} options={options} />
                        </div>

                    </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        transactions : state.transactions
    }
}

const mapDispatchToProps = (dispatch, props) =>{
    return {
        fetchDataTransaction : () => {
            dispatch(actions.actFetchDataTransactionsRequest());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SalesChart);