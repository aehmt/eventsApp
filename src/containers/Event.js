import React, { Component } from 'react';
import Card from '../components/Card';
import PredictionSuccess from '../components/PredictionSuccess';
import './Event.scss';

class Event extends Component {
  state ={ showDetails: false }

  handleShowDetails = () => { 
    this.setState(prevState => ({ showDetails: !prevState.showDetails }));
  }

  render() {
    const { videoStream, timestamp } = this.props.event;
    const { score,event } = this.props;
    const { showDetails } = this.state;
    let readableDate = new Date(timestamp*1000).toString();
    return (
      <div key={timestamp} onClick={ this.handleShowDetails } className="event-container">
        <span className={showDetails ? "span-bold" : "span-normal" }>{videoStream} / {readableDate.split(' ').slice(0,5).join(' ')} {"PDT"}</span>
        {
          (showDetails) ?
            <div className="card-container">
              <PredictionSuccess />
              <Card 
                data={event}
                score={score}
              />
            </div>
            : null
          
        }
      </div>
    );
  }
}

//<img src={this.props.event.imageSource} alt=""/>
export default Event;
