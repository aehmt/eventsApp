import React, { Component } from 'react';
import './Card.scss';
import { colorArray } from './colors';

class Card extends Component {
  state = {
    events: []
  }
  _renderScores(scores, timestamp, i) {
    const scoresList = scores.map((e,i) => {
      // const { label, score } = e.scores;
      // console.log(e);
      return (
        <div className="score-overlay" key={timestamp+i+"scores"}>
          <p>{ e.label }: { e.score }</p>
        </div>
      )
    })
    return scoresList;
  }
  componentDidMount() {
    // const height = document.getElementById('scorescontainer').childNodes
    // height.forEach(x=> {
    //   x.styles.top = x.clientHeight;
    // })
  }
  
  _renderBoundingBoxes(timestamp) {
    const overlays = this.props.data.predictions.map((e,i) => {
      const { height, left, top, width } = e.boundingBox;
      return (
        <div key={timestamp+i+"box"}>
          <div className="box-overlay"
            key={timestamp+i+"box"}
            style={{ 
              height: `calc(100% * ${height})`, 
              left: `calc(100% * ${left})`, 
              top: `calc(100% * ${top})`,
              width: `calc(100% * ${width})`,
              border: `solid 5px ${colorArray[i]}85`
            }} 
          />
          <div 
            className="scores-container" 
            ref="scorescontainer"
            style={{ 
              top: `${-10+(i)*20*e.scores.length}px`,
              background: colorArray[i]
            }}
          >
          { this._renderScores(e.scores, timestamp, i) }
          </div>
        </div>
      )
    })
    return overlays;
  }

  render() {
    const {imageSource, timestamp, videoStream } = this.props.data;

    return (
      <div className="card">
        <div className="image-container">
          <h2>Scores</h2>
          { this._renderBoundingBoxes(timestamp) }
          <img className="card-image" src={imageSource} alt={videoStream}/>
        </div>
      </div>
    );
  }
}

export default Card;
