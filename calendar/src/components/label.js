import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export class Label extends React.Component {
  render() {
    const {style, ...otherProps} = this.props;
    return (
      <>
        <Text style={[styles.text, style]} {...otherProps} />
      </>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    paddingTop: hp(2),
    paddingBottom: hp(0.5),
    fontSize: hp(2.2),
  },
});
