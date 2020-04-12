import React, {Component} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import 'mobx-react-lite/batchingForReactNative';
import {Context} from '../context';

export class Button extends Component {
  render() {
    const {styles} = this.context;
    const {children, style, textColor, ...otherProps} = this.props;
    return (
      <TouchableOpacity style={[styles.button, style]} {...otherProps}>
        <Text
          style={[
            styles.buttonText,
            {
              color: textColor || 'rgba(0, 0, 0, 0.24)',
            },
          ]}>
          {children}
        </Text>
      </TouchableOpacity>
    );
  }
}

Button.contextType = Context;
