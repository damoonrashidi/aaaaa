import * as React from 'react';
import { track, meter } from './volume.styles';

interface Props {
  gain: number;
}

export class VolumeMeter extends React.Component<Props, any> {

  constructor () {
    super();
  }

  render () {
    return (
      <div {...track}>
        <div {...meter} style={{transform: `scaleY(${this.props.gain})`}}></div>
      </div>
    )
  }

}