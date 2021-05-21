
import react, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, LineChart, Line } from 'recharts';
class SalesChart extends Component{
    constructor(props){
        super(props)
    }

    render(){
        const data = [
            {name: '1', vnđ: 50, pv: 5400, amt: 2400},
            {name: '2', vnđ: 350, pv: 2400, amt: 2400},
            {name: '3', vnđ: 200, pv: 2400, amt: 2400},
            {name: '4', vnđ: 400, pv: 2400, amt: 2400},
            {name: '5', vnđ: 320, pv: 2400, amt: 2400},
            {name: '6', vnđ: 290, pv: 2400, amt: 2400},
            {name: '7', vnđ: 360, pv: 2400, amt: 2400},
            {name: '8', vnđ: 240, pv: 2400, amt: 2400},
            {name: '9', vnđ: 300, pv: 2400, amt: 2400},
            {name: '10', vnđ: 365, pv: 2400, amt: 2400},
            {name: '11', vnđ: 300, pv: 2400, amt: 2400},
            {name: '12', vnđ: 310, pv: 2400, amt: 2400}
        ];
        return (
            <div>
            <BarChart width={600} height={300} data={data}>
            <XAxis dataKey="name" stroke="#8884d8" />
            <YAxis />
            <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
            <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Bar dataKey="vnđ" fill="#8884d8" barSize={30} />
        </BarChart>
        <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
    <Line type="monotone" dataKey="vnđ" stroke="#8884d8" />
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
  </LineChart></div>
        )
    }
}
export default SalesChart;