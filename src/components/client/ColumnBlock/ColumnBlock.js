import React, { Component } from 'react';
import styles from './ColumnBlockStyle'
import { withStyles } from '@material-ui/styles';

class ColumnBlock extends Component {
    render() {
        const { classes, title } = this.props;
        return (
            <div className={`${classes.wrap} col-md-6`}>
               <p className={`${classes.header} text-center text-white text-uppercase m-0`}>{title}</p> 
               {this.props.children}
            </div>
        );
    }
}

export default withStyles(styles)(ColumnBlock);