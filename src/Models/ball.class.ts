import { Player } from '../components/map/map.component';

export class Ball {
  x: number;
  y: number;
  radius: number;
  points: number;
  speed: number;
  color: string;
  reference: string;

  constructor (
    x: number,
    y: number,
    radius: number = 5,
    color: string = 'rgb(0,0,255)',
    speed: number = 1
  ) {
    this.speed = Math.max(Math.random() * 10 % 3, 1);
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = `rgb(
      ${Math.floor(Math.random() * 255 % 255)},
      ${Math.floor(Math.random() * 255 % 255)},
      ${Math.floor(Math.random() * 255 % 255)}
    )`;
    this.reference = `ABC123`;
  }

  reset () {
    this.y = -10;
    this.x = Math.floor(Math.random() * 400 % 400);
    this.speed = Math.max(Math.random() * 10 % 3, 1);
  }

  collidesWithPlayer (player: Player): boolean {
    return this.x >= player.x && this.x <= (player.x + player.width) && this.y > player.y;
  }
}