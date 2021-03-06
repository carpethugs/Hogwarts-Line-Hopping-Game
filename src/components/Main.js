import React, { Component } from "react";
import ReactDOM from 'react-dom';
import Track from "./Track";
import Clock from "./clock";
import AlgorithmHandler from "./AlgorithmHandler";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.name,
      tracks: this.props.tracks,
      score: 0,
      curTrack: Math.round(this.props.tracks / 2),
      health: 100,
      trainsToCome: this.props.trainsToCome,
      nextTrain: this.props.nextTrain,
      nextTrainTrack: this.props.nextTrainTrack,
      trainsPassed: [],
      collision: false,
      gameLength: this.props.gameLength * 60,
      algoStatus: [],
    };

    // this.updateScore = this.updateScore.bind(this);
    // this.updateHealth = this.updateHealth.bind(this);
    this.sendTrain = this.sendTrain.bind(this);
    this.algoCallbackFun = this.algoCallbackFun.bind(this);
  }

  // train departure
  sendTrain() {
    //grab current trains list
    let trainList = this.state.trainsToCome;
    //pop incoming train out
    let incoming = trainList.shift();
    //destructure to grab necessary info
    var { track, time } = incoming;
    //push new train onto list
    trainList.push({
      track: Math.floor(Math.random() * (this.state.tracks - 1) + 1),
      time: new Date(new Date().getTime() + 25000),
    });
    //next train to come
    let nextTrain = trainList[0];
    //destructure to grab time
    var { track, time } = nextTrain;
    //grab passed trains list
    let passedTrains = this.state.trainsPassed;
    //append incoming train
    passedTrains.push(incoming);
    //update state
    this.setState((prevState) => ({
      trainsToCome: trainList,
      nextTrainTrack: track,
      nextTrain: time,
      trainsPassed: passedTrains,
    }));
    // setTimeout(() => {}, 1000)
  }

  endGame() {
    let elem = document.getElementById('game-area')
    elem.innerHTML = ""
    ReactDOM.render(
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <h1 className='display-1'>
        Game Over
      </h1>
    </div>,
    elem)
  }

  algoCallbackFun(list) {
    this.setState((prevState) => ({
      algoStatus: list,
    }));
  }

  render() {
    return (
      <div
        className="Main bg-dark text-light vh-100 p-0 m-0 container-fluid d-flex flex-column flex-nowrap justify-content-between"
        id="game-area"
      >
        {/* Game Info*/}
        <div className="p-3 m-0 d-flex flex-row justify-content-around">
          {/* Current Time */}
          <div className="text-center">
            <h3 className="font-weight-light">Current Time:</h3>
            <h3 className="text-monospace">
              <Clock
                nextTrain={this.state.nextTrain}
                sendTrain={this.sendTrain}
                timeLimit={this.state.gameLength}
                endGame={this.endGame}
              />
            </h3>
          </div>
          {/* Next Time of Train */}
          <div className="text-center">
            <h3 className="font-weight-light">Next train at:</h3>
            <h3 className="text-monospace">
              {this.state.nextTrain.toLocaleTimeString()}
            </h3>
          </div>
          {/* Scoreboard */}
          <div>
            <AlgorithmHandler
              collision={this.state.collision}
              curTrack={this.state.curTrack}
              tracks={this.state.tracks}
              nextTrain={this.state.nextTrainTrack}
              trainTime={this.state.nextTrain.toLocaleTimeString()}
              numTracks={this.props.tracks}
              callback={this.algoCallbackFun}
            />
          </div>
        </div>
        {/* Game Area */}
        <div className="p-0 m-0">
          <Track
            maxTracks={this.state.tracks}
            algoStatus={this.state.algoStatus}
            incomingTrain={this.state.nextTrainTrack}
          />
        </div>
      </div>
    );
  }
}
