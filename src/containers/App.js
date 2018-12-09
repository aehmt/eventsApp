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
    this.setState({...filtersState});
  }

  _renderRows() {
    const {score} = this.state;
    const rows=this.state.events.map((event) => {
      if (event.videoStream.toLowerCase().indexOf(this.state.name) === -1) { return null; }
      if ( event.predictions.filter(p =>  p.scores.some(s => s.label.toLowerCase().includes(this.state.label.toLowerCase()))).length===0) { return null; }
      if ( event.predictions.filter(p =>  p.scores.some(s => s.score>=this.state.score)).length===0) { return null; }
      return (
        <Event 
          key={event.timestamp} 
          event={event} 
          score={score}
        />
      );
    });   
    return rows.every(x=>x===null) ? <p>No event found</p> : rows
  }

  render() {
    return (
      <div className="App">
         <Search
          name = { this.state.name }
          score = { this.state.score }
          label = { this.state.label }
          onFilterChange={this.handleFilterChange}
        />   
        <div className="table">
          <div className="table-headers">
            <div>Video Stream</div>
            <div> / </div>
            <div>Date</div>
          </div>
          <div>{this._renderRows()}</div>
        </div>
        {/* <Cards events={this.state.events} /> */}
      </div>
    );
  }
}

export default App;
