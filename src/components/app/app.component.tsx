import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Map } from '../map/map.component';
import { VolumeMeter } from '../volume/volume.component';
import { wrapper, h1, videoOutput } from './app.styles';
import * as headtrackr from 'headtrackr';
import {css} from 'glamor';

interface AppState {
  gain: number;
  head: {
    x: number;
    y: number;
    z: number;
  };
}

export class App extends React.Component<any, any> {

  state: AppState = {
    gain: 0,
    head: {
      x: 0,
      y: 0,
      z: 0
    }
  };
  score: number = 0;
  video: HTMLVideoElement;
  
  constructor () {
    super();
  }

  render() {
    let shadow = {boxShadow: `
      ${this.state.head.x}px ${this.state.head.y}px 0 rgba(255,0,0,.9),
      ${this.state.head.x * 2}px ${this.state.head.y * 2}px 0 rgba(255,0,0,.7),
      ${this.state.head.x * 4}px ${this.state.head.y * 4}px 0 rgba(255,0,0,.5),
      ${this.state.head.x * 8}px ${this.state.head.y * 8}px 0 rgba(255,0,0,.3)
    `};
    return (
      <div>
        <canvas {...videoOutput}></canvas>
        <video id="video" preload="true" ref={video => this.video} loop muted {...videoOutput}></video>
        <h1 {...h1} >AAAAaaaAaaAAh!!! <span style={{fontFamily: `Times New Roman`}}>{this.score}</span></h1>
        <div {...wrapper} style={shadow}>
          <Map gain={this.state.gain} head={this.state.head} onScore={this.onScore.bind(this)}></Map>
          <VolumeMeter gain={this.state.gain} />
        </div>
      </div>
    )
  }

  onScore(points: number): void {
    this.score = this.score + points;
  }

  async componentDidMount () {
    let context = new AudioContext();
    let stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    let source = context.createMediaStreamSource(stream);
    let node = context.createScriptProcessor(4096, 2, 2);
    node.onaudioprocess = (audio: AudioProcessingEvent) => {
      this.setState({
        gain: audio.inputBuffer.getChannelData(0).reduce((p, c) => Math.max(p,c))
      });
    }
    source.connect(node);
    const tracker = new headtrackr.Tracker({ui: true, headPosition: true});
    tracker.init(document.getElementById('video'), document.getElementsByTagName('canvas')[0]);
    tracker.start();
    document.addEventListener('headtrackingEvent', head => {
      this.state.head = {
        x: head.x,
        y: head.y,
        z: head.z
      };
    });
    node.connect(context.destination);
  }

}