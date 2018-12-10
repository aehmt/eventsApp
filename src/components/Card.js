import React, { Component } from 'react';
import PredictionSuccess from '../components/PredictionSuccess';
import './Card.scss';
import { colorArray } from './lib/constants';

class Card extends Component {

  _renderScores(scores, timestamp, i) {
    const scoresList = scores.map((e,i) => {
      if (e.score<this.props.score) return null;
      return (
        <div className="score-overlay" key={timestamp+i+"scores"}>
          <p className="label">{ e.label }: { e.score }</p>
        </div>
      )
    })
    return scoresList;
  }
  
  _renderPredictionBoxes() {
    const { timestamp } = this.props.data;
    const { truePredictions, falsePredictions, score } = this.props;
    const overlays = this.props.data.predictions.map((e,i) => {
      const { height, left, top, width } = e.boundingBox;
      if (e.scores.every(s => s.score<score)) return null;
      return (
        <div key={timestamp+i+"box"}>
          <div className="box-overlay"
            style={{ 
              height: `calc(100% * ${height})`, 
              left: `calc(100% * ${left})`, 
              top: `calc(100% * ${top})`,
              width: `calc(100% * ${width})`,
              border: `solid 5px ${colorArray[i]}85`
            }} 
          >
          { falsePredictions.includes(i) ? <p>FALSE</p> : null } 
          { truePredictions.includes(i) ? <p style={{color:"#5fff04"}}>TRUE</p> : null } 
          </div>
          <div 
            className="scores-container" 
            ref="scorescontainer"
            style={{ 
              top: `${-10+(i)*30*e.scores.length}px`,
              background: colorArray[i]
            }}
          >
          { this._renderScores(e.scores, timestamp, i) }
          <PredictionSuccess 
            predictionId={i} 
            eventId={timestamp}
            truePredictions={this.props.truePredictions}
            falsePredictions={this.props.falsePredictions}
            handlePredictionSuccess={this.props.handlePredictionSuccess} 
          />
          </div>
        </div>
      )
    })
    return overlays;
  }

  render() {
    const {imageSource, videoStream } = this.props.data;

    return (
      <div className="card">
        <h2>{videoStream}</h2>
        <div className="image-container">
          <div className="scores-header-container">
            <h2 className="scores-header">Predictions</h2>
          </div>
          { this._renderPredictionBoxes() }
          <img className="card-image" src={imageSource} alt={videoStream}/>
        </div>
      </div>
    );
  }
}

export default Card;
