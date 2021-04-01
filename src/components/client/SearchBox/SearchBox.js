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
        {/* <input
          type="text"
          className="form-control mx-auto"
          placeholder="Search"
          value={this.state.word}
          onChange={(e) => this.setState({ word: e.target.value })}
        /> */}
        <div class="input-group rounded">
          <input
            type="search"
            class="form-control rounded"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-addon"
            value={this.state.word}
            onChange={(e) => this.setState({ word: e.target.value })}
          />
          <span class="input-group-text border-0" id="search-addon">
            <i class="fas fa-search"></i>
          </span>
        </div>
      </div>
    );
  }
}

export default SearchBox;
