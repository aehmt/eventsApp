import React, { Component } from 'react';
import './PredictionSuccess.scss';

class PredictionSuccess extends Component {
  
  handleClick = (e) => {
    const { name, value } = e.target;
    this.props.handleInputChange(name, value, this.props.predictionId)
  }
  
  render() {
    const { truePredictions, falsePredictions, predictionId } = this.props;
    return (
      <div className="prediction-container">
        <label className="radio">
          <input 
            type="checkbox" 
            name="true" 
            checked={truePredictions.includes(predictionId)}
            onChange={this.handleClick}
          />
          True
        </label>
        <label className="radio">
          <input 
            type="checkbox" 
            name="false" 
            checked={falsePredictions.includes(predictionId)}
            onChange={this.handleClick}
          />
          False
        </label>
      </div>
    );
  }
}

export default PredictionSuccess;
