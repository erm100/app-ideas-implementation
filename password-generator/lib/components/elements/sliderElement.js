import React from 'react';
import {Slider} from '../slider';

export class SliderElement extends React.Component {
  _onValueChange = value => {
    const {_onChangeText, onValueChange, name} = this.props;

    if (typeof _onChangeText === 'function') {
      _onChangeText(name, Math.round(value));
    }

    if (typeof onChangeText === 'function') {
      onValueChange(Math.round(value));
    }
  };

  render() {
    const {...otherProps} = this.props;
    return <Slider onValueChange={this._onValueChange} {...otherProps} />;
  }
}
