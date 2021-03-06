import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import "./UserPageStyles.css";
import { actFetchDataTransactionRequest } from "../../../actions/index";
import InforUser from "./UserInfo";
import Deal from "./Deal";
import Booked from "./Booked";
import { connect } from "react-redux";

class UserPage extends React.Component {
  componentDidMount() {
    this.props.fetchDataTransaction('["Cancel", "Book", "Buy"]');
  }

  render() {
    let account = JSON.parse(localStorage.getItem("account"));
    let dataAccount = [account];
    let dataInfoUser = dataAccount.map((account, index) => {
      return <FullWidthTabs key={`movie ${index}`} account={account} />;
    });
    return <div className="container">{dataInfoUser}</div>;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDataTransaction: (listType) => {
      dispatch(actFetchDataTransactionRequest(listType));
    },
  };
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

function FullWidthTabs(props) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  let color = {
    color: "#b9b9b9",
  };
  return (
    <div className="container">
      <div className="row my-5">
        <div className="col-md-12">
          <span>
            <Link to="/" href="#" title="trang ch??? " className="links">
              Trang Ch???
            </Link>
            <span style={color}> {`>`} </span>
            <Link to="/" href="#" title="?????t v??" className="links">
              Th??nh Vi??n
            </Link>
            <span style={color}> {`>`} </span>
            <span> C?? nh??n</span>
          </span>
        </div>
      </div>
      <div>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Th??ng Tin Th??nh Vi??n" {...a11yProps(0)} />
            <Tab label="Giao D???ch C???a T??i" {...a11yProps(1)} />
            <Tab label="V?? ???? ?????t" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <InforUser account={props.account} />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <Deal account={props.account} />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <Booked account={props.account} />
          </TabPanel>
        </SwipeableViews>
      </div>
    </div>
  );
}

export default connect(null, mapDispatchToProps)(UserPage);
