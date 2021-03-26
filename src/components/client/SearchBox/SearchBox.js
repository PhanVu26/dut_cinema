import React, { Component } from "react";
import "./styles/SearchBoxStyles.css";

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: "",
    };
  }
  render() {
    return (
      <div className={`${this.props.status} find-header`}>
        <input
          type="text"
          className="form-control mx-auto"
          placeholder="Search"
          value={this.state.word}
          onChange={(e) => this.setState({ word: e.target.value })}
        />
      </div>
    );
  }
}

export default SearchBox;
