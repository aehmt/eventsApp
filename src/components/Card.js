import React, { Component } from 'react';
import PredictionSuccess from '../components/PredictionSuccess';
import './Card.scss';
import { colorArray } from './lib/constants';

class Card extends Component {
  constructor() {
    super()
    this.state = {
      falsePredictions: [],
      truePredictions: [],
    }
    this.handlePredictionBoolean = this.handlePredictionBoolean.bind(this)
  }

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
  
  handlePredictionBoolean(name, prevValue, predictionId) {
    if (name==="true") {
      this.setState(( prevState ) => { 
        return {
          truePredictions: [ 
            ...this.state.truePredictions,
            ...[predictionId]
          ],
          falsePredictions: prevState.falsePredictions.filter(e=>e!==predictionId)
        }
      })
    }
    if (name==="false") {
      this.setState(( prevState ) => {
        return {
          falsePredictions: [ 
            ...this.state.falsePredictions,
            ...[predictionId]
          ],
          truePredictions: prevState.truePredictions.filter(e=>e!==predictionId)
        }
      })
    }
  }

  _renderPredictionBoxes() {
    const { timestamp } = this.props.data;
    const { score } = this.props;
    const { truePredictions, falsePredictions } = this.state;
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
            truePredictions={this.state.truePredictions}
            falsePredictions={this.state.falsePredictions}
            handleInputChange={this.handlePredictionBoolean} 
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
