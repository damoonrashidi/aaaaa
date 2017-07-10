import * as React from 'react';
import { mapCanvas } from './map.styles';
import { Ball } from  '../../models/ball.class';

interface Head {
  x: number;
  y: number;
  z: number;
}

export interface Player {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Props {
  gain: number;
  head: Head;
  onScore: Function;
}


export class Map extends React.Component<Props, any> {

  canvas: HTMLCanvasElement;
  animationFrame: number;
  canvasWidth: number = 400
  canvasHeight: number = 400;
  player: Player = {
    x: this.canvasWidth / 2,
    y: this.canvasHeight - 10,
    height: 5,
    width: 50
  }
  balls: Ball[] = [];
  BALL_COUNT: number = 5;

  constructor () {
    super();
    for (let i = 0; i < this.BALL_COUNT; i++ ) {
      let ball = new Ball(
        Math.random() * 400 % 400,
        20,
        5,
       );
      ball.points = Math.floor(Math.random() * 10 % 5);
      this.balls.push(ball);
    }
  }

  render () {
    return (
      <div>
        <canvas width="400" height="400" ref={canvas => this.canvas = canvas} {...mapCanvas}></canvas>
       </div>
    )
  }

  componentDidMount () {
    this.paint();
  }

  drawPlayer (ctx: CanvasRenderingContext2D) {
    this.player.x += this.props.head.x * this.props.gain;
    this.player.width += this.props.gain * 4;
    this.player.x = Math.max(0, this.player.x);
    this.player.x = Math.min(this.player.x, this.canvasWidth);
    if (this.player.x + this.player.width > this.canvasWidth) {
      this.player.x = this.canvasWidth - this.player.width;
    }
    ctx.fillStyle = '#ff0000';
    this.player.width -= 2;
    this.player.width = Math.max(50, this.player.width);
    ctx.fillRect(
      this.player.x,
      this.player.y,
      this.player.width,
      this.player.height
    );
  }

  drawBalls (ctx: CanvasRenderingContext2D) {
    this.balls.forEach(ball => {
      ball.y += ball.speed;
      if (ball.collidesWithPlayer(this.player)) {
        this.props.onScore(ball.points);
      }
      if (ball.y > this.canvasHeight) {
        ball.y  = -10;
      }
      ctx.beginPath();
      ctx.fillStyle = ball.color;
      ctx.ellipse(ball.x, ball.y, ball.radius, ball.radius, 45 * Math.PI/180, 0, 2 * Math.PI);
      ctx.fill();
    })
  }

  paint () {
    window.requestAnimationFrame( () => {
      let ctx = this.canvas.getContext('2d');
      ctx.clearRect(0,0, this.canvasWidth, this.canvasHeight);
      this.drawPlayer(ctx);
      this.drawBalls(ctx);
      this.paint();
    });
  }

}