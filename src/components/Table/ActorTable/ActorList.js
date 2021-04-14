import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions/actorManager/index'
import ActorItem from './ActorItem';


class ActorList extends Component {
    constructor(props){
        super(props);

        this.state = {
            filterByName: '',
            filterByNationality: '',
        }
    }

    showActors = actors => {
        var result = null;
        if (actors.length > 0) {
          result = actors.map((actor, index) => {
            return <ActorItem key={actor.id} actor={actor} index={index + 1} />;
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
            nationality: name === 'filterByNationality' ? value : this.state.filterByNationality,
        }
        this.setState({
            [name]: value
        })
        console.log("filter", filter)
        this.props.onFilterActor(filter)
        
    }


    render() {
        var{rowsPerPage, filterActor} = this.props;
        console.log("filterActor", filterActor)
        if(filterActor.name){
            rowsPerPage = rowsPerPage.filter((actor) => {
                return actor.name.toLowerCase().indexOf(filterActor.name.toLowerCase()) !== -1
            })
        }
        if(filterActor.nationality){
            rowsPerPage = rowsPerPage.filter((actor) => {
                return actor.nationality.toLowerCase().indexOf(filterActor.nationality.toLowerCase()) !== -1
            })
        }
        return (
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th className="text-center">STT</th>
                        <th className="text-center">ID</th>
                        <th className="text-center">Tên diễn viên</th>
                        <th className="text-center">Hình ảnh</th>
                        <th className="text-center">Ngày sinh</th>
                        <th className="text-center">Quốc tịch</th>
                        <th className="text-center">Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td>
                            <input 
                                type="text"
                                name="filterByName"
                                placeholder='Nhập tên diễn viên'
                                onChange={this.handleChange}
                                value={this.state.filterByName}>
                            </input>
                        </td>
                        <td></td>
                        <td></td>
                        <td>
                            <input 
                                type="text"
                                name="filterByNationality"
                                placeholder='Nhập quốc tịch'
                                onChange={this.handleChange}
                                value={this.state.filterByNationality}>
                            </input>
                        </td>
                        <td></td>
                    </tr>
                    
                    {this.showActors(rowsPerPage)}
                    
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        actors: state.actors,
        // genres: state.genres,
        filterActor : state.filterActor,
        // pageInfo: state.pageInfo
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onFilterActor: (filter) => {
            dispatch(actions.filterActor(filter))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (ActorList);
