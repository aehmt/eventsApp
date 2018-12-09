import React, { Component } from 'react';
import './Search.scss';

class Search extends Component {
  
  handleFilterChange = (e) => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseInt(value) : value;
    this.props.onFilterChange({ [name]: val });
  } 

  render() {
    return (
          <form>
            <h2>Search for an event</h2>
            <fieldset>
              <label htmlFor="name">
                Search for an event by name
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="Event name" 
                  value={this.props.filterText}
                  onChange={this.handleFilterChange}
                />
              </label>

              <label htmlFor="price">
                Score 
                <input 
                  type="number" 
                  id="score" 
                  name="score" 
                  placeholder="Min Score" 
                  value={this.props.filterText}
                  onChange={this.handleFilterChange}
                />
              </label>

              <label htmlFor="label">
                Potential label           
                <input
                  id="label" 
                  name="label" 
                  placeholder="Enter a label" 
                  required 
                  value={this.props.filterText}
                  onChange={this.handleFilterChange}
                />
              </label>
            </fieldset>
          </form>
    );
  }
}

export default Search;
