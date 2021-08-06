
import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, LineChart, Line } from 'recharts';
import { Pie } from 'react-chartjs-2';
import {connect} from 'react-redux';
import * as actions from '../../../actions/transactionAction/index';

class SalesChart extends Component{
    constructor(props){
        super(props);
        this.state = {
            transactions: {}
        }
    }

    componentDidMount() {
        this.props.fetchDataTransaction();
        const transactions = this.countOccurrences(this.props.transactions);
        
        this.setState({
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
            }
        })
        console.log("tran", transactions);
    }
    countOccurrences = arr => arr.reduce((prev, curr) => (prev[curr.service] = ++prev[curr.service] || 1, prev), {});
    render(){
        var {transactions} = this.state;

        const data = [
            {name: '1', vnđ: 50},
            {name: '2', vnđ: 350},
            {name: '3', vnđ: 200},
            {name: '4', vnđ: 400},
            {name: '5', vnđ: 320},
            {name: '6', vnđ: 290},
            {name: '7', vnđ: 360},
            {name: '8', vnđ: 240},
            {name: '9', vnđ: 300},
            {name: '10', vnđ: 365},
            {name: '11', vnđ: 300},
            {name: '12', vnđ: 310}
        ];
        const data2 = {
            labels: ['Draft', 'Buy', 'Cancel', 'Book'],
            datasets: [
              {
                label: '# of Votes',
                data: [100, 350, 50, 120],
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
          };
        return (
            <div>
                <div className="row">
                    <div className="col-md-8">
                        <BarChart width={600} height={450} data={data}>
                            <XAxis dataKey="name" stroke="#8884d8" />
                            <YAxis />
                            <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
                            <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <Bar dataKey="vnđ" fill="#8884d8" barSize={30} />
                        </BarChart>
                    </div>
                    <div className="col-md-4">
                        <Pie data={transactions} />
                    </div>
                </div>
                
                <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <Line type="monotone" dataKey="vnđ" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                </LineChart>
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