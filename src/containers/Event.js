import React, { Component } from 'react';
import Card from '../components/Card';
import './Event.scss';

class Event extends Component {
  state ={ showDetails: false }

  handleShowDetails = () => { 
    console.log('click');
    this.setState(prevState => ({ showDetails: !prevState.showDetails }));
  }

  render() {
    const { videoStream, timestamp } = this.props.event;
    const { showDetails } = this.state;
    let readableDate = new Date(timestamp*1000).toString();
    return (
      <div key={timestamp} onClick={ this.handleShowDetails } className="event-container">
        <span className={showDetails ? "span-bold" : "span-normal" }>{readableDate} / {videoStream}</span>
        {
          (showDetails) ?
            <div className="card-container">
              <Card data={this.props.event}/>
            </div>
            : null
          
        }
      </div>
    );
  }
}

              // <img src={this.props.event.imageSource} alt=""/>
export default Event;
