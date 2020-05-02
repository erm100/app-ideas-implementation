import React from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export class Icon extends React.Component {
  render() {
    const {style, source, iconProps, iconStyle, ...otherProps} = this.props;
    return (
      <TouchableOpacity style={[styles.container, style]} {...otherProps}>
        <Image
          resizeMode={'contain'}
          source={source}
          style={[styles.icon, iconStyle]}
          {...iconProps}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  icon: {
    height: hp(3.5),
    width: hp(3.5),
  },
});
