import React, { Component } from 'react';
import './App.scss';
import Event from './Event';
import Search from './Search';
import { eventsObj } from '../actions/events';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      name: '',
      score: 0,
      label: '',
    }    
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      events: eventsObj.events
    })
  }

 handleFilterChange(filtersState) {
    this.setState(filtersState);
  }

  _renderRows() {
    const {score} = this.state;
    const rows=this.state.events.map((event) => {
      if (event.videoStream.toLowerCase().indexOf(this.state.name) === -1) { return null; }
      if ( event.predictions.filter(p =>  p.scores.some(s => s.score>=this.state.score)).length===0) { return null; }
      return (
        <Event 
          key={event.timestamp} 
          event={event} 
          score={score}
        />
      );
    });   
    return rows
  }

  render() {
    return (
      <div className="App">
         <Search
          filterText={this.state.filterText}
          onFilterChange={this.handleFilterChange}
        />   
        <div className='table'>
          <div>
            <div>Date</div>
            <div>Video Stream</div>
          </div>
          <div>{this._renderRows()}</div>
        </div>
        {/* <Cards events={this.state.events} /> */}
      </div>
    );
  }
}

export default App;
