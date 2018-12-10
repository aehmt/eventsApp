import React, { Component } from 'react';
import './Search.scss';

class Search extends Component {
  
  handleFilterChange = (e) => {
    const { name, type, value } = e.target;
    let val = type === 'number' ? parseInt(value) : value;
    this.props.onFilterChange({ [name]: val });
  } 

  render() {
    const { name, score, label } = this.props;
    return (
      <div className="search-container">
        <label htmlFor="name">
          Search by name
          <input 
            type="text" 
            id="name" 
            name="name" 
            placeholder="Event name" 
            value={name}
            onChange={this.handleFilterChange}
          />
        </label>

        <label htmlFor="price">
          Minumum score 
          <input 
            type="number" 
            id="score" 
            name="score" 
            placeholder="Min Score" 
            value={score}
            onChange={this.handleFilterChange}
          />
        </label>

        <label htmlFor="label">
          Prediction label           
          <input
            id="label" 
            name="label" 
            placeholder="Enter a label" 
            required 
            value={label}
            onChange={this.handleFilterChange}
          />
        </label>
      </div>
    );
  }
}

export default Search;
