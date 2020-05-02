import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CheckBox from 'react-native-just-checkbox';

export class Checkbox extends React.Component {
  render() {
    const {
      label,
      value,
      onToggle,
      style,
      labelStyle,
      containerStyle,
      ...otherProps
    } = this.props;
    return (
      <TouchableOpacity
        onPress={() => onToggle(!value)}
        style={[styles.container, style, containerStyle]}
        {...otherProps}>
        <Text style={[styles.text, labelStyle]}>{label}</Text>
        <CheckBox
          isChecked={!!value}
          checkBoxSize={40}
          checkColor="darkturquoise"
          onToggle={() => onToggle(!value)}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp(80),
  },
  text: {
    color: '#ffffff',
    fontSize: hp(2.5),
    fontFamily: "Lato-Regular"
  },
});
