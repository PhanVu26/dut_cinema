import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions/ticketTypeAction/index'
import TicketTypeItem from './TicketTypeItem';


class TicketTypeList extends Component {
    constructor(props){
        super(props);

        this.state = {
            filterByName: '',
        }
    }

    showTicketTypes = ticketTypes => {
        var result = null;
        if (ticketTypes.length > 0) {
          result = ticketTypes.map((ticketType, index) => {
            return <TicketTypeItem key={ticketType.id} ticketType={ticketType} index={index + 1} />;
          });
        }
        return result;
      };

    handleChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        var filter = {
            name: name === 'filterByName' ? value : this.state.filterByName,
        }
        this.setState({
            [name]: value
        })
        this.props.onFilterTicketType(filter)
        
    }


    render() {
        var{rowsPerPage, filterTicketType} = this.props;
        
        if(filterTicketType.name){
            rowsPerPage = rowsPerPage.filter((ticketType) => {
                return ticketType.name.toLowerCase().indexOf(filterTicketType.name.toLowerCase()) !== -1
            })
        }
        return (
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th className="text-center">STT</th>
                        <th className="text-center">ID</th>
                        <th className="text-center">Tên thể loại</th>
                        <th className="text-center">Giá vé</th>
                        <th className="text-center">Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td className="text-center">
                            <input 
                                type="text"
                                name="filterByName"
                                placeholder='Nhập tên thể loại'
                                onChange={this.handleChange}
                                value={this.state.filterByName}>
                            </input>
                        </td>
                        <td></td>
                        <td></td>
                    </tr>
                    
                    {this.showTicketTypes(rowsPerPage)}
                    
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ticketTypes: state.ticketTypes.ticketTypes,
        // ticketTypes: state.ticketTypes,
        filterTicketType : state.filterTicketType,
        // pageInfo: state.pageInfo
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onFilterTicketType: (filter) => {
            dispatch(actions.filterTicketType(filter))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (TicketTypeList);
