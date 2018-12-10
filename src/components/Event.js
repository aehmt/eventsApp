import React, { Component } from 'react';
import './Event.scss';

class Event extends Component {

  handleShowDetails = () => {
    this.props.handleShowDetails(this.props.event) 
  }

  render() {
    const { timestamp } = this.props.event;
    const { selectedEvent } = this.props;
    const active = selectedEvent===timestamp ? " active" : ""
    let readableDate = new Date(timestamp*1000).toString();
    return (
      <div 
        key={timestamp} 
        className={"event-container" + active }
        onClick={ this.handleShowDetails }
      >
        <span>{readableDate.split(' ').slice(0,5).join(' ')} {"PDT"}</span>
      </div>
    );
  }
}

export default Event;
