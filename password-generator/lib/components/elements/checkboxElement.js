import React from 'react';
import {Checkbox} from '../checkbox';

export class CheckBoxElement extends React.Component {
  _onPress = value => {
    const {_onChangeText, onPress, name} = this.props;
    if (typeof onPress === 'function') {
      onPress(!!value);
    }

    if (typeof _onChangeText === 'function') {
      _onChangeText(name, !!value);
    }
  };

  render() {
    const {onPress, ...otherProps} = this.props;
    return <Checkbox onToggle={this._onPress} {...otherProps} />;
  }
}
