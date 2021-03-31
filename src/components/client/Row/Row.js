import React, { Component } from 'react';
import styles from './RowStyle';
import { withStyles } from '@material-ui/styles';

class Row extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
      total: 0
    };
  }
  handleOnAdd = (ticket) => {
    const price = ticket.price
    this.setState({
      count: this.state.count + 1,
      total: (this.state.count + 1) * price
    });
    this.props.totalRow({...ticket, total: (this.state.count + 1) })
  };

  handleOnSub = ticket => {
    const price = ticket.price
    this.setState({
      count: this.state.count - 1,
      total: (this.state.count - 1) * price
    });
    this.props.totalRow({...ticket, total: (this.state.count - 1) })
  };
  handleOnChangeInput = (e) => {
    let value = e.target.value;
    if(value.length > 1) value = ''
    this.setState({
      count: value
    })
  }

  handleOnBlur = (ticket) => {
    const price = ticket.price
    const valueInput = parseInt(this.state.count);
    let count =  isNaN(valueInput) ? 0 : valueInput
    if(count < 0 || count > 8 ) count = 0;
    const total = count * price;
    this.setState({
      total
    })
    this.props.totalRow({...ticket, total})
  }
  onKeyPress(e) {
    const reg = /^[0-8]/;
    if(!reg.test(e.key)) {
        e.preventDefault();
    }
  }
  render() {
    const { classes, object } = this.props;
    const { count, total } = this.state;
    const isDisabledAdd = count >= 8 ? true : false;
    const isDisabledSub = count === 0 ? true : false;
    return (
      <tr>
        <td>
          <div className='font-weight-bold'>{object.name}</div>
          <small className='text-muted'>{object.des}</small>
        </td>
        <td align='center'>
        <div>
            <button
              disabled={isDisabledSub}
              className={classes.button}
              onClick={() => this.handleOnSub(object)}>
              <i className="fas fa-minus-circle"></i>
            </button>
            <input
              onKeyPress={this.onKeyPress}
              onBlur ={() => this.handleOnBlur(object)}
              onChange={this.handleOnChangeInput}
              value={count === 0 ? '' : count}
              className={classes.input}></input>
            <button
              disabled={isDisabledAdd}
              className={classes.button}
              onClick={() => this.handleOnAdd(object)}>
              <i className="fas fa-plus-circle"></i>
            </button>
        </div>
        </td>
        <td align='center'>{object.price.toLocaleString()}</td>
        <td align='right'>{total.toLocaleString()}</td>
      </tr>
    );
  }
}

export default withStyles(styles)(Row);
