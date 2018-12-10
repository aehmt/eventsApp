import React, { Component } from 'react';
import Card from '../components/Card';
import './Event.scss';

class Event extends Component {
  state ={ 
    showDetails: false,
  }

  handleShowDetails = () => { 
    this.setState(prevState => ({ showDetails: !prevState.showDetails }));
  }

  render() {
    const { videoStream, timestamp } = this.props.event;
    const { score,event } = this.props;
    const { showDetails } = this.state;
    let readableDate = new Date(timestamp*1000).toString();
    return (
      <div key={timestamp} className="event-container">
        <span 
          className={showDetails ? "span bold" : "span normal" }
          onClick={ this.handleShowDetails }
        >
          {videoStream} / {readableDate.split(' ').slice(0,5).join(' ')} {"PDT"}
        </span>
        {
          (showDetails) ?
            <div className="card-container">
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

export default Event;
