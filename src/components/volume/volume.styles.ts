import { css } from 'glamor';

export const track = css({
  background: `#eee`,
  width: `20px`
});

export const meter = css({
  transformOrigin: `50% 100%`,
  background: `#f00`,
  height: `100%`,
  transform: `scaleY(1)`,
  transition: `transform .2s linear`,
});