import React, { Component } from 'react';
import './App.scss';
import Event from './Event';
import Search from './Search';
import { mockResponse } from '../actions/event_data';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      filterText: ''
    }    
    this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
  }

  componentDidMount() {
    this.setState({
      events: mockResponse.events
    })
  }

 handleFilterTextInput(filterText) {
    //Call to setState to update the UI
    console.log(filterText);
    this.setState({
      filterText: filterText
    });
  }

  _renderRows() {
    const rows=this.state.events.map((event) => {
      if (event.videoStream.toLowerCase().indexOf(this.state.filterText) === -1) {
        return;
      }
      console.log(event);      
      return (
        <Event key={event.timestamp} event={event} />
      );
    });   
    return rows
  }

  render() {
    return (
      <div className="App">
         <Search
          filterText={this.state.filterText}
          onFilterTextInput={this.handleFilterTextInput}
        />   
        <div className='table'>
          <div>
            <div>Date</div>
            <div>Video Stream</div>
          </div>
          <div>{this._renderRows(this.state.filterText)}</div>
        </div>
        {/* <Cards events={this.state.events} /> */}
      </div>
    );
  }
}

export default App;
