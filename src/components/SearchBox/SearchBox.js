import React, { Component } from "react";

class SearchBox extends Component {
  constructor() {
    super();
    this.state = {
      keyword: "",
    };
  }

  handleOnChange = (e) => {
    this.setState({
      keyword: e.target.value,
    });
  };
  render() {
    const { styleSearch } = this.props;
    return (
      <div className={`${styleSearch} find-header`}>
        <input
          className="form-control mx-auto"
          placeholder="Tìm tên phim, diễn viên..."
          value={this.state.search}
          onChange={this.handleOnChange}
          onKeyUp={(e) => this.props.handleOnEnter(e, this.state.keyword)}
        />
      </div>
    );
  }
}

export default SearchBox;
