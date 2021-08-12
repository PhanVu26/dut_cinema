import { Link } from "react-router-dom";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions/index";

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  showSearchList = (listSearch) => {
    if (listSearch.length > 0) {
      const list = listSearch.map((item, index) => {
        return (
          <div key={index} className="col-lg-4 col-md-6 col-sm-6 p-2 mt-2">
            <div className="box">
              <img
                alt=""
                src={item.image?.mainUrl} 
              />
              <div className="box-content">
                <h6 className="title">{item.name}</h6>
                <span className="post">{item.producer}</span>
                <ul className="icon">
                  <li>
                    <Link to={"/booking/" + item.name}>
                      <i
                        onClick={() => this.props.getMovie(item)}
                        className="fas fa-shopping-cart"
                      ></i>
                    </Link>
                    {/* <Link to="/buy-ticket">
                      <div className="mt-3">
                        <i className="fas fa-shopping-cart"></i>
                      </div>
                    </Link> */}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          // {/* <div className="card">
          //   <img
          //     className="card-img-top"
          //     src={item.image}
          //     alt="Card"
          //     style={{ width: "100%" }}
          //   />
          //   <div className="card-body">
          //     <Link to="search">
          //       <h6 className="card-title">{item.name}</h6>
          //       <p className="card-text text-left">
          //         Diễn viên: {item.author}
          //       </p>
          //     </Link>
          //   </div>
          // </div> */}
        );
      });
      return list;
    }
  };

  render() {
    let notify = "";
    if (this.props.listSearch) {
      notify =
        this.props.listSearch.length > 0
          ? `${this.props.listSearch.length} kết quả được tìm thấy!`
          : "Không tìm thấy kết quả nào!";
    }
    return (
      <div style={{ minHeight: "70vh" }} className="container my-4">
        <p>{notify}</p>
        <div className="row">
          {this.props.listSearch && this.showSearchList(this.props.listSearch)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listSearch: state.MovieReducer.searchMovie,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMovie: (movie) => {
      dispatch(actions.getMovie(movie));
    },
  };
};

export default React.memo(
  connect(mapStateToProps, mapDispatchToProps)(SearchPage)
);
