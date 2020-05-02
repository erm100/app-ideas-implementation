import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export class Button extends React.Component {
  render() {
    const {style, children, ...otherProps} = this.props;
    return (
      <>
        <TouchableOpacity style={[styles.container, style]} {...otherProps}>
          {children}
        </TouchableOpacity>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(5),
    width: wp(80),
    backgroundColor: 'red',
    borderRadius: hp(0.2),
  },
});
