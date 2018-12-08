import React, { Component } from 'react';
import './Search.scss';

class Search extends Component {
  constructor(props) {
    super(props);
  }
  
  handleFilterTextInputChange = (e) => {
    this.props.onFilterTextInput(e.target.value);
  } 

  render() {
    return (
      <form>
        <input
          className="form"
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={this.handleFilterTextInputChange}
        />
        <br/>
        {/* <label htmlFor="date">Start Date</label> */}
        <input
          className="form"
          id="date"
          type="date"
          defaultValue="01/10/1970"
          onChange={this.handleFilterTextInputChange}
        />
      </form>
    );
  }
}

export default Search;
