import React, { Component } from 'react';
import './App.scss';
import Event from '../components/Event';
import Search from '../components/Search';
import Card from '../components/Card';
import { eventsObj } from '../actions/events';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      name: '',
      score: 0,
      label: '',
      selectedEvent: '',
    }    
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleShowDetails = this.handleShowDetails.bind(this);
    this.handlePredictionSuccess = this.handlePredictionSuccess.bind(this)
  }

  componentDidMount() {
    this.setState({
      events: eventsObj.events
    })
    eventsObj.events.forEach(x => {
      this.setState({
        [x.timestamp]: {
          truePredictions: [],
          falsePredictions: [],
        }
      }) 
    })
  }

  handlePredictionSuccess(name, predictionId, eventId) {
    if (name==='true' && !this.state[eventId].truePredictions.includes(predictionId)) {
      this.setState(prevState => ({
        [eventId]: {
          ...prevState[eventId],
          truePredictions: [ ...prevState[eventId].truePredictions, predictionId ],
          falsePredictions: [ ...prevState[eventId].falsePredictions.filter(x=>x!==predictionId) ],
        },
      }));
    }
    if (name==='false' && !this.state[eventId].falsePredictions.includes(predictionId)) {
      this.setState(prevState => ({
        [eventId]: {
          ...prevState[eventId],
          falsePredictions: [...prevState[eventId].falsePredictions ,predictionId ],
          truePredictions: [ ...prevState[eventId].truePredictions.filter(x=>x!==predictionId) ],
        },
      }));
    }
  }

  handleShowDetails = (event) => { 
    this.setState({ selectedEvent: event });
  }


 handleFilterChange(filtersState) {
    this.setState({...filtersState});
  }

  _renderFilteredRows() {
    const {score, selectedEvent} = this.state;
    const rows=this.state.events.map((event) => {
      if (event.videoStream.toLowerCase().indexOf(this.state.name) === -1) { return null; }
      if ( event.predictions.filter(p =>  p.scores.some(s => s.label.toLowerCase().includes(this.state.label.toLowerCase()))).length===0) { return null; }
      if ( event.predictions.filter(p =>  p.scores.some(s => s.score>=this.state.score)).length===0) { return null; }
      return (
        <Event 
          key={event.timestamp} 
          selectedEvent={selectedEvent.timestamp}
          event={event}
          score={score}
          handleShowDetails={this.handleShowDetails}
        />
      );
    });   
    return rows.every(x=>x===null) ? <p>No event found</p> : rows;
  }

  render() {
    const { selectedEvent, score, name, label } = this.state;
    return (
      <div className="App">
        <Search
          name = { name }
          score = { score }
          label = { label }
          onFilterChange={this.handleFilterChange}
        />   
        <div className="table">
          <div className="timeline">
            <div className="table-headers">
              Timeline
            </div>
            {this._renderFilteredRows()}
          </div>
          <div className="event-detailed">
            <div className="card-container">
              { selectedEvent!=='' ? 
                <Card 
                  score={score}
                  data ={selectedEvent}
                  falsePredictions={this.state[selectedEvent.timestamp].falsePredictions}
                  truePredictions={this.state[selectedEvent.timestamp].truePredictions}
                  handlePredictionSuccess={this.handlePredictionSuccess} 
                />
                : null
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
