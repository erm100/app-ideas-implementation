import React from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const addIcon = require('src/assets/images/add.png');

export class Add extends React.Component {
  render() {
    const {style, ...otherProps} = this.props;
    return (
      <>
        <TouchableOpacity style={[styles.container, style]} {...otherProps}>
          <Image source={addIcon} style={styles.add} />
        </TouchableOpacity>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: hp(3.5),
    height: hp(7),
    width: hp(7),
  },
  add: {
    height: hp(7),
    width: hp(7),
  },
});
