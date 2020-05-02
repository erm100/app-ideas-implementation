import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Button} from '../button';

export class ButtonElement extends React.Component {
  _onPress = value => {
    const {_onPress, onPress} = this.props;

    if (typeof _onPress === 'function') {
      _onPress();
    }

    if (typeof onPress === 'function') {
      onPress(value);
    }
  };

  render() {
    const {
      onChange,
      onPress,
      _onPress,
      value = 'Submit',
      ...otherProps
    } = this.props;
    return (
      <Button onPress={this._onPress} {...otherProps}>
        <Text style={styles.text}>{value}</Text>
      </Button>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    textTransform: 'uppercase',
    color: '#FFFFFF',
    fontSize: hp(2.5),
    fontWeight: 'bold',
  },
});
