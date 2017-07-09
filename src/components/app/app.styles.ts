import { css } from 'glamor';

export const wrapper = css({
  display: `flex`,
  flexDirection: `row`,
  justifyContent: `flex-start`,
  alignItems: `stretch`,
  transition: `box-shadow .1s ease-in-out`,
})

export const h1 = css({
  color: `#fff`,
  font: `400 2.5em/1.5em VT323, monospace`,
  textShadow: `2px 2px 0 rgba(255,0,0,.9), 3px 3px 0 rgba(255,0,0,.7), 4px 4px 0 rgba(255,0,0,.5)`,
});

export const videoOutput = css({
  display: `none`,
  position: `absolute`,
  height: `200px`,
  width: `200px`,
  left: 0,
  top: 0,
  background: `#fff`,
});
